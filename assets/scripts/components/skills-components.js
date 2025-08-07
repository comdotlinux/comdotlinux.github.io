/**
 * Skills Grid Component
 * Displays categorized skills with visual indicators
 */
class SkillsGrid extends BaseComponent {
  connectedCallback() {
    super.connectedCallback();
    this.setupSkillInteractions();
  }
  
  setupSkillInteractions() {
    const skillTags = this.$$('.skill-tag');
    
    skillTags.forEach(tag => {
      // Add hover effects and interactions
      tag.addEventListener('mouseenter', this.handleSkillHover.bind(this));
      tag.addEventListener('mouseleave', this.handleSkillLeave.bind(this));
      tag.addEventListener('click', this.handleSkillClick.bind(this));
    });
  }
  
  handleSkillHover(event) {
    const tag = event.target;
    const years = tag.getAttribute('data-years');
    
    if (years && !this.prefersReducedMotion()) {
      // Add subtle animation
      tag.style.transform = 'translateY(-2px) scale(1.05)';
    }
  }
  
  handleSkillLeave(event) {
    const tag = event.target;
    
    if (!this.prefersReducedMotion()) {
      tag.style.transform = '';
    }
  }
  
  handleSkillClick(event) {
    const tag = event.target;
    const skillName = tag.textContent;
    const years = tag.getAttribute('data-years');
    
    // Could implement skill details modal or analytics tracking
    console.log(`Skill clicked: ${skillName} (${years} years)`);
    
    // Add click feedback without forced reflow
    if (!this.prefersReducedMotion()) {
      tag.style.animation = 'none';
      requestAnimationFrame(() => {
        tag.style.animation = 'pulse 0.3s ease-in-out';
      });
    }
  }
  
  onEnterViewport() {
    super.onEnterViewport();
    
    if (!this.prefersReducedMotion()) {
      this.animateSkillsIn();
    }
  }
  
  animateSkillsIn() {
    const categories = this.$$('.skill-category');
    
    categories.forEach((category, categoryIndex) => {
      const tags = category.querySelectorAll('.skill-tag');
      
      tags.forEach((tag, tagIndex) => {
        const delay = (categoryIndex * 200) + (tagIndex * 50);
        tag.style.animationDelay = `${delay}ms`;
        tag.classList.add('slide-up');
      });
    });
  }
  
  needsIntersectionObserver() {
    return true;
  }
}

/**
 * Resume Header Component
 * Displays personal information and profile
 */
class ResumeHeader extends BaseComponent {
  connectedCallback() {
    super.connectedCallback();
    this.setupProfileImage();
  }
  
  setupProfileImage() {
    const profileImage = this.$('.profile-image');
    
    if (profileImage) {
      // Add loading state
      profileImage.addEventListener('load', () => {
        profileImage.classList.add('loaded');
      });
      
      // Add error handling
      profileImage.addEventListener('error', () => {
        console.warn('Profile image failed to load');
        profileImage.style.display = 'none';
      });
      
      // Add click interaction for accessibility
      profileImage.addEventListener('click', () => {
        // Could implement image zoom or modal
        console.log('Profile image clicked');
      });
    }
  }
  
  onEnterViewport() {
    super.onEnterViewport();
    
    if (!this.prefersReducedMotion()) {
      this.animateHeaderContent();
    }
  }
  
  animateHeaderContent() {
    const profileImage = this.$('.profile-image');
    const profileText = this.$('.profile-text');
    
    if (profileImage) {
      profileImage.style.animationDelay = '0ms';
      profileImage.classList.add('fade-in');
    }
    
    if (profileText) {
      const textElements = profileText.querySelectorAll('h1, p');
      textElements.forEach((element, index) => {
        element.style.animationDelay = `${(index + 1) * 200}ms`;
        element.classList.add('slide-up');
      });
    }
  }
  
  needsIntersectionObserver() {
    return true;
  }
}

// Register components
customElements.define('skills-grid', SkillsGrid);
customElements.define('resume-header', ResumeHeader);