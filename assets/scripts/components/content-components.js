/**
 * Content Components
 * Professional summary, skills, experience, education components
 */

/**
 * Professional Summary Component
 */
class ProfessionalSummary extends BaseComponent {
  static get observedAttributes() {
    return ['expandable'];
  }
  
  constructor() {
    super();
    this.isExpanded = false;
  }
  
  connectedCallback() {
    super.connectedCallback();
  }
  
  render() {
    const expandable = this.getAttribute('expandable') === 'true';
    
    if (expandable) {
      this.classList.add('expandable-summary');
      this.setupExpandableContent();
    }
  }
  
  setupExpandableContent() {
    // Brief and detail content are handled by slots
    const brief = this.querySelector('summary-brief');
    const detail = this.querySelector('summary-detail');
    
    if (brief && detail && !this.querySelector('.expand-toggle')) {
      const toggle = this.createElement('button', {
        className: 'expand-toggle',
        'aria-expanded': 'false'
      }, 'Read More');
      
      brief.insertAdjacentElement('afterend', toggle);
      
      toggle.addEventListener('click', () => {
        this.toggleExpansion();
      });
    }
  }
  
  toggleExpansion() {
    this.isExpanded = !this.isExpanded;
    this.toggleClass('expanded', this.isExpanded);
    
    const toggle = this.querySelector('.expand-toggle');
    if (toggle) {
      toggle.textContent = this.isExpanded ? 'Read Less' : 'Read More';
      toggle.setAttribute('aria-expanded', this.isExpanded.toString());
    }
    
    this.emit('summary-toggle', { expanded: this.isExpanded });
  }
}

/**
 * Summary Brief Component
 */
class SummaryBrief extends BaseComponent {
  connectedCallback() {
    super.connectedCallback();
  }
  
  render() {
    this.classList.add('summary-brief');
  }
}

/**
 * Summary Line Component
 */
class SummaryLine extends BaseComponent {
  connectedCallback() {
    super.connectedCallback();
  }
  
  render() {
    this.classList.add('summary-line');
  }
}

/**
 * Summary Detail Component
 */
class SummaryDetail extends BaseComponent {
  connectedCallback() {
    super.connectedCallback();
  }
  
  render() {
    this.classList.add('summary-detail');
  }
}

/**
 * Technical Skills Component
 */
class TechnicalSkills extends BaseComponent {
  connectedCallback() {
    super.connectedCallback();
  }
  
  render() {
    this.classList.add('skills-container');
    
    // Wrap skills categories in container
    if (!this.querySelector('.skills-grid')) {
      const container = this.createElement('div', { className: 'skills-grid' });
      
      const skillsCategories = this.querySelectorAll('skills-category');
      skillsCategories.forEach(category => {
        container.appendChild(category);
      });
      
      // Find h2 and insert container after it
      const title = this.querySelector('h2');
      if (title) {
        title.insertAdjacentElement('afterend', container);
      } else {
        this.appendChild(container);
      }
    }
  }
}

/**
 * Skills Category Component
 */
class SkillsCategory extends BaseComponent {
  static get observedAttributes() {
    return ['title'];
  }
  
  constructor() {
    super();
  }
  
  connectedCallback() {
    super.connectedCallback();
  }
  
  render() {
    const title = this.getAttribute('title');
    
    if (title && !this.querySelector('.category-title')) {
      const titleElement = this.createElement('h3', { 
        className: 'category-title' 
      }, title);
      
      this.insertBefore(titleElement, this.firstChild);
    }
    
    // Wrap skill tags in container
    if (!this.querySelector('.skill-tags')) {
      const container = this.createElement('div', { className: 'skill-tags' });
      
      const skillTags = this.querySelectorAll('skill-tag');
      skillTags.forEach(tag => {
        container.appendChild(tag);
      });
      
      this.appendChild(container);
    }
  }
}

/**
 * Individual Skill Tag Component
 */
class SkillTag extends BaseComponent {
  static get observedAttributes() {
    return ['experience', 'level'];
  }
  
  constructor() {
    super();
  }
  
  connectedCallback() {
    super.connectedCallback();
  }
  
  render() {
    const experience = this.getAttribute('experience');
    const level = this.getAttribute('level');
    const skill = this.textContent.trim();
    
    // Add level class
    if (level) {
      this.classList.add(`skill-${level}`);
    }
    
    // Add data attribute for tooltip
    if (experience) {
      this.setAttribute('data-years', experience);
    }
    
    // Wrap content if needed
    if (!this.querySelector('span')) {
      this.innerHTML = `<span class="skill-name">${skill}</span>`;
    }
  }
  
  setupEventListeners() {
    super.setupEventListeners();
    
    this.addEventListener('mouseenter', () => {
      this.emit('skill-hover', { 
        skill: this.textContent.trim(),
        experience: this.getAttribute('experience'),
        level: this.getAttribute('level')
      });
    });
  }
}

// Register all components
customElements.define('professional-summary', ProfessionalSummary);
customElements.define('summary-brief', SummaryBrief);
customElements.define('summary-line', SummaryLine);
customElements.define('summary-detail', SummaryDetail);
customElements.define('technical-skills', TechnicalSkills);
customElements.define('skills-category', SkillsCategory);
customElements.define('skill-tag', SkillTag);