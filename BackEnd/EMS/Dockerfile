FROM openjdk:21
LABEL MAINTAINER="EMSAPP"
ADD target/EMS-0.0.1-SNAPSHOT.jar  EMSAppDocker.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "EMSAppDocker.jar"]


