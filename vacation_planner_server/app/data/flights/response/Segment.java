package data.flights.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

/**
 * Created by kanikaagrawal on 2/21/16.
 */
public class Segment
{
    public int connectionDuration;

    @JsonProperty("leg")
    public List<Leg> legs;
    public Flight flight;
}
