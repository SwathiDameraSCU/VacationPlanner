package controllers;

import base.DateExtensions;
import base.StringExtensions;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.mongodb.util.JSON;
import controllers.response.FlightOption;
import controllers.response.FlightResponse;
import controllers.response.FlightSlice;
import controllers.response.LegDetails;
import data.airports.request.Airport;
import data.airports.AirportClient;
import data.airports.response.AirportsResponse;
import data.flights.FlightClient;
import data.flights.response.*;
import email.MailClient;
import org.bson.types.ObjectId;
import org.json.JSONObject;
import com.mongodb.*;
import play.data.DynamicForm;
import play.data.Form;
import play.mvc.*;

import java.io.ByteArrayOutputStream;
import java.io.OutputStream;
import java.math.BigInteger;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;


public class Application extends Controller
{
    private static MongoClient mongoClient = new MongoClient( "localhost" , 27017 );
    private static DB db= mongoClient.getDB("Vacation_Planner");
    private static DBCollection dbBookingsCollection = db.getCollection("Bookings");
    private static DBCollection dbUsersCollection = db.getCollection("Users");

    private static final AirportClient airportClient = new AirportClient();
    private static final FlightClient flightClient = new FlightClient();
    private static final MailClient mailClient = new MailClient();

    public Result getFlights()
    {
        final boolean isRoundTrip;
        final String origin, destination;
        final int adultCount, childCount;
        final Date departureDate;
        Date arrivalDate = null;

        try
        {
            isRoundTrip = Boolean.parseBoolean(request().getQueryString("round-trip"));
            origin = request().getQueryString("origin");
            destination = request().getQueryString("destination");
            adultCount = Integer.parseInt(request().getQueryString("adult-count"));
            childCount  = Integer.parseInt(request().getQueryString("child-count"));
            departureDate = DateExtensions.getDateFromString(request().getQueryString("departure-date"), "MM/dd/yyyy");

            if(isRoundTrip)
                arrivalDate = DateExtensions.getDateFromString(request().getQueryString("arrival-date"), "MM/dd/yyyy");
        }
        catch(final Exception ex)
        {
            return badRequest(ex.getMessage());
        }

        try
        {
            final FlightsResponse flightsResponse =
                    flightClient.getFlights(isRoundTrip, origin, destination,
                            departureDate, arrivalDate, adultCount, childCount);

            final List<FlightOption> flightOptions = new ArrayList<FlightOption>();

            for (final TripOption tripOption : flightsResponse.trips.tripOptions)
            {
                final List<FlightSlice> flightSlices = new ArrayList<FlightSlice>();
                for (final Slice slice : tripOption.slices)
                {
                    final List<LegDetails> legDetails = new ArrayList<LegDetails>();
                    for (final Segment segment : slice.segments)
                    {
                        for (final Leg leg : segment.legs)
                        {
                            final LegDetails legDetail =
                                    new LegDetails(leg.departureTime, leg.arrivalTime, leg.destination, leg.duration,
                                            leg.origin, segment.connectionDuration, segment.flight.carrier, segment.flight.number);

                            legDetails.add(legDetail);
                        }
                    }

                    flightSlices.add(new FlightSlice(legDetails));
                }
                flightOptions.add(new FlightOption(tripOption.saleTotal, flightSlices));
            }
            final FlightResponse flightResponse = new FlightResponse(flightOptions);
            final OutputStream out  = new ByteArrayOutputStream();
            final ObjectMapper mapper = new ObjectMapper();
            mapper.writeValue(out, flightResponse);

            return ok(out.toString());
        }
        catch (Exception ex)
        {
            return internalServerError(ex.getMessage());
        }
    }

    public Result getAirports()
    {
        try
        {
            final AirportsResponse airportsResponse =  airportClient.getAirports();
            if(!airportsResponse.success)
                return internalServerError(airportsResponse.errorMessage);

            final HashMap<String, String> airports = new HashMap<>();
            for(final Airport airport: airportsResponse.airports)
                if(airport!=null && StringExtensions.isNotNullOrEmpty(airport.name) &&
                        StringExtensions.isNotNullOrEmpty(airport.code))
                    airports.put(airport.code, airport.name);

            final JSONObject airportsObj = new JSONObject(airports);

            return ok(airportsObj.toString());
        }
        catch(final Exception ex)
        {
            return internalServerError(ex.getMessage());
        }
    }

