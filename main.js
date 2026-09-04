/**
 * Main Application Entry Point
 * Orchestrates components, scroll reveals, and interactive animations
 */

import { PORTFOLIO_CONFIG } from './config.js';
import { ICONS } from './modules/icons.js';
import { initNavbar } from './modules/navbar.js';
import { initSkills } from './modules/skills.js';
import { initModals } from './modules/modal.js';
import { initContact } from './modules/contact.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize sub-modules
  initNavbar();
  initSkills();
  initModals();
  initContact();

  // 2. Configure dynamic social links and tooltips
  setupSocialLinks();

  // 3. Scroll Reveal Animations (respecting reduced motion)
  setupScrollReveal();

  // 4. Subtle Hero Canvas Tech Animation
  setupHeroBackground();

  // 5. Back to top button
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

/**
 * Sets up GitHub and LinkedIn links based on config
 */
function setupSocialLinks() {
  const githubLinks = document.querySelectorAll('.link-github');
  const linkedinLinks = document.querySelectorAll('.link-linkedin');

  githubLinks.forEach(link => {
    if (PORTFOLIO_CONFIG.social.github.url) {
      link.href = PORTFOLIO_CONFIG.social.github.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    } else {
      link.href = '#';
      link.classList.add('has-tooltip');
      link.setAttribute('data-tooltip', PORTFOLIO_CONFIG.social.github.placeholderMessage);
      link.addEventListener('click', (e) => {
        e.preventDefault();
        alert('GitHub Profile Link: You can update your GitHub profile URL in js/config.js');
      });
    }
  });

  linkedinLinks.forEach(link => {
    if (PORTFOLIO_CONFIG.social.linkedin.url) {
      link.href = PORTFOLIO_CONFIG.social.linkedin.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    } else {
      link.href = '#';
      link.classList.add('has-tooltip');
      link.setAttribute('data-tooltip', PORTFOLIO_CONFIG.social.linkedin.placeholderMessage);
      link.addEventListener('click', (e) => {
        e.preventDefault();
        alert('LinkedIn Profile Link: You can update your LinkedIn profile URL in js/config.js');
      });
    }
  });
}

/**
 * Scroll reveal observer for elements
 */
function setupScrollReveal() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
}

/**
 * Subtle interactive particle canvas for the hero section
 */
function setupHeroBackground() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;
  let width, height;

  function resize() {
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  }
  window.addEventListener('resize', resize, { passive: true });
  resize();

  const numParticles = Math.min(35, Math.floor(width / 30));
  const particles = [];

  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 1,
      color: Math.random() > 0.5 ? 'rgba(0, 242, 254, ' : 'rgba(79, 172, 254, '
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Draw lines between near particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 242, 254, ${0.12 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }

    // Draw particles
    for (let p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color}0.6)`;
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
    }

    animationFrameId = requestAnimationFrame(draw);
  }

  draw();
}
