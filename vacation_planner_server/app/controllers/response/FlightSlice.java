package controllers.response;

import java.util.List;

/**
 * Created by kanikaagrawal on 2/21/16.
 */
public class FlightSlice
{
    final public List<LegDetails> legs;

    public FlightSlice(final List<LegDetails> legs)
    {
        this.legs = legs;
    }
}
