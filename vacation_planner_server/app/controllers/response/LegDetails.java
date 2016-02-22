package controllers.response;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

/**
 * Created by kanikaagrawal on 2/6/16.
 */
public class LegDetails
{
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm")
    public final Date departureTime;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm")
    public final Date arrivalTime;

    public final int duration;
    public final String destination;
    public final String origin;
    public final int connectionDuration;

    public LegDetails(final Date departureTime, final Date arrivalTime, final String destination,
                      final int duration, final String origin, final int connectionDuration)
    {
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.duration = duration;
        this.destination = destination;
        this.origin = origin;
        this.connectionDuration = connectionDuration;
    }
}
