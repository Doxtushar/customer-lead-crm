# syntax=docker/dockerfile:1.7

FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /workspace

COPY customerleadcrm/pom.xml customerleadcrm/pom.xml
COPY customerleadcrm/.mvn customerleadcrm/.mvn
COPY customerleadcrm/mvnw customerleadcrm/mvnw
COPY customerleadcrm/mvnw.cmd customerleadcrm/mvnw.cmd

WORKDIR /workspace/customerleadcrm
RUN mvn -B -DskipTests dependency:go-offline

COPY customerleadcrm/src src
RUN mvn -B -DskipTests package

FROM eclipse-temurin:21-jre-alpine AS runtime
WORKDIR /app

RUN addgroup -S spring && adduser -S spring -G spring

COPY --from=build /workspace/customerleadcrm/target/*.jar app.jar

USER spring:spring
EXPOSE 8080

ENV JAVA_OPTS="-XX:MaxRAMPercentage=75.0 -XX:+UseContainerSupport"
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar /app/app.jar"]
