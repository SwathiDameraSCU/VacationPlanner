package controllers.response;

import java.util.List;

/**
 * Created by kanikaagrawal on 2/21/16.
 */
public class FlightOption
{
    final public String totalSales;
    final public List<FlightSlice> flightSlices;

    public FlightOption(final String totalSales, final List<FlightSlice> flightSlices)
    {
        this.totalSales = totalSales;
        this.flightSlices = flightSlices;
    }

}
