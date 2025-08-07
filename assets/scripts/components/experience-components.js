/**
 * Experience Section Component
 * Manages the professional experience display
 */
class ExperienceSection extends BaseComponent {
  connectedCallback() {
    super.connectedCallback();
    // Delay setup to ensure all child components are initialized
    requestAnimationFrame(() => {
      this.setupExperienceCards();
    });
  }
  
  setupExperienceCards() {
    const experienceCards = this.$$('experience-card');
    
    experienceCards.forEach((card, index) => {
      // Set up individual card interactions if method exists
      if (card.setupInteractions) {
        card.setupInteractions();
      }
      
      // Stagger animations
      card.style.setProperty('--animation-delay', `${index * 150}ms`);
    });
  }
  
  onEnterViewport() {
    super.onEnterViewport();
    
    if (!this.prefersReducedMotion()) {
      this.animateExperienceCards();
    }
  }
  
  animateExperienceCards() {
    const cards = this.$$('experience-card');
    
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('animate-in');
      }, index * 150);
    });
  }
  
  needsIntersectionObserver() {
    return true;
  }
}

/**
 * Experience Card Component
 * Individual job experience entry
 */
class ExperienceCard extends BaseComponent {
  constructor() {
    super();
    this.isExpanded = false;
    this.details = null;
  }
  
  connectedCallback() {
    super.connectedCallback();
  }
  
  setupInteractions() {
    // Set up mobile touch handling for details overlay
    this.addEventListener('click', this.handleClick.bind(this));
    this.addEventListener('touchstart', this.handleTouch.bind(this));
    
    // Close overlay when clicking outside on mobile
    document.addEventListener('click', this.handleOutsideClick.bind(this));
    document.addEventListener('touchstart', this.handleOutsideTouch.bind(this));
  }
  
  handleClick(event) {
    // Toggle details on click for mobile
    if (this.isMobile()) {
      event.stopPropagation();
      this.toggleDetails();
    }
  }
  
  handleTouch(event) {
    // Handle touch events for mobile
    if (this.isMobile()) {
      event.stopPropagation();
      this.toggleDetails();
    }
  }
  
  handleOutsideClick(event) {
    if (!this.contains(event.target) && this.isExpanded) {
      this.hideDetails();
    }
  }
  
  handleOutsideTouch(event) {
    if (!this.contains(event.target) && this.isExpanded) {
      this.hideDetails();
    }
  }
  
  toggleDetails() {
    this.isExpanded = !this.isExpanded;
    if (this.isExpanded) {
      this.showDetails();
    } else {
      this.hideDetails();
    }
  }
  
  showDetails() {
    this.classList.add('details-active');
    this.isExpanded = true;
  }
  
  hideDetails() {
    this.classList.remove('details-active');
    this.isExpanded = false;
  }
  
  isMobile() {
    return window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window;
  }
  
  expandForPrint() {
    this.showDetails();
    this.wasClosedForPrint = !this.isExpanded;
  }
  
  restoreFromPrint() {
    if (this.wasClosedForPrint) {
      this.hideDetails();
      this.wasClosedForPrint = false;
    }
  }
  
  needsIntersectionObserver() {
    return true;
  }
  
  onEnterViewport() {
    super.onEnterViewport();
    
    if (!this.prefersReducedMotion()) {
      this.addClassDelayed('slide-up', 100);
    }
  }
}

/**
 * Projects Showcase Component
 * Displays projects and presentations
 */
class ProjectsShowcase extends BaseComponent {
  connectedCallback() {
    super.connectedCallback();
    this.setupProjectCards();
  }
  
  setupProjectCards() {
    const projectCards = this.$$('.project-card');
    
    projectCards.forEach(card => {
      // Add hover effects
      card.addEventListener('mouseenter', this.handleProjectHover.bind(this));
      card.addEventListener('mouseleave', this.handleProjectLeave.bind(this));
      
      // Track clicks for analytics
      const links = card.querySelectorAll('.project-link');
      links.forEach(link => {
        link.addEventListener('click', this.handleProjectLinkClick.bind(this));
      });
    });
  }
  
  handleProjectHover(event) {
    const card = event.currentTarget;
    
    if (!this.prefersReducedMotion()) {
      card.style.transform = 'translateY(-4px) scale(1.02)';
      card.style.boxShadow = 'var(--shadow-xl)';
    }
  }
  
  handleProjectLeave(event) {
    const card = event.currentTarget;
    
    if (!this.prefersReducedMotion()) {
      card.style.transform = '';
      card.style.boxShadow = '';
    }
  }
  
  handleProjectLinkClick(event) {
    const link = event.target;
    const projectCard = link.closest('.project-card');
    const projectName = projectCard?.querySelector('.project-name')?.textContent || 'Unknown';
    const linkText = link.textContent;
    
    console.log(`Project link clicked: ${projectName} - ${linkText}`);
    
    // Add click feedback
    if (!this.prefersReducedMotion()) {
      link.style.animation = 'pulse 0.2s ease-in-out';
    }
  }
  
  onEnterViewport() {
    super.onEnterViewport();
    
    if (!this.prefersReducedMotion()) {
      this.animateProjectsIn();
    }
  }
  
  animateProjectsIn() {
    const categories = this.$$('.project-category');
    
    categories.forEach((category, categoryIndex) => {
      const cards = category.querySelectorAll('.project-card');
      
      cards.forEach((card, cardIndex) => {
        const delay = (categoryIndex * 300) + (cardIndex * 150);
        card.style.animationDelay = `${delay}ms`;
        card.classList.add('slide-up');
      });
    });
  }
  
  needsIntersectionObserver() {
    return true;
  }
}

/**
 * Education Section Component
 * Displays education information
 */
class EducationSection extends BaseComponent {
  connectedCallback() {
    super.connectedCallback();
    this.setupEducationItems();
  }
  
  setupEducationItems() {
    const educationItems = this.$$('.education-item');
    
    educationItems.forEach(item => {
      item.addEventListener('mouseenter', this.handleEducationHover.bind(this));
      item.addEventListener('mouseleave', this.handleEducationLeave.bind(this));
    });
  }
  
  handleEducationHover(event) {
    const item = event.currentTarget;
    
    if (!this.prefersReducedMotion()) {
      item.style.transform = 'translateY(-2px)';
      item.style.boxShadow = 'var(--shadow-lg)';
    }
  }
  
  handleEducationLeave(event) {
    const item = event.currentTarget;
    
    if (!this.prefersReducedMotion()) {
      item.style.transform = '';
      item.style.boxShadow = '';
    }
  }
  
  onEnterViewport() {
    super.onEnterViewport();
    
    if (!this.prefersReducedMotion()) {
      this.animateEducationIn();
    }
  }
  
  animateEducationIn() {
    const items = this.$$('.education-item');
    
    items.forEach((item, index) => {
      item.style.animationDelay = `${index * 200}ms`;
      item.classList.add('slide-up');
    });
  }
  
  needsIntersectionObserver() {
    return true;
  }
}

// Register components
customElements.define('experience-section', ExperienceSection);
customElements.define('experience-card', ExperienceCard);
customElements.define('projects-showcase', ProjectsShowcase);
customElements.define('education-section', EducationSection);