# Use an official JDK runtime as a parent image
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy Maven wrapper and pom.xml
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Download dependencies (to leverage Docker cache)
RUN ./mvnw dependency:go-offline

# Copy project source
COPY src src

# Build the Spring Boot app
RUN ./mvnw package -DskipTests

# Expose port (Spring Boot default is 8080)
EXPOSE 8080

# Run the jar file
CMD ["java", "-jar", "target/Nestora-0.0.1-SNAPSHOT.jar"]
