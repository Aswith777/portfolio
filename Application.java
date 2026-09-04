package com.aswith.portfolio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Spring Boot Main Application Entry Point
 * CH. ASWITH - Personal Portfolio Backend API
 */
@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
        System.out.println(">>> CH. ASWITH Portfolio Backend API is up and running on port 8080!");
    }
}
