/**
  * Created by kanikaagrawal on 3/1/16.
  */
import play.api.mvc._
import scala.concurrent.ExecutionContext.Implicits.global

class CorsFilter extends EssentialFilter
{
  def apply(next: EssentialAction) = new EssentialAction
  {
    def apply(requestHeader: RequestHeader) =
    {
      next(requestHeader).map
      {
        result => result.withHeaders("Access-Control-Allow-Origin" -> "*")
      }
    }
  }
}