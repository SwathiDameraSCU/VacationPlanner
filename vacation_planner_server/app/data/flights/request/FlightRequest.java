package data.flights.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by kanikaagrawal on 2/21/16.
 */
@JsonRootName("request")
public class FlightRequest
{
    @JsonProperty("slice")
    public final List<Slice> slices;
    public final Passengers passengers;

    public final boolean refundable = false;
    public final int solutions = 20;

    public FlightRequest(final boolean isRoundTrip, final String origin,
                         final String destination, final Date departureDate,
                         final Date arrivalDate, final int adultCount, final int childCount)
    {
        this.passengers = new Passengers(adultCount, childCount);
        this.slices = new ArrayList<Slice>();
        this.slices.add(new Slice(origin, destination, departureDate));

        if(isRoundTrip)
            this.slices.add(new Slice(destination, origin, arrivalDate));
    }
}
