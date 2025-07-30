
FROM openjdk:17-jdk-slim

RUN apt-get update && apt-get install -y maven && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY pom.xml .

RUN mvn dependency:go-offline -B

COPY src ./src

RUN mvn clean compile

EXPOSE 5000

CMD ["mvn", "spring-boot:run", "-Dspring-boot.run.args=--server.port=5000 --server.address=0.0.0.0"]
