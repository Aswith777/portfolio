package com.aswith.portfolio.service;

import com.aswith.portfolio.dto.ContactRequestDto;
import com.aswith.portfolio.model.ContactMessage;
import com.aswith.portfolio.repository.ContactMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service handling contact submissions and email notifications.
 */
@Service
public class ContactService {

    private final ContactMessageRepository repository;

    @Autowired
    public ContactService(ContactMessageRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public ContactMessage processContactSubmission(ContactRequestDto request) {
        // Map DTO to Persistent Entity
        ContactMessage entity = new ContactMessage(
                request.getName().trim(),
                request.getEmail().trim().toLowerCase(),
                request.getSubject().trim(),
                request.getMessage().trim()
        );

        // Persist message to SQL database
        ContactMessage saved = repository.save(entity);

        // In production: trigger private SMTP email notification to chinthapalliaswith@gmail.com
        System.out.println(String.format(
                "[ContactService] Persisted new message #%d from: %s (%s)",
                saved.getId(), saved.getName(), saved.getEmail()
        ));

        return saved;
    }
}
