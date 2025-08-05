/**
 * Base Web Component Class
 * Provides common functionality for all resume components
 */
class BaseComponent extends HTMLElement {
  constructor() {
    super();
    this._isReady = false;
    this.observers = new Map();
    
    // Bind methods to preserve context
    this.handleResize = this.debounce(this.handleResize.bind(this), 250);
    this.handleScroll = this.debounce(this.handleScroll.bind(this), 16);
  }
  
  /**
   * Called when component is added to DOM
   */
  connectedCallback() {
    this._isReady = true;
    this.render();
    this.setupEventListeners();
    this.setupObservers();
    
    // Add fade-in animation
    this.classList.add('fade-in');
  }
  
  /**
   * Called when component is removed from DOM
   */
  disconnectedCallback() {
    this._isReady = false;
    this.cleanup();
    this.removeEventListeners();
    this.disconnectObservers();
  }
  
  /**
   * Called when component attributes change
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (this._isReady && oldValue !== newValue) {
      this.handleAttributeChange(name, oldValue, newValue);
    }
  }
  
  /**
   * Template method for rendering component content
   * Override in child classes
   */
  render() {
    // Default implementation - override in child classes
  }
  
  /**
   * Template method for setting up event listeners
   * Override in child classes
   */
  setupEventListeners() {
    // Add common event listeners
    if (this.needsResize()) {
      window.addEventListener('resize', this.handleResize);
    }
    
    if (this.needsScroll()) {
      window.addEventListener('scroll', this.handleScroll, { passive: true });
    }
  }
  
  /**
   * Template method for removing event listeners
   * Override in child classes
   */
  removeEventListeners() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('scroll', this.handleScroll);
  }
  
  /**
   * Template method for cleanup
   * Override in child classes
   */
  cleanup() {
    // Default cleanup
  }
  
  /**
   * Template method for attribute changes
   * Override in child classes
   */
  handleAttributeChange(name, oldValue, newValue) {
    // Default implementation
  }
  
  /**
   * Setup intersection and resize observers
   */
  setupObservers() {
    // Intersection Observer for animations
    if (this.needsIntersectionObserver()) {
      const observer = new IntersectionObserver(
        (entries) => this.handleIntersection(entries),
        {
          threshold: 0.1,
          rootMargin: '50px'
        }
      );
      observer.observe(this);
      this.observers.set('intersection', observer);
    }
  }
  
  /**
   * Disconnect all observers
   */
  disconnectObservers() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
  }
  
  /**
   * Handle intersection changes
   */
  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.onEnterViewport();
      } else {
        this.onLeaveViewport();
      }
    });
  }
  
  /**
   * Called when element enters viewport
   */
  onEnterViewport() {
    this.classList.add('in-view');
  }
  
  /**
   * Called when element leaves viewport
   */
  onLeaveViewport() {
    this.classList.remove('in-view');
  }
  
  /**
   * Handle window resize
   */
  handleResize() {
    this.onResize();
  }
  
  /**
   * Handle window scroll
   */
  handleScroll() {
    this.onScroll();
  }
  
  /**
   * Template method for resize handling
   */
  onResize() {
    // Override in child classes
  }
  
  /**
   * Template method for scroll handling
   */
  onScroll() {
    // Override in child classes
  }
  
  /**
   * Whether this component needs resize events
   */
  needsResize() {
    return false;
  }
  
  /**
   * Whether this component needs scroll events
   */
  needsScroll() {
    return false;
  }
  
  /**
   * Whether this component needs intersection observer
   */
  needsIntersectionObserver() {
    return true;
  }
  
  /**
   * Utility: Debounce function calls
   */
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  /**
   * Utility: Throttle function calls
   */
  throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
  
  /**
   * Utility: Query selector with error handling
   */
  $(selector) {
    const element = this.querySelector(selector);
    if (!element) {
      console.warn(`Element not found: ${selector} in`, this);
    }
    return element;
  }
  
  /**
   * Utility: Query all selectors
   */
  $$(selector) {
    return Array.from(this.querySelectorAll(selector));
  }
  
  /**
   * Utility: Create element with attributes
   */
  createElement(tag, attributes = {}, textContent = '') {
    const element = document.createElement(tag);
    
    Object.entries(attributes).forEach(([key, value]) => {
      if (key === 'className') {
        element.className = value;
      } else if (key === 'dataset') {
        Object.entries(value).forEach(([dataKey, dataValue]) => {
          element.dataset[dataKey] = dataValue;
        });
      } else {
        element.setAttribute(key, value);
      }
    });
    
    if (textContent) {
      element.textContent = textContent;
    }
    
    return element;
  }
  
  /**
   * Utility: Animate element
   */
  animate(keyframes, options = {}) {
    const defaultOptions = {
      duration: 300,
      easing: 'ease-in-out',
      fill: 'forwards'
    };
    
    return this.animate(keyframes, { ...defaultOptions, ...options });
  }
  
  /**
   * Utility: Add CSS class with optional delay
   */
  addClassDelayed(className, delay = 0) {
    if (delay === 0) {
      this.classList.add(className);
    } else {
      setTimeout(() => this.classList.add(className), delay);
    }
  }
  
  /**
   * Utility: Remove CSS class with optional delay
   */
  removeClassDelayed(className, delay = 0) {
    if (delay === 0) {
      this.classList.remove(className);
    } else {
      setTimeout(() => this.classList.remove(className), delay);
    }
  }
  
  /**
   * Utility: Toggle CSS class
   */
  toggleClass(className, force) {
    return this.classList.toggle(className, force);
  }
  
  /**
   * Utility: Check if element has class
   */
  hasClass(className) {
    return this.classList.contains(className);
  }
  
  /**
   * Utility: Get computed style property
   */
  getStyle(property) {
    return getComputedStyle(this).getPropertyValue(property);
  }
  
  /**
   * Utility: Set CSS custom property
   */
  setCSSProperty(property, value) {
    this.style.setProperty(property, value);
  }
  
  /**
   * Utility: Get CSS custom property
   */
  getCSSProperty(property) {
    return getComputedStyle(this).getPropertyValue(property);
  }
  
  /**
   * Utility: Emit custom event
   */
  emit(eventName, detail = {}) {
    const event = new CustomEvent(eventName, {
      detail,
      bubbles: true,
      cancelable: true
    });
    return this.dispatchEvent(event);
  }
  
  /**
   * Utility: Listen for custom event
   */
  on(eventName, handler, options = {}) {
    this.addEventListener(eventName, handler, options);
    return () => this.removeEventListener(eventName, handler, options);
  }
  
  /**
   * Utility: Wait for next animation frame
   */
  nextFrame() {
    return new Promise(resolve => requestAnimationFrame(resolve));
  }
  
  /**
   * Utility: Wait for specified time
   */
  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  /**
   * Utility: Check if user prefers reduced motion
   */
  prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  
  /**
   * Utility: Get current theme
   */
  getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }
  
  /**
   * Utility: Check if dark theme is active
   */
  isDarkTheme() {
    return this.getCurrentTheme() === 'dark';
  }
}

// Export for use in other components
window.BaseComponent = BaseComponent;