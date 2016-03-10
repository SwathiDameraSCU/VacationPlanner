package data.flights;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import data.flights.request.FlightRequest;
import data.flights.response.FlightsResponse;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.IOException;
import java.util.Date;

/**
 * Created by kanikaagrawal on 2/21/16.
 */
public class FlightClient
{
    //private static final String QPX_EXPRESS_KEY= "AIzaSyATooUng3tF5PYpdd-XSAO7pD0iyWJ6a-M";//"AIzaSyDcNsU4mGpKqI22r7fNN0kI3MNrSZafZhc";  //"AIzaSyClbK0I0qMsVgd2rKJxz5u9pXNHyu2UguA";
    private static final String QPX_EXPRESS_KEY= "AIzaSyCAaVudlwsgEjR8wsigbIbFPW_T6kQ2dSs";//"AIzaSyDcNsU4mGpKqI22r7fNN0kI3MNrSZafZhc";
    private static final String QPX_BASE_URL = "https://www.googleapis.com/qpxExpress/v1/";
    private static final String QPX_FLIGHT_URL = QPX_BASE_URL + "trips/search";

    private final Client client;
    private final WebTarget target;

    public FlightClient()
    {
        try
        {
            client  = ClientBuilder.newClient();
            target = client.target(QPX_FLIGHT_URL).queryParam("key", QPX_EXPRESS_KEY);
        }
        catch (final Exception ex)
        {
            throw new RuntimeException("Failed to create FlightDetails Client", ex);
        }
    }

    public FlightsResponse getFlights(final boolean isRoundTrip, final String origin,
                                      final String destination, final Date departureDate,
                                      final Date arrivalDate, final int adultCount, final int childCount)
            throws IOException
    {
        final FlightRequest flightRequest = new FlightRequest(isRoundTrip, origin, destination, departureDate,
                arrivalDate, adultCount, childCount);

        final ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(SerializationFeature.WRAP_ROOT_VALUE, true);

        final Response response =
                target.request(MediaType.APPLICATION_JSON).post(
                        Entity.json(objectMapper.writeValueAsString(flightRequest)));

        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        return objectMapper.readValue(response.readEntity(String.class), FlightsResponse.class);
    }
}
