package data.flights.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

/**
 * Created by kanikaagrawal on 2/21/16.
 */
public class Slice
{
    @JsonProperty("segment")
    public List<Segment> segments;
}
