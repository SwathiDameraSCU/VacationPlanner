package data.flights.request;

/**
 * Created by kanikaagrawal on 2/21/16.
 */
public class Passengers
{
    public final int adultCount;
    public final int childCount;
    public final int infantInLapCount = 0;
    public final int infantInSeatCount = 0;
    public final int seniorCount = 0;

    public Passengers(final int adultCount, final int childCount)
    {
        this.adultCount = adultCount;
        this.childCount = childCount;

    }
}
