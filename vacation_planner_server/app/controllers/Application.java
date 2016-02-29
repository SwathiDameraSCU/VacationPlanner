package controllers;

import base.DateExtensions;
import base.StringExtensions;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import org.bson.types.ObjectId;
import org.json.JSONObject;
import com.mongodb.*;
import play.mvc.*;

import java.io.ByteArrayOutputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;


public class Application extends Controller
{
    private static MongoClient mongoClient = new MongoClient( "localhost" , 27017 );
    private static DB db= mongoClient.getDB("Vacation_Planner");
    private static DBCollection dbBookingsCollection = db.getCollection("Bookings");

    private static final AirportClient airportClient = new AirportClient();
    private static final FlightClient flightClient = new FlightClient();


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

            response().setHeader("Access-Control-Allow-Origin", "*");

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

            response().setHeader("Access-Control-Allow-Origin", "*");

            return ok(airportsObj.toString());
        }
        catch(final Exception ex)
        {
            return internalServerError(ex.getMessage());
        }
    }

    public Result bookings()
    {
        JsonNode json = request().body().asJson();
        if(json == null)
        {
            return badRequest("Expecting Json data");
        }
        else
        {
            BasicDBObject doc= new BasicDBObject("details",JSON.parse(json.toString()));
            dbBookingsCollection.insert(doc);
            String bookingId = doc.getString("_id");
            doc.put("booking_id", bookingId);
            doc.remove("_id");
            response().setHeader("Access-Control-Allow-Origin", "*");
            return created(doc.toString());
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

        response().setHeader("Access-Control-Allow-Origin", "*");
        return ok(doc.toString());
    }

}


