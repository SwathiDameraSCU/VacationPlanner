package base;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by kanikaagrawal on 2/21/16.
 */
public class DateExtensions
{
    public static Date getDateFromString(final String input, final String format) throws ParseException
    {
        final SimpleDateFormat formatter = new SimpleDateFormat(format);
        return formatter.parse(input);
    }
}
