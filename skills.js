/**
 * Skills Module
 * Renders categorized technical skills and provides interactive tab filtering
 */

import { PORTFOLIO_CONFIG } from '../config.js';
import { ICONS } from './icons.js';

export function initSkills() {
  const container = document.getElementById('skillsGroupsContainer');
  const tabs = document.querySelectorAll('.skill-tab-btn');
  if (!container) return;

  const categories = [
    { id: 'languages', title: 'Programming Languages', icon: ICONS.code },
    { id: 'frontend', title: 'Frontend Development', icon: ICONS.layout },
    { id: 'backend', title: 'Backend Development', icon: ICONS.server },
    { id: 'database', title: 'Database & Storage', icon: ICONS.database },
    { id: 'tools', title: 'Developer Tools & Platforms', icon: ICONS.gitBranch },
    { id: 'interests', title: 'Key Technical Focus Areas', icon: ICONS.layers }
  ];

  function renderSkillGroups(activeCategory = 'all') {
    container.innerHTML = '';

    const filteredCategories = activeCategory === 'all' 
      ? categories 
      : categories.filter(cat => cat.id === activeCategory);

    filteredCategories.forEach(category => {
      const skillsInCat = PORTFOLIO_CONFIG.skills.filter(s => s.category === category.id);
      if (skillsInCat.length === 0) return;

      const card = document.createElement('div');
      card.className = 'glass-card skill-group-card';
      card.setAttribute('data-category', category.id);

      const header = document.createElement('div');
      header.className = 'skill-group-header';
      header.innerHTML = `
        <div class="skill-group-icon">${category.icon}</div>
        <h3 class="skill-group-title">${category.title}</h3>
      `;

      const pillsWrap = document.createElement('div');
      pillsWrap.className = 'skill-pills-wrap';

      skillsInCat.forEach(skill => {
        const iconSvg = ICONS[skill.icon] || ICONS.zap;
        const pill = document.createElement('div');
        pill.className = 'skill-pill';
        pill.innerHTML = `
          <span>${iconSvg}</span>
          <span>${skill.name}</span>
        `;
        pillsWrap.appendChild(pill);
      });

      card.appendChild(header);
      card.appendChild(pillsWrap);
      container.appendChild(card);
    });
  }

  // Initial render
  renderSkillGroups('all');

  // Filter tabs click handling
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const category = tab.getAttribute('data-filter');
      renderSkillGroups(category);
    });
  });
}
