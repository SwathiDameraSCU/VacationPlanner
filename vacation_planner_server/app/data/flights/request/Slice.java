package data.flights.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.util.Date;

/**
 * Created by kanikaagrawal on 2/21/16.
 */
public class Slice
{
    public final String origin;
    public final String destination;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    public final Date date;

    public Slice(final String origin, final String destination, final Date date)
    {
        this.origin = origin;
        this.destination = destination;
        this.date = date;

    }
}
