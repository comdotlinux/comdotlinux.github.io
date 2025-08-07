/**
 * Site Header Component
 * Manages the sticky header with profile animation and navigation
 */
class SiteHeader extends BaseComponent {
  static get observedAttributes() {
    return ['sticky', 'blur'];
  }
  
  constructor() {
    super();
    this.isProfileVisible = false;
    this.scrollThreshold = 200;
    this.mainProfile = null;
    this.profileObserver = null;
  }
  
  connectedCallback() {
    super.connectedCallback();
    // Delay profile observer setup to ensure DOM is ready
    setTimeout(() => {
      this.setupProfileObserver();
    }, 100);
    
    // Also try after a longer delay in case components are still loading
    setTimeout(() => {
      if (!this.profileObserver) {
        this.setupProfileObserver();
      }
    }, 1000);
  }
  
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.profileObserver) {
      this.profileObserver.disconnect();
    }
  }
  
  render() {
    // Add necessary classes and structure
    if (this.getAttribute('sticky') === 'true') {
      this.classList.add('sticky-header');
    }
    
    if (this.getAttribute('blur') === 'true') {
      this.classList.add('blur-background');
    }
    
    // Create nav container if it doesn't exist
    if (!this.querySelector('.nav-container')) {
      const navContainer = this.createElement('div', { className: 'nav-container' });
      
      // Move all children to nav container
      while (this.firstChild) {
        navContainer.appendChild(this.firstChild);
      }
      
      this.appendChild(navContainer);
    }
  }
  
  setupEventListeners() {
    super.setupEventListeners();
    
    // Listen for scroll events to show/hide profile
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  }
  
  removeEventListeners() {
    super.removeEventListeners();
    window.removeEventListener('scroll', this.handleScroll);
  }
  
  setupProfileObserver() {
    // Find the main profile section - try multiple selectors
    this.mainProfile = document.querySelector('profile-section') ||
                      document.querySelector('profile-card[main="true"]') ||
                      document.querySelector('[main="true"]');
    
    console.log('Setting up profile observer for:', this.mainProfile);
    
    if (this.mainProfile) {
      this.profileObserver = new IntersectionObserver(
        (entries) => this.handleProfileVisibility(entries),
        {
          threshold: 0.3,
          rootMargin: '0px 0px -100px 0px'
        }
      );
      
      this.profileObserver.observe(this.mainProfile);
      console.log('Profile observer set up successfully');
    } else {
      console.warn('Main profile element not found for observer');
      // Retry after a short delay in case components are still loading
      setTimeout(() => {
        if (!this.profileObserver) {
          this.setupProfileObserver();
        }
      }, 1000);
    }
  }
  
  handleProfileVisibility(entries) {
    entries.forEach(entry => {
      const isMainProfileVisible = entry.isIntersecting;
      
      console.log('Profile visibility changed:', {
        target: entry.target,
        isIntersecting: isMainProfileVisible,
        intersectionRatio: entry.intersectionRatio,
        boundingRect: entry.boundingClientRect
      });
      
      // Show header profile when main profile is NOT visible
      const shouldShowHeaderProfile = !isMainProfileVisible;
      
      if (shouldShowHeaderProfile !== this.isProfileVisible) {
        console.log('Profile state changing from', this.isProfileVisible, 'to', shouldShowHeaderProfile);
        this.isProfileVisible = shouldShowHeaderProfile;
        this.updateProfileState();
      }
    });
  }
  
  updateProfileState() {
    const compactProfile = this.querySelector('profile-card[compact="true"]');
    const socialContacts = this.querySelector('social-contacts[position="dynamic"]');
    
    console.log('Profile state change:', this.isProfileVisible, compactProfile, socialContacts);
    
    if (this.isProfileVisible) {
      // Show header profile and adjust social links positioning
      this.classList.add('profile-visible');
      
      // Animate profile slide-in from left with fade
      if (compactProfile) {
        compactProfile.style.display = 'flex';
        compactProfile.style.opacity = '1';
        compactProfile.style.transform = 'translateX(0)';
        compactProfile.style.transition = 'all 300ms ease';
      }
      
      // Shift social contacts right to make room for profile
      if (socialContacts) {
        socialContacts.style.transform = 'translateX(200px)';
        socialContacts.style.transition = 'transform 300ms ease';
      }
    } else {
      // Hide header profile and restore social links
      this.classList.remove('profile-visible');
      
      // Animate profile slide-out to left with fade
      if (compactProfile) {
        compactProfile.style.opacity = '0';
        compactProfile.style.transform = 'translateX(-20px)';
        compactProfile.style.transition = 'all 300ms ease';
        
        // Hide after animation completes
        setTimeout(() => {
          if (!this.isProfileVisible && compactProfile.style.opacity === '0') {
            compactProfile.style.display = 'none';
          }
        }, 300);
      }
      
      // Restore social contacts to original position
      if (socialContacts) {
        socialContacts.style.transform = 'translateX(0)';
        socialContacts.style.transition = 'transform 300ms ease';
      }
    }
    
    // Emit event for other components
    this.emit('profile-visibility-changed', { 
      visible: this.isProfileVisible 
    });
  }
  
  onScroll() {
    // Add scroll-based styling
    const scrolled = window.scrollY > this.scrollThreshold;
    this.toggleClass('scrolled', scrolled);
  }
  
  needsScroll() {
    return true;
  }
  
  needsIntersectionObserver() {
    return false; // We use custom observer for profile
  }
}

// Register the component
customElements.define('site-header', SiteHeader);