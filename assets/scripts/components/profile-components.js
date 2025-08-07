/**
 * Profile Components
 * Handles profile section and profile cards with dual instance support
 */

/**
 * Profile Section Component
 */
class ProfileSection extends BaseComponent {
  constructor() {
    super();
  }
  
  connectedCallback() {
    super.connectedCallback();
  }
  
  render() {
    // Add section styling
    this.classList.add('section-header');
    
    // Ensure proper structure
    if (!this.querySelector('profile-card[main="true"]')) {
      console.warn('ProfileSection should contain a main profile-card');
    }
  }
}

/**
 * Profile Card Component - Dual instance support (main + compact)
 */
class ProfileCard extends BaseComponent {
  static get observedAttributes() {
    return ['name', 'title', 'location', 'tagline', 'photo', 'main', 'compact', 'hidden-initial'];
  }
  
  constructor() {
    super();
    this.isRendered = false;
  }
  
  connectedCallback() {
    super.connectedCallback();
  }
  
  render() {
    if (this.isRendered) return;
    
    const isMain = this.getAttribute('main') === 'true';
    const isCompact = this.getAttribute('compact') === 'true';
    
    if (isMain) {
      this.renderMainProfile();
    } else if (isCompact) {
      this.renderCompactProfile();
    }
    
    this.isRendered = true;
  }
  
  renderMainProfile() {
    const name = this.getAttribute('name');
    const title = this.getAttribute('title');
    const location = this.getAttribute('location');
    const tagline = this.getAttribute('tagline');
    const photo = this.getAttribute('photo');
    
    this.innerHTML = `
      <div class="header-content">
        <div class="profile-info">
          <img src="${photo}" alt="${name}" class="profile-image" width="120" height="120">
          <div class="profile-text">
            <h1 class="name">${name}</h1>
            <p class="title">${title}</p>
            <p class="location">${location}</p>
            <p class="tagline">${tagline}</p>
          </div>
        </div>
      </div>
    `;
  }
  
  renderCompactProfile() {
    const name = this.getAttribute('name');
    const title = this.getAttribute('title');
    const photo = this.getAttribute('photo');
    const hiddenInitial = this.getAttribute('hidden-initial') === 'true';
    
    // Create compact profile for header
    this.innerHTML = `
      <div class="nav-profile">
        <img src="${photo}" alt="${name}" class="nav-profile-image" loading="lazy">
        <div class="nav-profile-info">
          <span class="nav-profile-name">${name}</span>
          <span class="nav-profile-title">${title}</span>
        </div>
      </div>
    `;
    
    // Initially hide if specified
    if (hiddenInitial) {
      this.style.display = 'none';
      this.style.opacity = '0';
      this.style.transform = 'translateX(-20px)';
      this.style.transition = 'all 300ms ease';
    }
    
    // Add compact profile class for styling
    this.classList.add('compact-profile');
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback(name, oldValue, newValue);
    
    if (this.isRendered && oldValue !== newValue) {
      // Re-render if important attributes change
      if (['name', 'title', 'photo'].includes(name)) {
        this.isRendered = false;
        this.render();
      }
    }
  }
}

/**
 * Social Contacts Component - Dynamic positioning
 */
class SocialContacts extends BaseComponent {
  static get observedAttributes() {
    return ['position'];
  }
  
  constructor() {
    super();
    this.contactLinks = [];
  }
  
  connectedCallback() {
    super.connectedCallback();
    this.collectContactLinks();
  }
  
  render() {
    const position = this.getAttribute('position');
    
    if (position === 'main') {
      this.classList.add('main-contacts');
    } else if (position === 'dynamic') {
      this.classList.add('header-contacts');
    }
    
    // Wrap contact links in appropriate container
    if (!this.querySelector('.contact-links')) {
      const container = this.createElement('div', { className: 'contact-links' });
      
      // Move all contact-link children to container
      const contactLinks = this.querySelectorAll('contact-link');
      contactLinks.forEach(link => {
        container.appendChild(link);
      });
      
      this.appendChild(container);
    }
  }
  
  collectContactLinks() {
    this.contactLinks = Array.from(this.querySelectorAll('contact-link'));
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback(name, oldValue, newValue);
    
    if (name === 'position' && oldValue !== newValue) {
      this.render();
    }
  }
}

/**
 * Contact Link Component
 */
class ContactLink extends BaseComponent {
  static get observedAttributes() {
    return ['icon', 'href', 'type'];
  }
  
  constructor() {
    super();
  }
  
  connectedCallback() {
    super.connectedCallback();
  }
  
  render() {
    const icon = this.getAttribute('icon');
    const href = this.getAttribute('href');
    const type = this.getAttribute('type');
    const label = this.textContent.trim();
    
    // Icon mapping
    const iconMap = {
      email: '📧',
      github: '🐙',
      linkedin: '💼',
      mastodon: '🐘',
      stackoverflow: '💬'
    };
    
    const iconSymbol = iconMap[icon] || '🔗';
    const isExternal = href && href.startsWith('http');
    
    this.innerHTML = `
      <a href="${href}" class="contact-link" 
         ${isExternal ? 'target="_blank" rel="noopener"' : ''}
         aria-label="${label}">
        <span class="contact-icon">${iconSymbol}</span>
        <span class="contact-text">${label}</span>
      </a>
    `;
  }
  
  setupEventListeners() {
    super.setupEventListeners();
    
    const link = this.querySelector('a');
    if (link) {
      link.addEventListener('click', (e) => {
        this.emit('contact-click', { 
          type: this.getAttribute('type'), 
          href: this.getAttribute('href') 
        });
      });
    }
  }
}

// Register components
customElements.define('profile-section', ProfileSection);
customElements.define('profile-card', ProfileCard);
customElements.define('social-contacts', SocialContacts);
customElements.define('contact-link', ContactLink);