package data.flights.response;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

/**
 * Created by kanikaagrawal on 2/21/16.
 */
public class Leg
{
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm")
    public Date departureTime;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm")
    public Date arrivalTime;

    public int duration;
    public String destination;
    public String origin;
}
