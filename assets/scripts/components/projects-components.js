/**
 * Projects and Hobbies Components
 * Handles project showcases, presentations, and hobby sections
 */

/**
 * Projects Section Component
 */
class ProjectsSection extends BaseComponent {
  constructor() {
    super();
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
  constructor() {
    super();
  }
  
  connectedCallback() {
    super.connectedCallback();
  }
  
  render() {
    this.classList.add('project-showcase-grid');
    
    // Wrap project categories in grid structure
    this.setupProjectGrid();
  }
  
  setupProjectGrid() {
    const categories = this.querySelectorAll('.project-category');
    if (categories.length > 0) {
      this.classList.add('has-categories');
    }
  }
}

/**
 * Project Card Component
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
    const github = this.getAttribute('github');
    const demo = this.getAttribute('demo');
    
    if (type) {
      this.classList.add(`project-${type}`);
    }
    
    // Add project links if GitHub or demo URLs provided
    this.setupProjectLinks(github, demo);
  }
  
  setupProjectLinks(github, demo) {
    if (!this.querySelector('.project-links')) {
      const linksContainer = this.createElement('div', { className: 'project-links' });
      
      if (github) {
        const githubLink = this.createElement('a', {
          href: github,
          className: 'project-link',
          target: '_blank',
          rel: 'noopener noreferrer'
        }, 'GitHub');
        linksContainer.appendChild(githubLink);
      }
      
      if (demo) {
        const demoLink = this.createElement('a', {
          href: demo,
          className: 'project-link project-demo',
          target: '_blank',
          rel: 'noopener noreferrer'
        }, 'Demo');
        linksContainer.appendChild(demoLink);
      }
      
      if (github || demo) {
        this.appendChild(linksContainer);
      }
    }
  }
  
  setupEventListeners() {
    super.setupEventListeners();
    
    // Track project interactions
    this.addEventListener('click', (e) => {
      if (e.target.classList.contains('project-link')) {
        this.emit('project-link-click', {
          title: this.getAttribute('title'),
          type: this.getAttribute('type'),
          url: e.target.href
        });
      }
    });
  }
}

/**
 * Project Description Component
 */
class ProjectDescription extends BaseComponent {
  connectedCallback() {
    super.connectedCallback();
  }
  
  render() {
    this.classList.add('project-description');
  }
}

/**
 * Project Tech Stack Component
 */
class ProjectTech extends BaseComponent {
  connectedCallback() {
    super.connectedCallback();
  }
  
  render() {
    this.classList.add('project-tech-stack');
    
    // Wrap tech tags if not already wrapped
    if (!this.querySelector('.tech-tags')) {
      const container = this.createElement('div', { className: 'tech-tags' });
      
      const techTags = this.querySelectorAll('tech-tag');
      techTags.forEach(tag => {
        container.appendChild(tag);
      });
      
      if (techTags.length > 0) {
        this.appendChild(container);
      }
    }
  }
}

/**
 * Tech Tag Component
 */
class TechTag extends BaseComponent {
  connectedCallback() {
    super.connectedCallback();
  }
  
  render() {
    this.classList.add('tech-tag');
  }
}

/**
 * Presentation Card Component
 */
class PresentationCard extends BaseComponent {
  static get observedAttributes() {
    return ['title', 'event', 'date', 'slides', 'source'];
  }
  
  constructor() {
    super();
  }
  
  connectedCallback() {
    super.connectedCallback();
  }
  
  render() {
    const slides = this.getAttribute('slides');
    const source = this.getAttribute('source');
    
    this.classList.add('presentation-card');
    
    // Add presentation links
    this.setupPresentationLinks(slides, source);
  }
  
  setupPresentationLinks(slides, source) {
    if (!this.querySelector('.presentation-links')) {
      const linksContainer = this.createElement('div', { className: 'presentation-links' });
      
      if (slides && slides !== '#') {
        const slidesLink = this.createElement('a', {
          href: slides,
          className: 'presentation-link',
          target: '_blank',
          rel: 'noopener noreferrer'
        }, 'View Slides');
        linksContainer.appendChild(slidesLink);
      }
      
      if (source && source !== '#') {
        const sourceLink = this.createElement('a', {
          href: source,
          className: 'presentation-link presentation-source',
          target: '_blank',
          rel: 'noopener noreferrer'
        }, 'Source Code');
        linksContainer.appendChild(sourceLink);
      }
      
      if ((slides && slides !== '#') || (source && source !== '#')) {
        this.appendChild(linksContainer);
      }
    }
  }
}

/**
 * Presentation Description Component
 */
class PresentationDescription extends BaseComponent {
  connectedCallback() {
    super.connectedCallback();
  }
  
