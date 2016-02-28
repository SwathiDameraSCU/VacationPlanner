package email.data;

/**
 * Created by kanikaagrawal on 2/28/16.
 */
public class FlightDetails
{
    public final String departureTime;
    public final String arrivalTime;
    public final String duration;
    public final String origin;
    public final String destination;
    public final String carrier;
    public final String number;
    public final String ConnectionDuration;

    public FlightDetails(final String departureTime, final String arrivalTime, final String duration, final String origin,
                         final String destination, final String carrier, final String number, final String connectionDuration)
    {
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.duration = duration;
        this.origin = origin;
        this.destination = destination;
        this.carrier = carrier;
        this.number = number;
        this.ConnectionDuration = connectionDuration;
    }

    public String getDepartureTime() {
        return departureTime;
    }

    public String getArrivalTime() {
        return arrivalTime;
    }

    public String getDuration() {
        return duration;
    }

    public String getOrigin() {
        return origin;
    }

    public String getDestination() {
        return destination;
    }

    public String getCarrier() {
        return carrier;
    }

    public String getNumber() {
        return number;
    }

    public String getConnectionDuration() {
        return ConnectionDuration;
    }
}
