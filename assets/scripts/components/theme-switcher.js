/**
 * Theme Switcher Component
 * Handles light/dark theme toggling with persistence
 */
class ThemeSwitcher extends BaseComponent {
  constructor() {
    super();
    this.currentTheme = this.getCurrentTheme();
    this.button = null;
  }
  
  static get observedAttributes() {
    return ['aria-label'];
  }
  
  connectedCallback() {
    super.connectedCallback();
    this.updateButtonIcon();
  }
  
  render() {
    this.innerHTML = `
      <button class="theme-toggle" 
              type="button" 
              aria-label="${this.getAttribute('aria-label') || 'Toggle theme'}"
              title="Toggle between light and dark theme">
        <span class="theme-icon" aria-hidden="true"></span>
      </button>
    `;
    
    this.button = this.$('.theme-toggle');
    this.icon = this.$('.theme-icon');
  }
  
  setupEventListeners() {
    super.setupEventListeners();
    
    if (this.button) {
      this.button.addEventListener('click', this.handleToggle.bind(this));
    }
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', this.handleSystemThemeChange.bind(this));
    
    // Listen for theme changes from other sources
    document.addEventListener('themechange', this.handleThemeChange.bind(this));
  }
  
  removeEventListeners() {
    super.removeEventListeners();
    
    if (this.button) {
      this.button.removeEventListener('click', this.handleToggle.bind(this));
    }
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.removeEventListener('change', this.handleSystemThemeChange.bind(this));
    
    document.removeEventListener('themechange', this.handleThemeChange.bind(this));
  }
  
  handleToggle() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
    
    // Add click animation
    if (!this.prefersReducedMotion()) {
      this.animateToggle();
    }
  }
  
  handleSystemThemeChange(event) {
    // Only update if user hasn't manually set a theme
    const savedTheme = localStorage.getItem('theme');
    if (!savedTheme) {
      const systemTheme = event.matches ? 'dark' : 'light';
      this.setTheme(systemTheme, false); // Don't save to localStorage
    }
  }
  
  handleThemeChange(event) {
    if (event.detail && event.detail.theme !== this.currentTheme) {
      this.currentTheme = event.detail.theme;
      this.updateButtonIcon();
    }
  }
  
  setTheme(theme, persist = true) {
    if (theme === this.currentTheme) return;
    
    this.currentTheme = theme;
    
    // Update document
    document.documentElement.setAttribute('data-theme', theme);
    
    // Persist to localStorage
    if (persist) {
      localStorage.setItem('theme', theme);
    }
    
    // Update button
    this.updateButtonIcon();
    
    // Emit theme change event
    this.emit('themechange', { theme });
    
    // Emit global theme change event
    document.dispatchEvent(new CustomEvent('themechange', {
      detail: { theme }
    }));
  }
  
  updateButtonIcon() {
    if (!this.icon) return;
    
    const isDark = this.currentTheme === 'dark';
    this.icon.textContent = isDark ? '☀️' : '🌙';
    
    // Update aria-label
    const label = isDark ? 'Switch to light theme' : 'Switch to dark theme';
    this.button.setAttribute('aria-label', label);
    this.button.setAttribute('title', label);
  }
  
  animateToggle() {
    const keyframes = [
      { transform: 'scale(1) rotate(0deg)' },
      { transform: 'scale(0.8) rotate(180deg)' },
      { transform: 'scale(1) rotate(360deg)' }
    ];
    
    const options = {
      duration: 300,
      easing: 'ease-in-out'
    };
    
    this.icon.animate(keyframes, options);
  }
  
  handleAttributeChange(name, oldValue, newValue) {
    if (name === 'aria-label' && this.button) {
      this.button.setAttribute('aria-label', newValue);
    }
  }
  
  needsIntersectionObserver() {
    return false; // Theme switcher doesn't need intersection observer
  }
}

// Register the component
customElements.define('theme-switcher', ThemeSwitcher);