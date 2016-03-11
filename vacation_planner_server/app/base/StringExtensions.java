package base;

/**
 * Created by kanikaagrawal on 2/21/16.
 */
public class StringExtensions
{
    public static boolean isNullOrEmpty(final String input)
    {
        if(input == null || input.isEmpty())
            return true;

        return false;
    }

    public static boolean isNotNullOrEmpty(final String input)
    {
        if(isNullOrEmpty(input))
            return false;

        return true;
    }
}
