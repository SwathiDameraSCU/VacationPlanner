package data.airports;
import data.airports.response.AirportsResponse;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.MediaType;

/**
 * Created by kanikaagrawal on 2/21/16.
 */
public class AirportClient
{
    private static final String SITA_API_KEY ="d9d8fd5403a18c8121b86c50a71d58b8";
    private static final String SITA_BASE_URL = "https://airport.api.aero/";
    private static final String SITA_AIRPORT_URL = SITA_BASE_URL + "airport";

    private final Client client;
    private final WebTarget target;

    public AirportClient()
    {
        try
        {
            client = ClientBuilder.newClient();
            target = client.target(SITA_AIRPORT_URL).queryParam("user_key", SITA_API_KEY);
        }
        catch (final Exception ex)
        {
            throw new RuntimeException("Failed to create Airport Client.", ex);
        }
    }

    public AirportsResponse getAirports()
    {
        return target.request(MediaType.APPLICATION_JSON).get(AirportsResponse.class);
    }
}
