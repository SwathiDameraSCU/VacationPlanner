package email;

import com.fasterxml.jackson.databind.JsonNode;
import data.flights.FlightClient;
import email.data.FlightDetails;
import email.data.PassengerDetails;
import freemarker.template.Configuration;
import freemarker.template.Template;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import java.io.*;
import java.util.*;
import java.util.concurrent.ExecutionException;

/**
 * Created by kanikaagrawal on 2/28/16.
 */
public class MailClient
{
    final Properties props;


    public MailClient()
    {
        try
        {
            props = new Properties();
            props.load(new FileInputStream(new File("conf/settings.properties")));
        }
        catch(final Exception ex)
        {
            throw new RuntimeException(ex);
        }
    }

    public void sendBookingsEmail(JsonNode jsonDetails)
    {
        try
        {
            final Session session = Session.getInstance(props, new Authenticator()
            {
                protected PasswordAuthentication getPasswordAuthentication()
                {
                    return new PasswordAuthentication("escapade101.scu@gmail.com", "escapade");
                }
            });

            String bookingId = jsonDetails.get("booking_id").asText();

            JsonNode json = jsonDetails.get("details");
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress("escapade101.scu@gmail.com"));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(json.get("emailId").asText()));
            message.setSubject("Booking Details for " + bookingId);

            JsonNode flightNode =json.get("flights");
            List<FlightDetails> flightDetails = new ArrayList<FlightDetails>();

            for (JsonNode node : flightNode)
            {
                String departureTime = node.path("departureTime").asText();
                String arrivalTime = node.path("arrivalTime").asText();
                String duration = node.path("duration").asText();
                String origin = node.path("origin").asText();
                String destination = node.path("destination").asText();
                String carrier = node.path("carrier").asText();
                String number = node.path("number").asText();

                String connectionDuration = null;
                if(node.path("connectionDuration") != null)
                    connectionDuration = node.path("connectionDuration").asText();

                FlightDetails flightDetail = new FlightDetails(departureTime, arrivalTime, duration, origin,
                destination, carrier, number, connectionDuration);

                flightDetails.add(flightDetail);
            }

            JsonNode passengerNode =json.get("passengers");
            List<PassengerDetails> passengerDetails = new ArrayList<PassengerDetails>();

            for (JsonNode node : passengerNode)
            {
                String firstname = node.path("firstname").asText();
                String middlename = node.path("middlename").asText();
                String lastname = node.path("lastname").asText();
                String gender = node.path("gender").asText();
                String dob = node.path("dob").asText();

                PassengerDetails passengerDetail = new PassengerDetails(firstname, middlename, lastname, gender, dob);
                passengerDetails.add(passengerDetail);
            }

            Configuration cfg = new Configuration();
            Template template = cfg.getTemplate("conf/mail.template");
            Map<String, Object> root = new HashMap<String, Object>();
            root.put("flights", flightDetails);
            root.put("passengers", passengerDetails);
            root.put("bookingId", bookingId);

            Writer out = new StringWriter();
            template.process(root, out);
            message.setText(out.toString());

            Transport.send(message);
        }
        catch(Exception ex)
        {
            System.out.print(ex.getMessage());
        }
    }
}
