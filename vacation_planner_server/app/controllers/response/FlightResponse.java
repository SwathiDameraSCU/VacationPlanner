package controllers.response;

import java.util.List;

/**
 * Created by kanikaagrawal on 2/21/16.
 */
public class FlightResponse
{
    public final List<FlightOption> options;

    public FlightResponse(final List<FlightOption> options)
    {
        this.options = options;
    }
}