    public Result bookings()
    {
        try
        {
            JsonNode json = request().body().asJson();
            if (json == null)
            {
                return badRequest("Expecting Json data");
            }
            else
            {
                String username = request().getHeader("X-User-id");

                if (username == null || username.isEmpty())
                {
                    SecureRandom random = new SecureRandom();
                    username = "Guest_" + new BigInteger(130, random).toString(32);

                    if (json.get("emailId") == null)
                        return badRequest("Expecting email address");
                    String emailId = String.valueOf(json.get("emailId"));

                    if (json.get("phonenumber") == null)
                        return badRequest("Expecting phonenumber");
                    String phoneNumber = String.valueOf(json.get("phonenumber"));

                    BasicDBObject doc =
                            new BasicDBObject("_id", username).append("password", null)
                                    .append("emailId", emailId).append("phoneNumber", phoneNumber)
                                    .append("firstname", null).append("lastname", null).append("middlename", null);

                    dbUsersCollection.insert(doc);


                }
                else
                {
                    BasicDBObject query = new BasicDBObject("_id", username);
                    DBObject object = dbUsersCollection.findOne(query);
                    ((ObjectNode) json).put("emailId", object.get("emailId").toString());
                }
                //((ObjectNode) json).put("username", username);

                BasicDBObject doc = new BasicDBObject("details", JSON.parse(json.toString())).append("username", username);
                dbBookingsCollection.insert(doc);
                String bookingId = doc.getString("_id");
                doc.put("booking_id", bookingId);
                doc.remove("_id");

                ObjectMapper mapper = new ObjectMapper();
                JsonNode jsonNode = mapper.readTree(doc.toJson());
                mailClient.sendBookingsEmail(jsonNode);

                return created(doc.toString());
            }
        }
        catch (Exception ex)
        {
            return internalServerError(ex.getMessage());
        }
    }

    public Result bookingDetails(final String bookingId)
    {
        BasicDBObject query = new BasicDBObject();

        query.put("_id", new ObjectId(bookingId));
        DBObject doc = dbBookingsCollection.findOne(query);

        if(doc == null)
            return notFound(bookingId);

        doc.put("booking_id", bookingId);
        doc.removeField("_id");

        return ok(doc.toString());
    }

    public Result userBookingDetails()
    {
        String username = request().getHeader("X-User-id");
        String basicPassword =  request().getHeader("Authorization");

        if(basicPassword == null || basicPassword.isEmpty())
        {
            return notFound("password not entered");
        }

        String[] basicPasswordParts = basicPassword.split(" ");
        if(basicPasswordParts.length != 2)
        {
            return notFound("password value is not correct ");
        }

        String password = basicPasswordParts[1];

        BasicDBObject query = new BasicDBObject("_id",username).append("password", password);

        long count = dbUsersCollection.count(query);
        if(count==0)
        {
            return notFound("user and password does not match ");
        }
        else
        {

            DBObject findUserBookings = BasicDBObjectBuilder.start().add("username", username).get();
            List<DBObject> objects =  dbBookingsCollection.find(findUserBookings).toArray();
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("bookings", objects);
            return ok(jsonObject.toString());
        }
    }

    public Result userDetails(final String username)
    {
        String basicPassword =  request().getHeader("Authorization");

        if(basicPassword == null || basicPassword.isEmpty())
        {
            return notFound("password not entered");
        }

        String[] basicPasswordParts = basicPassword.split(" ");
        if(basicPasswordParts.length != 2)
        {
            return notFound("password value is not correct ");
        }

        String password = basicPasswordParts[1];

        BasicDBObject query = new BasicDBObject("_id",username).append("password", password);

        long count = dbUsersCollection.count(query);
        if(count==0)
        {
            return notFound("user and password does not match ");
        }
        else
        {

            DBObject object =  dbUsersCollection.findOne(query);
            return ok(object.toString());
        }
    }

    public Result createUser()
    {
        DynamicForm dynamicForm = Form.form().bindFromRequest();
        String username = dynamicForm.get("username");
        BasicDBObject query = new BasicDBObject("_id",username);
        long count = dbUsersCollection.count(query);
        if(count==0)
        {
            String firstName = dynamicForm.get("firstname");
            String lastName = dynamicForm.get("lastname");
            String middleName = dynamicForm.get("middlename");
            String password = dynamicForm.get("password");
            String emailId = dynamicForm.get("emailId");
            String phoneNumber = dynamicForm.get("phonenumber");

            BasicDBObject doc =
                    new BasicDBObject("_id", username).append("password", password)
                            .append("emailId",emailId).append("phoneNumber", phoneNumber)
                            .append("firstname", firstName).append("lastname", lastName).append("middlename", middleName);

            dbUsersCollection.insert(doc);

            JSONObject jsonObject = new JSONObject();
            jsonObject.put("username", username);
            jsonObject.put("success", 1);
            return created(jsonObject.toString());
        }
        else
        {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("error", "already exists " + username);
            jsonObject.put("success", 0);
            return badRequest(jsonObject.toString());
        }
    }

    public Result preFlight(final String all)
    {
        response().setHeader("Access-Control-Allow-Origin", "*");
        response().setHeader("Allow", "*");
        response().setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
        response().setHeader(
                "Access-Control-Allow-Headers",
                "Authentication, Origin, X-User-Id, Content-Type, Accept, Accept-Encoding, " +
                        "Accept-Language, Content-Length, Host, Referer, User-Agent");
        return ok();
    }
}


