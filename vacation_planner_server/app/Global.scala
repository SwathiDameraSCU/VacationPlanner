import play.api._
import play.api.mvc._
import play.api.http.HeaderNames._
import scala.concurrent.ExecutionContext.Implicits.global

/**
  * Global application settings.
  */
object Global extends GlobalSettings {

  /**
    * Global action composition.
    */
  override def doFilter(action: EssentialAction): EssentialAction = EssentialAction { request =>
    action.apply(request).map(_.withHeaders(
      ACCESS_CONTROL_ALLOW_ORIGIN -> "*",
      ALLOW->"*",
      ACCESS_CONTROL_ALLOW_METHODS -> "POST, GET, PUT, DELETE, OPTIONS",
      ACCESS_CONTROL_ALLOW_HEADERS -> "Authentication, Origin, X-User-Id, Content-Type, Accept, Accept-Encoding, Accept-Language, Content-Length, Host, Referer, User-Agent"
    ))
  }
}