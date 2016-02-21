package data.airports;

import java.util.List;

/**
 * Created by kanikaagrawal on 2/21/16.
 */
public class AirportsResponse
{
    public List<Airport> airports;
    public boolean success;
    public String errorMessage;
    public int processingDurationMillis;
}
