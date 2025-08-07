/**
 * Projects and Presentations Components
 * Handles project showcase, presentations, and hobbies sections
 */

/**
 * Projects Section Component
 */
class ProjectsSection extends BaseComponent {
  static get observedAttributes() {
    return ['id'];
  }
  
  connectedCallback() {
    super.connectedCallback();
  }
  
  render() {
    this.classList.add('projects-container');
  }
}

/**
 * Project Showcase Component
 */
class ProjectShowcase extends BaseComponent {
  connectedCallback() {
    super.connectedCallback();
  }
  
  render() {
    this.classList.add('project-showcase');
  }
}

/**
 * Individual Project Card Component
 */
class ProjectCard extends BaseComponent {
  static get observedAttributes() {
    return ['title', 'type', 'github', 'demo'];
  }
  
  constructor() {
    super();
  }
  
  connectedCallback() {
    super.connectedCallback();
  }
  
  render() {
    const type = this.getAttribute('type');
    
    this.classList.add('project-card');
    
    if (type) {
      this.classList.add(`project-${type}`);
    }
  }
  
  setupEventListeners() {
    super.setupEventListeners();
    
    const github = this.getAttribute('github');
    const demo = this.getAttribute('demo');
    
    if (github || demo) {
      this.addEventListener('click', (e) => {
        if (!e.target.closest('a')) {
          if (demo) {
            window.open(demo, '_blank', 'noopener,noreferrer');
          } else if (github) {
            window.open(github, '_blank', 'noopener,noreferrer');
          }
        }
      });
    }
  }
}

// Register components
customElements.define('projects-section', ProjectsSection);
customElements.define('project-showcase', ProjectShowcase);
customElements.define('project-card', ProjectCard);