  render() {
    this.classList.add('presentation-description');
  }
}

/**
 * Hobbies Section Component
 */
class HobbiesSection extends BaseComponent {
  constructor() {
    super();
  }
  
  connectedCallback() {
    super.connectedCallback();
  }
  
  render() {
    this.classList.add('hobbies-container');
  }
}

/**
 * Hobby Card Component
 */
class HobbyCard extends BaseComponent {
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
    
    this.classList.add('hobby-card');
    
    if (title && !this.querySelector('.hobby-title')) {
      const titleElement = this.createElement('h3', { 
        className: 'hobby-title' 
      }, title);
      
      this.insertBefore(titleElement, this.firstChild);
    }
  }
}

/**
 * Lab Infrastructure Component
 */
class LabInfrastructure extends BaseComponent {
  connectedCallback() {
    super.connectedCallback();
  }
  
  render() {
    this.classList.add('lab-infrastructure');
    
    if (!this.querySelector('.infrastructure-title')) {
      const title = this.createElement('h4', { 
        className: 'infrastructure-title' 
      }, 'Infrastructure');
      
      this.insertBefore(title, this.firstChild);
    }
  }
}

/**
 * Infrastructure Item Component
 */
class InfrastructureItem extends BaseComponent {
  static get observedAttributes() {
    return ['type', 'link'];
  }
  
  constructor() {
    super();
  }
  
  connectedCallback() {
    super.connectedCallback();
  }
  
  render() {
    const type = this.getAttribute('type');
    const link = this.getAttribute('link');
    
    if (type) {
      this.classList.add(`infrastructure-${type}`);
    }
    
    this.classList.add('infrastructure-item');
    
    if (link) {
      this.style.cursor = 'pointer';
      this.setAttribute('title', 'Learn more');
    }
  }
  
  setupEventListeners() {
    super.setupEventListeners();
    
    const link = this.getAttribute('link');
    if (link) {
      this.addEventListener('click', () => {
        window.open(link, '_blank', 'noopener,noreferrer');
      });
    }
  }
}

/**
 * Lab Services Component
 */
class LabServices extends BaseComponent {
  connectedCallback() {
    super.connectedCallback();
  }
  
  render() {
    this.classList.add('lab-services');
  }
}

/**
 * Service Category Component
 */
class ServiceCategory extends BaseComponent {
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
    
    this.classList.add('service-category');
    
    if (title && !this.querySelector('.service-category-title')) {
      const titleElement = this.createElement('h5', { 
        className: 'service-category-title' 
      }, title);
      
      this.insertBefore(titleElement, this.firstChild);
    }
  }
}

/**
 * Service Item Component
 */
class ServiceItem extends BaseComponent {
  static get observedAttributes() {
    return ['link'];
  }
  
  constructor() {
    super();
  }
  
  connectedCallback() {
    super.connectedCallback();
  }
  
  render() {
    const link = this.getAttribute('link');
    
    this.classList.add('service-item');
    
    if (link) {
      this.style.cursor = 'pointer';
      this.setAttribute('title', 'Visit website');
    }
  }
  
  setupEventListeners() {
    super.setupEventListeners();
    
    const link = this.getAttribute('link');
    if (link) {
      this.addEventListener('click', () => {
        window.open(link, '_blank', 'noopener,noreferrer');
      });
    }
  }
}

// Register all components
customElements.define('projects-section', ProjectsSection);
customElements.define('project-showcase', ProjectShowcase);
customElements.define('project-card', ProjectCard);
customElements.define('project-description', ProjectDescription);
customElements.define('project-tech', ProjectTech);
customElements.define('tech-tag', TechTag);
customElements.define('presentation-card', PresentationCard);
customElements.define('presentation-description', PresentationDescription);
customElements.define('hobbies-section', HobbiesSection);
customElements.define('hobby-card', HobbyCard);
customElements.define('lab-infrastructure', LabInfrastructure);
customElements.define('infrastructure-item', InfrastructureItem);
customElements.define('lab-services', LabServices);
customElements.define('service-category', ServiceCategory);
customElements.define('service-item', ServiceItem);