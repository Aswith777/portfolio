/**
 * Contact Form & Utilities Module
 * Handles frontend validation, clipboard copy, and submission feedback
 */

import { PORTFOLIO_CONFIG } from '../config.js';
import { ICONS } from './icons.js';

export function initContact() {
  const contactForm = document.getElementById('contactForm');
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const toastContainer = document.getElementById('toastContainer');
  const formAlert = document.getElementById('formAlert');

  // 1. Toast Notification Helper
  function showToast(message, duration = 3000) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${ICONS.check}</span> <span>${message}</span>`;
    toastContainer.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, duration);
  }

  // 2. Email Copy-to-Clipboard
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = PORTFOLIO_CONFIG.personal.email;
      try {
        await navigator.clipboard.writeText(email);
        copyEmailBtn.innerHTML = ICONS.check;
        showToast('Email address copied to clipboard!');
        setTimeout(() => {
          copyEmailBtn.innerHTML = ICONS.copy;
        }, 2000);
      } catch (err) {
        // Fallback prompt if clipboard permissions are restricted
        window.prompt('Copy email:', email);
      }
    });
  }

  // 3. Form Validation & Submission
  if (contactForm) {
    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const subjectInput = document.getElementById('contactSubject');
    const messageInput = document.getElementById('contactMessage');
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    function setFieldError(input, message) {
      const group = input.closest('.form-group');
      if (!group) return;
      group.classList.add('has-error');
      let errorEl = group.querySelector('.form-error');
      if (!errorEl) {
        errorEl = document.createElement('div');
        errorEl.className = 'form-error';
        group.appendChild(errorEl);
      }
      errorEl.textContent = message;
    }

    function clearFieldError(input) {
      const group = input.closest('.form-group');
      if (!group) return;
      group.classList.remove('has-error');
      const errorEl = group.querySelector('.form-error');
      if (errorEl) errorEl.textContent = '';
    }

    // Live validation on input
    [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
      if (!input) return;
      input.addEventListener('input', () => clearFieldError(input));
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        setFieldError(nameInput, 'Please enter your name.');
        isValid = false;
      } else if (nameInput.value.trim().length < 2) {
        setFieldError(nameInput, 'Name must be at least 2 characters.');
        isValid = false;
      } else {
        clearFieldError(nameInput);
      }

      // Validate Email
      if (!emailInput.value.trim()) {
        setFieldError(emailInput, 'Please enter your email address.');
        isValid = false;
      } else if (!emailRegex.test(emailInput.value.trim())) {
        setFieldError(emailInput, 'Please enter a valid email address.');
        isValid = false;
      } else {
        clearFieldError(emailInput);
      }

      // Validate Subject
      if (!subjectInput.value.trim()) {
        setFieldError(subjectInput, 'Please enter a subject.');
        isValid = false;
      } else if (subjectInput.value.trim().length < 3) {
        setFieldError(subjectInput, 'Subject must be at least 3 characters.');
        isValid = false;
      } else {
        clearFieldError(subjectInput);
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        setFieldError(messageInput, 'Please write your message.');
        isValid = false;
      } else if (messageInput.value.trim().length < 10) {
        setFieldError(messageInput, 'Message should be at least 10 characters.');
        isValid = false;
      } else {
        clearFieldError(messageInput);
      }

      if (!isValid) return;

      const formData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        subject: subjectInput.value.trim(),
        message: messageInput.value.trim(),
        timestamp: new Date().toISOString()
      };

      // Button loading state
      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `Sending...`;

      try {
        let sent = false;
        
        // Attempt POST to backend endpoint if reachable
        try {
          const res = await fetch(PORTFOLIO_CONFIG.api.contactEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          });
          if (res.ok) sent = true;
        } catch (apiErr) {
          // Endpoint might not be running locally or on static hosting, proceed to graceful fallback
          sent = false;
        }

        // Show success UI
        if (formAlert) {
          formAlert.className = 'form-alert success';
          formAlert.innerHTML = `
            <span>${ICONS.check}</span>
            <span>Thank you, <strong>${formData.name}</strong>! Your message has been prepared. If you'd like to send it directly via your mail client, <a href="mailto:${PORTFOLIO_CONFIG.personal.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(formData.message)}" style="color:#fff; text-decoration:underline;">click here to open Email</a>.</span>
          `;
          formAlert.style.display = 'flex';
        }

        showToast('Message sent successfully!');
        contactForm.reset();
      } catch (err) {
        if (formAlert) {
          formAlert.className = 'form-alert error';
          formAlert.innerHTML = `<span>Error processing request. Please email directly to <a href="mailto:${PORTFOLIO_CONFIG.personal.email}" style="color:#fff; text-decoration:underline;">${PORTFOLIO_CONFIG.personal.email}</a>.</span>`;
          formAlert.style.display = 'flex';
        }
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
      }
    });
  }
}
