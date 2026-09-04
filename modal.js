/**
 * Modal Dialog Module
 * Accessible modal management for Resume instructions and Project Details
 */

import { PORTFOLIO_CONFIG } from '../config.js';
import { ICONS } from './icons.js';

export function initModals() {
  const modalOverlay = document.getElementById('modalOverlay');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');

  if (!modalOverlay || !modalBody || !modalClose) return;

  function openModal(contentHtml) {
    modalBody.innerHTML = contentHtml;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    modalClose.focus();
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  // Resume Download Buttons
  const resumeButtons = document.querySelectorAll('.trigger-resume');
  resumeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      
      if (PORTFOLIO_CONFIG.resume.isAvailable) {
        // Direct download if file exists
        const link = document.createElement('a');
        link.href = PORTFOLIO_CONFIG.resume.filePath;
        link.download = PORTFOLIO_CONFIG.resume.fileName;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // Show configured modal with exact student details and setup instructions
        openModal(`
          <div style="text-align: left;">
            <div style="display:flex; align-items:center; gap:12px; margin-bottom:16px;">
              <div style="width:44px; height:44px; border-radius:10px; background:rgba(0,242,254,0.1); color:var(--accent-cyan); display:flex; align-items:center; justify-content:center;">
                ${ICONS.download}
              </div>
              <div>
                <h3 style="font-size:1.4rem; margin:0;">Resume Information</h3>
                <p style="font-size:0.85rem; color:var(--text-muted); margin:0;">${PORTFOLIO_CONFIG.personal.displayName}</p>
              </div>
            </div>

            <div style="background:rgba(255,255,255,0.03); border:1px solid var(--glass-border); border-radius:10px; padding:16px; margin-bottom:20px;">
              <p style="font-size:0.95rem; margin-bottom:10px; color:var(--text-primary);">
                <strong>Candidate:</strong> ${PORTFOLIO_CONFIG.personal.fullName}
              </p>
              <p style="font-size:0.95rem; margin-bottom:10px; color:var(--text-primary);">
                <strong>Education:</strong> B.Tech (CIC), ${PORTFOLIO_CONFIG.personal.college} (Graduating ${PORTFOLIO_CONFIG.personal.gradYear})
              </p>
              <p style="font-size:0.95rem; margin-bottom:10px; color:var(--text-primary);">
                <strong>CGPA:</strong> ${PORTFOLIO_CONFIG.personal.cgpa}
              </p>
              <p style="font-size:0.95rem; margin-bottom:0; color:var(--text-primary);">
                <strong>Email:</strong> <a href="mailto:${PORTFOLIO_CONFIG.personal.email}">${PORTFOLIO_CONFIG.personal.email}</a>
              </p>
            </div>

            <div style="background:rgba(0,242,254,0.05); border:1px dashed rgba(0,242,254,0.3); border-radius:10px; padding:16px; margin-bottom:20px;">
              <p style="font-size:0.85rem; color:var(--text-secondary); margin:0;">
                💡 <strong>For Aswith:</strong> To attach your PDF resume, place your resume document at:
                <br><code style="background:rgba(0,0,0,0.4); padding:3px 6px; border-radius:4px; color:var(--accent-cyan); display:inline-block; margin-top:6px;">assets/resume/${PORTFOLIO_CONFIG.resume.fileName}</code>
                <br>Then in <code style="color:var(--accent-cyan);">js/config.js</code>, set <code style="color:var(--accent-cyan);">isAvailable: true</code>.
              </p>
            </div>

            <div style="display:flex; justify-content:flex-end; gap:12px;">
              <button class="btn btn-secondary" id="modalCloseActionBtn">Close</button>
              <a href="mailto:${PORTFOLIO_CONFIG.personal.email}?subject=Resume%20Request%20-%20CH.%20ASWITH" class="btn btn-primary">
                ${ICONS.mail} Request via Email
              </a>
            </div>
          </div>
        `);

        document.getElementById('modalCloseActionBtn')?.addEventListener('click', closeModal);
      }
    });
  });

  // Project Info Buttons
  const projectDetailsButtons = document.querySelectorAll('.trigger-project-modal');
  projectDetailsButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project-id');
      const project = PORTFOLIO_CONFIG.projects.find(p => p.id === projectId);
      if (!project) return;

      openModal(`
        <div style="text-align: left;">
          <div style="display:flex; align-items:center; gap:12px; margin-bottom:16px;">
            <div style="width:44px; height:44px; border-radius:10px; background:rgba(16,185,129,0.1); color:var(--accent-emerald); display:flex; align-items:center; justify-content:center;">
              ${ICONS.layers}
            </div>
            <div>
              <h3 style="font-size:1.4rem; margin:0;">${project.title}</h3>
              <p style="font-size:0.85rem; color:var(--accent-emerald); margin:0;">${project.category}</p>
            </div>
          </div>

          <p style="font-size:1rem; line-height:1.7; color:var(--text-secondary); margin-bottom:20px;">
            ${project.description}
          </p>

          <div style="margin-bottom:20px;">
            <h4 style="font-size:0.9rem; color:var(--text-muted); text-transform:uppercase; margin-bottom:8px; font-family:var(--font-mono);">Tags & Classification</h4>
            <div style="display:flex; flex-wrap:wrap; gap:8px;">
              ${project.tags.map(t => `<span class="badge badge-cyan">${t}</span>`).join('')}
            </div>
          </div>

          <div style="background:rgba(255,255,255,0.02); border:1px dashed var(--glass-border); border-radius:10px; padding:14px; margin-bottom:20px;">
            <p style="font-size:0.85rem; color:var(--text-muted); margin:0;">
              🔗 <strong>Project Deployment / Code Repository:</strong>
              <br>When your live demo URL and GitHub repo are ready, paste the URLs in <code style="color:var(--accent-cyan);">js/config.js</code> under <code style="color:var(--accent-cyan);">projects</code>.
            </p>
          </div>

          <div style="display:flex; justify-content:flex-end;">
            <button class="btn btn-secondary" id="modalCloseActionBtn2">Close</button>
          </div>
        </div>
      `);

      document.getElementById('modalCloseActionBtn2')?.addEventListener('click', closeModal);
    });
  });
}
