/**
 * Resume App Component
 * Main application container that manages global app state
 */
class ResumeApp extends BaseComponent {
  constructor() {
    super();
    this.isLoading = true;
    this.components = new Map();
    this.navigationLinks = [];
  }
  
  connectedCallback() {
    super.connectedCallback();
    this.initializeApp();
  }
  
  async initializeApp() {
    // Set up global error handling
    this.setupErrorHandling();
    
    // Initialize navigation
    this.setupNavigation();
    
    // Set up smooth scrolling
    this.setupSmoothScrolling();
    
    // Set up PDF export
    this.setupPDFExport();
    
    // Mark as loaded
    this.isLoading = false;
    this.classList.add('loaded');
    
    // Emit app ready event
    this.emit('app-ready');
  }
  
  setupErrorHandling() {
    window.addEventListener('error', (event) => {
      console.error('Global error:', event.error);
      this.handleError(event.error);
    });
    
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      this.handleError(event.reason);
    });
  }
  
  setupNavigation() {
    // Get all navigation links
    this.navigationLinks = this.$$('nav-header .nav-link:not(.external)');
    
    // Set up click handlers for internal navigation
    this.navigationLinks.forEach(link => {
      link.addEventListener('click', this.handleNavClick.bind(this));
    });
    
    // Set up active section tracking
    this.setupActiveNavigation();
  }
  
  setupActiveNavigation() {
    // Track which section is currently in view
    const sections = this.$$('section[id]');
    const navLinks = this.$$('nav-header .nav-link:not(.external)');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Remove active class from all nav links
          navLinks.forEach(link => link.classList.remove('active'));
          
          // Add active class to corresponding nav link
          const activeLink = navLinks.find(link => 
            link.getAttribute('href') === `#${entry.target.id}`
          );
          if (activeLink) {
            activeLink.classList.add('active');
          }
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '-100px 0px'
    });
    
    sections.forEach(section => observer.observe(section));
    this.observers.set('navigation', observer);
  }
  
  handleNavClick(event) {
    event.preventDefault();
    const href = event.currentTarget.getAttribute('href');
    
    if (href && href.startsWith('#')) {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        this.scrollToElement(targetElement);
      }
    }
  }
  
  setupSmoothScrolling() {
    // Enhanced smooth scrolling for better UX
    document.addEventListener('click', (event) => {
      const link = event.target.closest('a[href^="#"]');
      if (link && !link.classList.contains('nav-link')) {
        event.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          this.scrollToElement(targetElement);
        }
      }
    });
  }
  
  scrollToElement(element) {
    const navHeight = 80; // Approximate nav height
    const elementTop = element.offsetTop - navHeight;
    
    if (this.prefersReducedMotion()) {
      window.scrollTo(0, elementTop);
    } else {
      window.scrollTo({
        top: elementTop,
        behavior: 'smooth'
      });
    }
  }
  
  setupPDFExport() {
    const pdfButton = document.getElementById('download-pdf');
    if (pdfButton) {
      pdfButton.addEventListener('click', this.handlePDFExport.bind(this));
    }
  }
  
  async handlePDFExport() {
    try {
      console.log('Starting PDF export...');
      
      // Expand all collapsible sections for PDF
      this.expandAllSections();
      
      // Add print class to body for PDF-specific styling
      document.body.classList.add('printing');
      
      // Wait a moment for animations to complete
      await this.wait(500);
      
      // Use browser's print functionality
      window.print();
      
      // Restore collapsed state after a delay
      setTimeout(() => {
        this.restoreCollapsedSections();
        document.body.classList.remove('printing');
      }, 1000);
      
    } catch (error) {
      console.error('PDF export failed:', error);
      this.handleError(error);
      document.body.classList.remove('printing');
    }
  }
  
  expandAllSections() {
    // Show all experience details for PDF
    const experienceDetails = this.$$('.experience-details');
    experienceDetails.forEach(detail => {
      detail.style.opacity = '1';
      detail.style.visibility = 'visible';
      detail.style.position = 'static';
      detail.style.transform = 'none';
      detail.style.marginTop = 'var(--space-sm)';
      detail.style.width = 'auto';
      detail.style.maxWidth = 'none';
    });
  }
  
  restoreCollapsedSections() {
    // Restore hover-only behavior for experience details
    const experienceDetails = this.$$('.experience-details');
    experienceDetails.forEach(detail => {
      detail.style.opacity = '';
      detail.style.visibility = '';
      detail.style.position = '';
      detail.style.transform = '';
      detail.style.marginTop = '';
      detail.style.width = '';
      detail.style.maxWidth = '';
    });
  }
  
  handleError(error) {
    // Simple error handling - could be enhanced
    const errorMessage = error.message || 'An unexpected error occurred';
    console.error('Application error:', errorMessage);
    
    // Could show a user-friendly error notification here
    // For now, just log to console
  }
  
  onScroll() {
    // Add/remove scrolled class for styling
    const scrolled = window.scrollY > 100;
    document.body.classList.toggle('scrolled', scrolled);
    
    // Update navigation scroll state
    const navContainer = document.querySelector('.nav-container');
    const navHeader = document.querySelector('nav-header');
    
    if (navContainer) {
      navContainer.classList.toggle('scrolled', scrolled);
    }
    
    if (navHeader) {
      navHeader.classList.toggle('scrolled', scrolled);
    }
  }
  
  needsScroll() {
    return true;
  }
  
  needsIntersectionObserver() {
    return false; // We set up our own observers
  }
}

// Navigation Header Component
class NavHeader extends BaseComponent {
  connectedCallback() {
    super.connectedCallback();
    this.setupMobileMenu();
  }
  
  setupMobileMenu() {
    // For future mobile menu implementation
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    this.handleMobileMenu(mediaQuery);
    mediaQuery.addEventListener('change', this.handleMobileMenu.bind(this));
  }
  
  handleMobileMenu(mediaQuery) {
    // Mobile menu logic would go here
    // For now, the current design works on mobile
  }
  
  needsIntersectionObserver() {
    return false;
  }
}

// Contact Bar Component
class ContactBar extends BaseComponent {
  connectedCallback() {
    super.connectedCallback();
    this.setupContactLinks();
  }
  
  setupContactLinks() {
    const contactLinks = this.$$('.contact-link');
    contactLinks.forEach(link => {
      // Add click tracking for analytics (if needed)
      link.addEventListener('click', (event) => {
        const linkText = link.querySelector('.contact-text')?.textContent || 'Unknown';
        console.log(`Contact link clicked: ${linkText}`);
      });
    });
  }
  
  needsIntersectionObserver() {
    return true;
  }
  
  onEnterViewport() {
    super.onEnterViewport();
    // Animate contact links in sequence
    if (!this.prefersReducedMotion()) {
      this.animateContactLinks();
    }
  }
  
  animateContactLinks() {
    const links = this.$$('.contact-link');
    links.forEach((link, index) => {
      link.style.animationDelay = `${index * 100}ms`;
      link.classList.add('slide-up');
    });
  }
}

// Register all components
customElements.define('resume-app', ResumeApp);
customElements.define('nav-header', NavHeader);
customElements.define('contact-bar', ContactBar);