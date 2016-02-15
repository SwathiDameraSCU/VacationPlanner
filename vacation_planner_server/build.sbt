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
