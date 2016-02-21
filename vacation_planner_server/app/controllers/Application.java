package controllers;

import base.StringExtensions;
import com.fasterxml.jackson.databind.JsonNode;
import com.mongodb.util.JSON;
import data.airports.Airport;
import data.airports.AirportClient;
import data.airports.AirportsResponse;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.json.JSONArray;
import org.json.JSONObject;
import com.mongodb.*;
import play.mvc.*;
import views.html.*;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;


public class Application extends Controller
{
    private static final String qpxExpressKey="AIzaSyClbK0I0qMsVgd2rKJxz5u9pXNHyu2UguA";

    private static MongoClient mongoClient = new MongoClient( "localhost" , 27017 );
    private static DB db= mongoClient.getDB("Vacation_Planner");
    private static DBCollection dbBookingsCollection = db.getCollection("Bookings");

    private static final AirportClient airportClient = new AirportClient();

    public Result getFlights()
    {
        boolean roundTrip = Boolean.parseBoolean(request().getQueryString("round-trip"));

        JSONObject object = new JSONObject();
        JSONObject requestObject = new JSONObject();

        JSONArray sliceArray = new JSONArray();
        JSONObject sliceArrayObjectOne = new JSONObject();
        sliceArrayObjectOne.put("origin", request().getQueryString("origin"));
        sliceArrayObjectOne.put("destination", request().getQueryString("destination"));
        sliceArrayObjectOne.put("date", request().getQueryString("departure-date"));
        sliceArray.put(sliceArrayObjectOne);

        if(roundTrip)
        {
            JSONObject sliceArrayObjectTwo = new JSONObject();
            sliceArrayObjectTwo.put("origin", request().getQueryString("destination"));
            sliceArrayObjectTwo.put("destination", request().getQueryString("origin"));
            sliceArrayObjectTwo.put("date", request().getQueryString("arrival-date"));
            sliceArray.put(sliceArrayObjectTwo);
        }

        JSONObject passengerObject = new JSONObject();
        passengerObject.put("adultCount", request().getQueryString("adult-count"));
        passengerObject.put("infantInLapCount", 0);
        passengerObject.put("infantInSeatCount", 0);
        passengerObject.put("childCount", request().getQueryString("child-count"));
        passengerObject.put("seniorCount", 0);

        requestObject.put("slice",sliceArray);
        requestObject.put("passengers", passengerObject);
        requestObject.put("solutions", 20);
        requestObject.put("refundable", false);

        object.put("request", requestObject);

        try
        {
            HttpClient client = HttpClientBuilder.create().build();
            HttpPost httpPost = new HttpPost("https://www.googleapis.com/qpxExpress/v1/trips/search?key="+qpxExpressKey);

            String json = object.toString();
            StringEntity entity = new StringEntity(json);
            httpPost.setEntity(entity);
            httpPost.setHeader("Accept", "application/json");
            httpPost.setHeader("Content-type", "application/json");

            HttpResponse response = client.execute(httpPost);

            BufferedReader rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));

            StringBuffer result = new StringBuffer();
            String line = "";

            while ((line = rd.readLine()) != null) {
                result.append(line);
            }

            JSONArray httpResponseArray = new JSONArray();

            //Extracting the required information
            JSONObject responseObj = new JSONObject(result.toString());
            JSONObject tripsObj = responseObj.getJSONObject("trips");
            JSONArray tripOptionArray = tripsObj.getJSONArray("tripOption");

            for(int i = 0;i < tripOptionArray.length();i++)
            {
                FlightDetails leg = new FlightDetails();
                JSONObject currTrip = tripOptionArray.getJSONObject(i);
                String totalSales = currTrip.getString("saleTotal");

                JSONArray sliceArr = currTrip.getJSONArray("slice");
                JSONObject Obj = new JSONObject();
                Obj.put("totalSales", totalSales);
                JSONArray jsonLegArray = new JSONArray();

                for(int j = 0;j < sliceArr.length(); j++)
                {
                    JSONObject currSlice = sliceArr.getJSONObject(j);
                    JSONArray segmentArray = currSlice.getJSONArray("segment");
                    int legCount = 0;
                    for(int k = 0;k < segmentArray.length();k++)
                    {
                        legCount++;
                        JSONObject currSegment = segmentArray.getJSONObject(k);

                        if(currSegment.has("connectionDuration"))
                        {
                            leg.connectionDuration = currSegment.getInt("connectionDuration");
                        }
                        else
                        {
                            leg.connectionDuration = 0;
                        }
                        JSONArray legArray = currSegment.getJSONArray("leg");

                        for(int l =0; l< legArray.length();l++)
                        {

                            JSONObject currLeg = legArray.getJSONObject(l);
                            leg.departureTime = currLeg.getString("departureTime");
                            leg.arrivalTime = currLeg.getString("arrivalTime");
                            leg.duration = currLeg.getInt("duration");
                            leg.destination = currLeg.getString("destination");
                            leg.origin = currLeg.getString("origin");
                            leg.flightId = currLeg.getString("id");

                            JSONObject jsonInfoObject = new JSONObject();
                            jsonInfoObject.put("origin", leg.origin);
                            jsonInfoObject.put("destination", leg.destination);
                            jsonInfoObject.put("departureTime", leg.departureTime);
                            jsonInfoObject.put("arrivalTime", leg.arrivalTime);
                            jsonInfoObject.put("duration", leg.duration);
                            jsonInfoObject.put("flightId", leg.flightId);

                            if(leg.connectionDuration > 0)
                                jsonInfoObject.put("connectionDuration", leg.connectionDuration);

                            JSONObject jsonLegObject = new JSONObject();
                            jsonLegObject.put("leg"+legCount, jsonInfoObject);
                            jsonLegArray.put(jsonLegObject);
                        }
                    }
                    Obj.put("leg", jsonLegArray);
                }
                httpResponseArray.put(Obj);
            }

            JSONObject httpResponse = new JSONObject();
            httpResponse.put("options", httpResponseArray);

            return ok(httpResponse.toString());
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
        return ok(doc.toString());
    }

}


