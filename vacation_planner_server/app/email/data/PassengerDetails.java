package email.data;

/**
 * Created by kanikaagrawal on 2/28/16.
 */
public class PassengerDetails
{
    public final String firstName;
    public final String lastName;
    public final String gender;
    public final String dob;

    public PassengerDetails(final String firstName, final String lastName, final String gender, final String dob)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.dob = dob;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getGender() {
        return gender;
    }

    public String getDob() {
        return dob;
    }
}
