package com.aswith.portfolio.controller;

import com.aswith.portfolio.dto.ApiResponseDto;
import com.aswith.portfolio.dto.ContactRequestDto;
import com.aswith.portfolio.model.ContactMessage;
import com.aswith.portfolio.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

/**
 * REST Controller exposing /api/contact for the portfolio frontend.
 */
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "${cors.allowed-origins}")
public class ContactController {

    private final ContactService contactService;

    @Autowired
    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    /**
     * Health check endpoint
     */
    @GetMapping("/health")
    public ResponseEntity<ApiResponseDto<String>> healthCheck() {
        return ResponseEntity.ok(ApiResponseDto.success("API is healthy and operational.", "UP"));
    }

    /**
     * Handle incoming contact submissions
     */
    @PostMapping("/contact")
    public ResponseEntity<ApiResponseDto<?>> submitContact(
            @Valid @RequestBody ContactRequestDto request,
            BindingResult bindingResult
    ) {
        if (bindingResult.hasErrors()) {
            String errorMessage = bindingResult.getAllErrors().get(0).getDefaultMessage();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponseDto.error(errorMessage));
        }

        try {
            ContactMessage message = contactService.processContactSubmission(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(
                    ApiResponseDto.success("Thank you! Your message has been received.", message.getId())
            );
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    ApiResponseDto.error("Failed to process message. Please try again later.")
            );
        }
    }
}
