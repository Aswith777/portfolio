package com.aswith.portfolio.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Data Transfer Object for incoming contact form requests.
 * Includes strict validation constraints.
 */
public class ContactRequestDto {

    @NotBlank(message = "Name must not be empty.")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters.")
    private String name;

    @NotBlank(message = "Email must not be empty.")
    @Email(message = "Email format is invalid.")
    private String email;

    @NotBlank(message = "Subject must not be empty.")
    @Size(min = 3, max = 150, message = "Subject must be between 3 and 150 characters.")
    private String subject;

    @NotBlank(message = "Message must not be empty.")
    @Size(min = 10, max = 3000, message = "Message must be between 10 and 3000 characters.")
    private String message;

    public ContactRequestDto() {}

    public ContactRequestDto(String name, String email, String subject, String message) {
        this.name = name;
        this.email = email;
        this.subject = subject;
        this.message = message;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
