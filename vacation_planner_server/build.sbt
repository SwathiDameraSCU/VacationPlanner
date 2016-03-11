name := """vacation_planner"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayJava)

scalaVersion := "2.11.6"

libraryDependencies ++= Seq(
  javaJdbc,
  cache,
  javaWs
)

// Play provides two styles of routers, one expects its actions to be injected, the
// other, legacy style, accesses its actions statically.
routesGenerator := InjectedRoutesGenerator

libraryDependencies += "org.apache.httpcomponents" % "httpclient" % "4.5.1"
libraryDependencies += "org.json" % "json" % "20151123"
libraryDependencies += "org.mongodb" % "mongo-java-driver" % "3.2.1"
libraryDependencies += "javax.ws.rs" % "javax.ws.rs-api" % "2.0.1"
libraryDependencies += "org.glassfish.jersey.core" % "jersey-client" % "2.22.2"
libraryDependencies += "org.glassfish.jersey.media" % "jersey-media-moxy" % "2.22.2"
libraryDependencies += "com.owlike" % "genson" % "1.3"
libraryDependencies += "org.glassfish.jersey.media" % "jersey-media-json-jackson" % "2.22.2"
libraryDependencies += "org.freemarker" % "freemarker" % "2.3.23"
libraryDependencies += "javax.mail" % "javax.mail-api" % "1.5.5"
libraryDependencies += "javax.activation" % "activation" % "1.1.1"
libraryDependencies += "com.sun.mail" % "javax.mail" % "1.5.5"
