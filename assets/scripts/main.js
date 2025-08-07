/**
 * Main Application JavaScript
 * Initializes the resume application and provides global functionality
 */

// Application configuration
const APP_CONFIG = {
  version: '1.0.0',
  debug: false,
  analytics: {
    enabled: false,
    trackingId: null
  },
  features: {
    smoothScrolling: true,
    animations: true,
    pdfExport: true,
    themeToggle: true
  }
};

/**
 * Application Class
 * Manages global application state and initialization
 */
class ResumeApplication {
  constructor() {
    this.isInitialized = false;
    this.components = new Map();
    this.eventListeners = new Map();
    this.performance = {
      startTime: performance.now(),
      domReady: null,
      fullyLoaded: null
    };
  }
  
  /**
   * Initialize the application
   */
  async init() {
    try {
      console.log('🚀 Initializing Resume Application v' + APP_CONFIG.version);
      
      // Wait for DOM to be ready
      await this.waitForDOM();
      this.performance.domReady = performance.now();
      
      // Initialize theme system first (to prevent flash)
      this.initializeTheme();
      
      // Set up global event listeners
      this.setupGlobalEvents();
      
      // Initialize components
      this.initializeComponents();
      
      // Set up analytics (if enabled)
      if (APP_CONFIG.analytics.enabled) {
        this.initializeAnalytics();
      }
      
      // Set up performance monitoring
      this.setupPerformanceMonitoring();
      
      // Mark as initialized
      this.isInitialized = true;
      this.performance.fullyLoaded = performance.now();
      
      // Log performance metrics
      this.logPerformanceMetrics();
      
      // Emit application ready event
      document.dispatchEvent(new CustomEvent('app-initialized', {
        detail: { app: this }
      }));
      
      console.log('✅ Resume Application initialized successfully');
      
    } catch (error) {
      console.error('❌ Failed to initialize Resume Application:', error);
      this.handleInitializationError(error);
    }
  }
  
  /**
   * Wait for DOM to be ready
   */
  waitForDOM() {
    return new Promise((resolve) => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', resolve, { once: true });
      } else {
        resolve();
      }
    });
  }
  
  /**
   * Initialize theme system
   */
  initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-theme', theme);
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
      }
    });
  }
  
  /**
   * Set up global event listeners
   */
  setupGlobalEvents() {
    // Handle unhandled errors
    window.addEventListener('error', this.handleGlobalError.bind(this));
    window.addEventListener('unhandledrejection', this.handlePromiseRejection.bind(this));
    
    // Handle visibility changes (for performance optimization)
    document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
    
    // Handle page unload
    window.addEventListener('beforeunload', this.handleBeforeUnload.bind(this));
    
    // Handle resize with debouncing
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.handleResize();
      }, 250);
    });
    
    // Handle keyboard navigation
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    
    // Set up PDF download functionality
    this.setupPDFDownload();
    
    // Also try to set up PDF download after a delay in case components are still loading
    setTimeout(() => {
      this.setupPDFDownload();
    }, 1000);
    
    // Event delegation backup - only if direct handlers fail
    document.addEventListener('click', (event) => {
      const target = event.target;
      const pdfButton = document.getElementById('download-pdf');
      
      // Only use delegation if the button exists but doesn't have direct handlers
      if ((target.id === 'download-pdf' || 
           target.closest('#download-pdf') ||
           target.classList.contains('pdf-button') ||
           target.closest('.pdf-button')) &&
          pdfButton && 
          !pdfButton.onclick && 
          !this._hasDirectListener) {
        console.log('PDF button clicked via delegation!');
        event.preventDefault();
        event.stopPropagation();
        this.downloadPDF();
      }
    });
  }
  
  /**
   * Initialize web components
   */
  initializeComponents() {
    // Components are automatically initialized when their custom elements are defined
    // This method can be used for additional component setup if needed
    
    // Track component registration
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE && node.tagName.includes('-')) {
            this.onComponentAdded(node);
          }
        });
      });
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  
  /**
   * Called when a new component is added to the DOM
   */
  onComponentAdded(component) {
    if (APP_CONFIG.debug) {
      console.log('Component added:', component.tagName.toLowerCase());
    }
    
    this.components.set(component.tagName.toLowerCase(), component);
  }
  
  /**
   * Set up analytics
   */
  initializeAnalytics() {
    // Placeholder for analytics implementation
    console.log('Analytics initialized');
  }
  
  /**
   * Set up performance monitoring
   */
  setupPerformanceMonitoring() {
    // Monitor Largest Contentful Paint
    if ('LargestContentfulPaint' in window) {
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
      }).observe({ entryTypes: ['largest-contentful-paint'] });
    }
    
    // Monitor Cumulative Layout Shift
    if ('LayoutShift' in window) {
      new PerformanceObserver((entryList) => {
        let cls = 0;
        for (const entry of entryList.getEntries()) {
          if (!entry.hadRecentInput) {
            cls += entry.value;
          }
        }
        if (cls > 0.1) {
          console.warn('High CLS detected:', cls);
        }
      }).observe({ entryTypes: ['layout-shift'] });
    }
  }
  
  /**
   * Log performance metrics
   */
  logPerformanceMetrics() {
    const { startTime, domReady, fullyLoaded } = this.performance;
    
    console.log('📊 Performance Metrics:');
    console.log(`  DOM Ready: ${(domReady - startTime).toFixed(2)}ms`);
    console.log(`  Fully Loaded: ${(fullyLoaded - startTime).toFixed(2)}ms`);
    
    // Log navigation timing if available
    if (performance.getEntriesByType) {
      const navigation = performance.getEntriesByType('navigation')[0];
      if (navigation) {
        console.log(`  Page Load: ${navigation.loadEventEnd.toFixed(2)}ms`);
        console.log(`  DNS Lookup: ${(navigation.domainLookupEnd - navigation.domainLookupStart).toFixed(2)}ms`);
        console.log(`  TCP Connect: ${(navigation.connectEnd - navigation.connectStart).toFixed(2)}ms`);
      }
    }
  }
  
  /**
   * Handle global errors
   */
  handleGlobalError(event) {
    console.error('Global error:', event.error);
    
    if (APP_CONFIG.debug) {
      // In debug mode, show error details
      this.showErrorNotification('An error occurred: ' + event.error.message);
    }
  }
  
  /**
   * Handle promise rejections
   */
  handlePromiseRejection(event) {
    console.error('Unhandled promise rejection:', event.reason);
    
    if (APP_CONFIG.debug) {
      this.showErrorNotification('Promise rejection: ' + event.reason);
    }
  }
  
  /**
   * Handle initialization errors
   */
  handleInitializationError(error) {
    document.body.innerHTML = `
      <div style="padding: 2rem; text-align: center; font-family: system-ui;">
        <h1>Application Error</h1>
        <p>Sorry, the application failed to initialize properly.</p>
        <p style="color: #666; font-size: 0.9em;">Please refresh the page or try again later.</p>
        ${APP_CONFIG.debug ? `<pre style="background: #f5f5f5; padding: 1rem; margin-top: 1rem; text-align: left;">${error.stack}</pre>` : ''}
      </div>
    `;
  }
  
  /**
   * Handle visibility changes
   */
  handleVisibilityChange() {
    if (document.hidden) {
      // Page is hidden - pause any animations or timers
      this.pauseNonEssentialFeatures();
    } else {
      // Page is visible - resume features
      this.resumeNonEssentialFeatures();
    }
  }
  
  /**
   * Handle page unload
   */
  handleBeforeUnload() {
    // Clean up any resources
    this.cleanup();
  }
  
  /**
   * Handle window resize
   */
  handleResize() {
    // Notify components of resize
    document.dispatchEvent(new CustomEvent('app-resize', {
      detail: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    }));
  }
  
  /**
   * Handle keyboard navigation
   */
  handleKeyDown(event) {
    // Handle escape key to close modals/expanded sections
    if (event.key === 'Escape') {
      this.handleEscapeKey();
    }
    
    // Handle tab navigation improvements
    if (event.key === 'Tab') {
      document.body.classList.add('keyboard-navigation');
    }
  }
  
  /**
   * Handle escape key press
   */
  handleEscapeKey() {
    // Close any open details elements
    const openDetails = document.querySelectorAll('details[open]');
    openDetails.forEach(detail => {
      detail.open = false;
    });
  }
  
  /**
   * Pause non-essential features
   */
  pauseNonEssentialFeatures() {
    // Reduce animation and computation when page is hidden
    document.body.classList.add('page-hidden');
  }
  
  /**
   * Resume non-essential features
   */
  resumeNonEssentialFeatures() {
    document.body.classList.remove('page-hidden');
  }
  
  /**
   * Show error notification
   */
  showErrorNotification(message) {
    // Simple error notification implementation
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 1rem;
      right: 1rem;
      background: #ef4444;
      color: white;
      padding: 1rem;
      border-radius: 0.5rem;
      z-index: 10000;
      max-width: 300px;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 5000);
  }
  
  /**
   * Set up PDF download functionality
   */
  setupPDFDownload() {
    console.log('Setting up PDF download...');
    const pdfButton = document.getElementById('download-pdf');
    console.log('PDF button found:', !!pdfButton);
    
    if (pdfButton) {
      console.log('Adding click event listener to PDF button');
      
      // Remove any existing handlers first
      pdfButton.onclick = null;
      const newButton = pdfButton.cloneNode(true);
      pdfButton.parentNode.replaceChild(newButton, pdfButton);
      
      // Add single event handler
      newButton.addEventListener('click', (event) => {
        console.log('PDF button clicked!');
        event.preventDefault();
        event.stopPropagation();
        this.downloadPDF();
      });
      
      this._hasDirectListener = true;
    } else {
      console.error('PDF button not found! Trying to find it with different methods...');
      
      // Try finding by class or text content
      const buttonByClass = document.querySelector('.pdf-button');
      const buttonByText = Array.from(document.querySelectorAll('button')).find(btn => 
        btn.textContent.includes('Download') || btn.textContent.includes('PDF')
      );
      
      console.log('Button by class:', !!buttonByClass);
      console.log('Button by text:', !!buttonByText);
      
      if (buttonByClass) {
        buttonByClass.addEventListener('click', (event) => {
          console.log('PDF button (by class) clicked!');
          event.preventDefault();
          this.downloadPDF();
        });
      }
      
      if (buttonByText) {
        buttonByText.addEventListener('click', (event) => {
          console.log('PDF button (by text) clicked!');
          event.preventDefault();
          this.downloadPDF();
        });
      }
    }
  }
  
  /**
   * Download resume as PDF
   */
  downloadPDF() {
    console.log('PDF download initiated');
    console.log('html2pdf available:', typeof html2pdf !== 'undefined');
    
    // Add loading indicator
    const pdfButton = document.getElementById('download-pdf');
    if (pdfButton) {
      const originalText = pdfButton.textContent;
      pdfButton.textContent = 'Generating PDF...';
      pdfButton.disabled = true;
      
      // Reset button after 15 seconds regardless
      setTimeout(() => {
        pdfButton.textContent = originalText;
        pdfButton.disabled = false;
      }, 15000);
    }
    
    if (typeof html2pdf === 'undefined') {
      console.warn('html2pdf library not loaded, falling back to print');
      this.fallbackPrint();
      return;
    }
    
    // Try simple approach first
    this.generateSimplePDF();
  }
  
  /**
   * Generate simple PDF directly from resume data
   */
  generateSimplePDF() {
    console.log('Generating simple PDF...');
    
    // Create a simple HTML document directly
    const resumeHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: "Times New Roman", Times, serif;
      font-size: 11pt;
      line-height: 1.2;
      color: black;
      background: white;
      padding: 0.5in;
      width: 8.5in;
    }
    .header { text-align: center; margin-bottom: 20pt; }
    .header h1 { font-size: 22pt; color: #4472C4; font-weight: bold; margin-bottom: 8pt; }
    .header .contact { font-size: 11pt; margin-bottom: 2pt; }
    .section-title {
      font-size: 11pt; font-weight: bold; color: #4472C4; text-transform: uppercase;
      margin: 15pt 0 8pt 0; border-bottom: 1px solid #4472C4; padding-bottom: 2pt;
    }
    .profile-table { width: 100%; border-collapse: collapse; }
    .profile-table td { vertical-align: top; width: 50%; font-size: 11pt; line-height: 1.3; }
    .profile-table td:first-child { padding-right: 15pt; }
    ul { list-style-type: disc; margin: 0; padding-left: 20pt; }
    li { font-size: 11pt; line-height: 1.2; margin-bottom: 2pt; }
    .job-entry { margin-bottom: 12pt; }
    .job-header { font-size: 11pt; margin-bottom: 3pt; }
    .job-description { font-size: 11pt; font-weight: bold; margin-bottom: 5pt; font-style: italic; }
    .education { text-align: center; }
    strong { font-weight: bold; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Guruprasad Anil Kulkarni</h1>
    <div class="contact">Wilhelm-Dull-Straße 33 • München, Bavaria • 80638 • Github: comdotlinux • Stack Overflow: comdotlinux</div>
    <div class="contact">CELL: Germany +49 151 2799 7362 • E-MAIL: guru@linux.com • LinkedIn: comdotlinux • Web Resume: comdotlinux.github.io</div>
  </div>
  
  <div class="section-title">PROFILE</div>
  <table class="profile-table">
    <tr>
      <td>
        <div><strong>11 Years Programming Experience</strong></div>
        <div><strong>Testing Experience :</strong></div>
        <div><strong>2 Years Functional & 0.5 Years Non Functional</strong></div>
        <div><strong>Experience in Technical Design</strong></div>
        <div><strong>and design execution.</strong></div>
        <div><strong>Successful Launch of Autoident Product</strong></div>
        <div><strong>with IDnow team.</strong></div>
      </td>
      <td>
        <div>Proficient in Java, Jakarta EE, Eclipse</div>
        <div>Microprofile, Docker</div>
        <div>Worked with Javascript, Web Components</div>
        <div>Used Quarkus.io & Micronaut with GraalVM.</div>
        <div>Dabbled with Openshift, Ansible and simple</div>
        <div>go programs.</div>
      </td>
    </tr>
  </table>
  
  <div class="section-title">SKILLS</div>
  <ul>
    <li>Proficient in Java, Java / Jakarta EE, Javascript, Web Components, Shell Scripting.</li>
    <li>Experience with using Spring & Play Framework.</li>
    <li>Familiar with HTML5, CSS3, Oracle PL/SQL, Go.</li>
    <li>Junit4 and junit 5 + Easymock, Mockito.</li>
    <li>Selenium, Cypress.io + chai & mocha for web Testing.</li>
    <li>Integration testing rest Web Services.</li>
    <li>JPA with MySQL / PostgreSQL & Flyway migrations.</li>
    <li>Proficient in Linux including administration.</li>
    <li>Servers: Payara, TomEE, Websphere liberty profile, Netty, Apache Tomcat.</li>
    <li>Familiar and comfortable with docker and docker-compose.</li>
    <li>Proficient in VirtualBox from Oracle.</li>
    <li>Used Openshift, and familiar with Helm and Kubernetes.</li>
    <li>Used Terraform to setup and manage AWS infrastructure.</li>
    <li>Experience in using GraphQL, with apollo and Hasura</li>
  </ul>
  
  <div class="section-title">EXPERIENCE</div>
  <div class="job-entry">
    <div class="job-header"><strong>SafeNow GmbH:</strong> Senior Software Engineer (June 2020 - Present)</div>
    <div class="job-description">A safety app, that bridges the gap between security officers and helpers and people in need.</div>
    <ul>
      <li>Helped design, develop, release, add features for the new product launch.</li>
      <li>Worked to create backend architecture, microservice communication</li>
      <li>Setup Infrastructure on Amazon AWS using Terraform</li>
      <li>Setup build, deploy and end-to-end pipelines using Github Actions and Codefresh</li>
      <li>Helped develop new integrations like Minio including but not limited to infrastructure setup</li>
      <li>Setup prometheus-operator, including loki and promtail for monitoring and log management with the infrastructure setup</li>
    </ul>
  </div>
  
  <div class="education">
    <div class="section-title">EDUCATION</div>
    <div><strong>Vishwakarma Institute of Technology, Pune Maharashtra</strong></div>
    <div>Bachelor of Production Engineering.</div>
    <div><strong>Sinhgad Institute of Technology, Sou. Venutai Chavan Polytechnic</strong></div>
    <div>Diploma in Mechanical Engineering.</div>
  </div>
</body>
</html>`;

    // Create a blob and temporary URL
    const blob = new Blob([resumeHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    // Create temporary iframe
    const iframe = document.createElement('iframe');
    iframe.style.cssText = 'position: fixed; top: -9999px; left: -9999px; width: 8.5in; height: 11in;';
    document.body.appendChild(iframe);
    
    iframe.onload = () => {
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        
        // Generate filename
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        const month = months[now.getMonth()];
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const filename = `Guruprasad_Kulkarni_Resume_${day}-${month}-${year}_${hours}${minutes}.pdf`;
        
        const options = {
          margin: 0.5,
          filename: filename,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 1, logging: true, backgroundColor: '#ffffff' },
          jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };
        
        console.log('Starting PDF generation with options:', options);
        
        html2pdf()
          .set(options)
          .from(iframeDoc.documentElement)
          .save()
          .then(() => {
            console.log('PDF generated successfully');
            cleanup();
          })
          .catch((error) => {
            console.error('PDF generation failed:', error);
            cleanup();
            // Only fallback to print if user wants it
            const shouldFallback = confirm('PDF generation failed. Would you like to use browser print instead?');
            if (shouldFallback) {
              this.fallbackPrint();
            }
          });
          
      } catch (error) {
        console.error('Error in PDF generation:', error);
        cleanup();
        // Only fallback to print if user wants it
        const shouldFallback = confirm('PDF generation failed. Would you like to use browser print instead?');
        if (shouldFallback) {
          this.fallbackPrint();
        }
      }
    };
    
    function cleanup() {
      iframe.remove();
      URL.revokeObjectURL(url);
      const pdfButton = document.getElementById('download-pdf');
      if (pdfButton) {
        pdfButton.textContent = 'Download PDF';
        pdfButton.disabled = false;
      }
    }
    
    iframe.src = url;
  }

  /**
   * Generate clean PDF without Web Components (complex version)
   */
  generateCleanPDF() {
    console.log('Generating clean PDF content');
    
    // Create a temporary container in the main document instead of iframe
    const tempContainer = document.createElement('div');
    tempContainer.style.cssText = `
      position: fixed;
      top: -9999px;
      left: -9999px;
      width: 8.5in;
      height: 11in;
      background: white;
      font-family: "Times New Roman", Times, serif;
      font-size: 11pt;
      line-height: 1.2;
      color: black;
      padding: 0.5in;
      z-index: 10000;
    `;
    
    // Add custom CSS for PDF
    const pdfStyles = document.createElement('style');
    pdfStyles.textContent = `
      .pdf-container * {
        margin: 0 !important;
        padding: 0 !important;
        box-sizing: border-box !important;
        background: white !important;
        border: none !important;
        color: inherit !important;
      }
      
      .pdf-container {
        font-family: "Times New Roman", Times, serif !important;
        font-size: 11pt !important;
        line-height: 1.2 !important;
        color: #000000 !important;
        background: #ffffff !important;
        width: 7.5in !important;
        min-height: 10in !important;
      }
      
      .pdf-container .header {
        text-align: center !important;
        margin-bottom: 20pt !important;
        background: #ffffff !important;
      }
      
      .pdf-container .header h1 {
        font-size: 22pt !important;
        color: #4472C4 !important;
        font-weight: bold !important;
        margin-bottom: 8pt !important;
        background: #ffffff !important;
        text-align: center !important;
      }
      
      .pdf-container .header .contact-line {
        font-size: 11pt !important;
        color: #000000 !important;
        margin-bottom: 2pt !important;
        background: #ffffff !important;
      }
      
      .pdf-container .section-title {
        font-size: 11pt !important;
        font-weight: bold !important;
        color: #4472C4 !important;
        text-transform: uppercase !important;
        margin-top: 15pt !important;
        margin-bottom: 8pt !important;
        background: #ffffff !important;
        border-bottom: 1px solid #4472C4 !important;
        padding-bottom: 2pt !important;
      }
      
      .pdf-container .profile-table {
        width: 100% !important;
        border-collapse: collapse !important;
        background: #ffffff !important;
      }
      
      .pdf-container .profile-table td {
        vertical-align: top !important;
        width: 50% !important;
        font-size: 11pt !important;
        line-height: 1.3 !important;
        padding: 0 !important;
        background: #ffffff !important;
        color: #000000 !important;
      }
      
      .pdf-container .profile-table td:first-child {
        padding-right: 15pt !important;
      }
      
      .pdf-container .skills-section ul {
        list-style-type: disc !important;
        margin: 0 !important;
        padding-left: 20pt !important;
        background: #ffffff !important;
      }
      
      .pdf-container .skills-section li {
        font-size: 11pt !important;
        line-height: 1.2 !important;
        margin-bottom: 2pt !important;
        color: #000000 !important;
        background: #ffffff !important;
      }
      
      .pdf-container .job-entry {
        margin-bottom: 12pt !important;
        page-break-inside: avoid !important;
        background: #ffffff !important;
      }
      
      .pdf-container .job-header {
        font-size: 11pt !important;
        margin-bottom: 3pt !important;
        color: #000000 !important;
        background: #ffffff !important;
      }
      
      .pdf-container .job-description {
        font-size: 11pt !important;
        font-weight: bold !important;
        margin-bottom: 5pt !important;
        font-style: italic !important;
        color: #000000 !important;
        background: #ffffff !important;
      }
      
      .pdf-container .job-bullets {
        list-style-type: disc !important;
        margin: 0 !important;
        padding-left: 18pt !important;
        background: #ffffff !important;
      }
      
      .pdf-container .job-bullets li {
        font-size: 11pt !important;
        line-height: 1.2 !important;
        margin-bottom: 2pt !important;
        color: #000000 !important;
        background: #ffffff !important;
      }
      
      .pdf-container .education-section {
        text-align: center !important;
        background: #ffffff !important;
      }
      
      .pdf-container strong {
        font-weight: bold !important;
        color: inherit !important;
        background: transparent !important;
      }
    `;
    
    tempContainer.className = 'pdf-container';
    tempContainer.innerHTML = this.getResumeHTML();
    
    document.head.appendChild(pdfStyles);
    document.body.appendChild(tempContainer);
    
    // Generate filename with timestamp
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 
                    'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const timestamp = `${day}-${month}-${year}_${hours}${minutes}`;
    const filename = `Guruprasad_Kulkarni_Resume_${timestamp}.pdf`;
    
    // PDF options
    const options = {
      margin: 0.5,
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        logging: false,
        allowTaint: true,
        useCORS: false,
        backgroundColor: '#ffffff'
      },
      jsPDF: { 
        unit: 'in', 
        format: 'a4', 
        orientation: 'portrait'
      }
    };
    
    // Generate PDF from temp container
    html2pdf()
      .set(options)
      .from(tempContainer)
      .save()
      .then(() => {
        console.log('PDF generated successfully');
        // Clean up
        tempContainer.remove();
        pdfStyles.remove();
        
        // Reset button
        const pdfButton = document.getElementById('download-pdf');
        if (pdfButton) {
          pdfButton.textContent = 'Download PDF';
          pdfButton.disabled = false;
        }
      })
      .catch((error) => {
        console.error('PDF generation failed:', error);
        // Clean up
        tempContainer.remove();
        pdfStyles.remove();
        
        // Reset button
        const pdfButton = document.getElementById('download-pdf');
        if (pdfButton) {
          pdfButton.textContent = 'Download PDF';
          pdfButton.disabled = false;
        }
        
        // Ask user if they want to fallback to print
        const shouldFallback = confirm('PDF generation failed. Would you like to use browser print instead?');
        if (shouldFallback) {
          this.fallbackPrint();
        }
      });
  }
  
  /**
   * Get clean HTML for resume (no Web Components)
   */
  getResumeHTML() {
    return `
      <div class="header">
        <h1>Guruprasad Anil Kulkarni</h1>
        <div class="contact-line">Wilhelm-Dull-Straße 33 • München, Bavaria • 80638 • Github: comdotlinux • Stack Overflow: comdotlinux</div>
        <div class="contact-line">CELL: Germany +49 151 2799 7362 • E-MAIL: guru@linux.com • LinkedIn: comdotlinux • Web Resume: comdotlinux.github.io</div>
      </div>
      
      <div class="profile-section">
        <div class="section-title">PROFILE</div>
        <table class="profile-table">
          <tr>
            <td>
              <div><strong>11 Years Programming Experience</strong></div>
              <div><strong>Testing Experience :</strong></div>
              <div><strong>2 Years Functional & 0.5 Years Non Functional</strong></div>
              <div><strong>Experience in Technical Design</strong></div>
              <div><strong>and design execution.</strong></div>
              <div><strong>Successful Launch of Autoident Product</strong></div>
              <div><strong>with IDnow team.</strong></div>
            </td>
            <td>
              <div>Proficient in Java, Jakarta EE, Eclipse</div>
              <div>Microprofile, Docker</div>
              <div>Worked with Javascript, Web Components</div>
              <div>Used Quarkus.io & Micronaut with GraalVM.</div>
              <div>Dabbled with Openshift, Ansible and simple</div>
              <div>go programs.</div>
            </td>
          </tr>
        </table>
      </div>
      
      <div class="skills-section">
        <div class="section-title">SKILLS</div>
        <ul>
          <li>Proficient in Java, Java / Jakarta EE, Javascript, Web Components, Shell Scripting.</li>
          <li>Experience with using Spring & Play Framework.</li>
          <li>Familiar with HTML5, CSS3, Oracle PL/SQL, Go.</li>
          <li>Junit4 and junit 5 + Easymock, Mockito.</li>
          <li>Selenium, Cypress.io + chai & mocha for web Testing.</li>
          <li>Integration testing rest Web Services.</li>
          <li>JPA with MySQL / PostgreSQL & Flyway migrations.</li>
          <li>Proficient in Linux including administration.</li>
          <li>Servers: Payara, TomEE, Websphere liberty profile, Netty, Apache Tomcat.</li>
          <li>Familiar and comfortable with docker and docker-compose.</li>
          <li>Proficient in VirtualBox from Oracle.</li>
          <li>Used Openshift, and familiar with Helm and Kubernetes.</li>
          <li>Used Terraform to setup and manage AWS infrastructure.</li>
          <li>Experience in using GraphQL, with apollo and Hasura</li>
        </ul>
      </div>
      
      <div class="experience-section">
        <div class="section-title">EXPERIENCE</div>
        
        <div class="job-entry">
          <div class="job-header"><strong>SafeNow GmbH:</strong> Senior Software Engineer (June 2020 - Present)</div>
          <div class="job-description">A safety app, that bridges the gap between security officers and helpers and people in need.</div>
          <ul class="job-bullets">
            <li>Helped design, develop, release, add features for the new product launch.</li>
            <li>Worked to create backend architecture, microservice communication</li>
            <li>Setup Infrastructure on Amazon AWS using Terraform</li>
            <li>Setup build, deploy and end-to-end pipelines using Github Actions and Codefresh</li>
            <li>Helped develop new integrations like Minio including but not limited to infrastructure setup</li>
            <li>Setup prometheus-operator, including loki and promtail for monitoring and log management with the infrastructure setup</li>
            <li>Worked and developed stories and saw them delivered to production.</li>
            <li>Tech Stack: Java 11, Kotlin, Spring Framework, Hasura GraphQL + Postgres, Unit tests using Junit, Deployment with helm to Kubernetes.</li>
            <li>Using Flutter with dart on the apps.</li>
            <li>Helped create a continuous deployment at least to Dev and Continuous Deployment to Production is in progress</li>
          </ul>
        </div>
        
        <div class="job-entry">
          <div class="job-header"><strong>IDnow GmbH:</strong> Tech Lead (Jan 2019 - May 2020), Senior Java Developer (Sep 2017 - Jan 2019)</div>
          <div class="job-description">Identity verification platform using mobile and web for various use cases.</div>
          <ul class="job-bullets">
            <li>Helped design, develop, release, add features and maintain a new product launch.</li>
            <li>Worked to create backend architecture, microservice communication.</li>
            <li>Setup Jmeter load tests and identified issues.</li>
            <li>Setup build, deploy and end-to-end tests for services on Jenkins.</li>
            <li>Worked with product owners and other stakeholders to create stories</li>
            <li>Work and develop stories and see them delivered till live.</li>
            <li>Used Play Framework, Java 8, Junit, Mockito and docker.</li>
            <li>Created ancillary tools using Quarkus and Go to automate repetitive tasks.</li>
          </ul>
        </div>
        
        <div class="job-entry">
          <div class="job-header"><strong>Accenture:</strong> (Non functional tester(Jan 2017 - Sep 2017) / Team Lead (Dec 2015 - Dec 2017) / Senior Software Developer(Sep 2014 - Dec 2015)</div>
          <div class="job-description">Banking portal development for the second largest bank in Germany.</div>
          <ul class="job-bullets">
            <li>Supporting the Non Function Test team for a few months, Work did not only involve testing but also creating and improving tools (in Java and unix shell scripts) and processes.</li>
            <li>Developing within strict timelines in a Distributed Agile Environment.</li>
            <li>Involved in all stages like Designing, Estimations, Tasking Out, Development, Defect Fixing, and supporting Production support teams.</li>
          </ul>
        </div>
        
        <div class="job-entry">
          <div class="job-header"><strong>Talentica Software:</strong> Senior Software Engineer (Apr 2014 – Aug 2014)</div>
          <div class="job-description">Customized pay per view mobile web app for video delivery</div>
        </div>
        
        <div class="job-entry">
          <div class="job-header"><strong>Wipro Technologies:</strong> Different projects detailed below.</div>
          <ul class="job-bullets">
            <li><strong>Senior Software Developer (Jan 2010 – Apr 2014)</strong></li>
            <li style="margin-left: 20pt;">Investment Management & General Ledger System</li>
            <li style="margin-left: 20pt;">End To End General Insurance Product Designed and Developed by Wipro.</li>
            <li><strong>Test Engineer (Nov 2007 – Jan 2010)</strong></li>
            <li style="margin-left: 20pt;">End To End General Insurance Product Designed and Developed by Wipro.</li>
            <li style="margin-left: 20pt;">Derivatives trading application Regression Testing</li>
          </ul>
        </div>
      </div>
      
      <div class="education-section">
        <div class="section-title">EDUCATION</div>
        <div><strong>Vishwakarma Institute of Technology, Pune Maharashtra</strong></div>
        <div>Bachelor of Production Engineering.</div>
        <div><strong>Sinhgad Institute of Technology, Sou. Venutai Chavan Polytechnic</strong></div>
        <div>Diploma in Mechanical Engineering.</div>
      </div>
    `;
  }
  
  
  
  /**
   * Fallback to browser print
   */
  fallbackPrint() {
    const details = document.querySelectorAll('details');
    const originalStates = Array.from(details).map(detail => detail.open);
    
    details.forEach(detail => {
      detail.open = true;
    });
    
    document.body.classList.add('printing');
    
    setTimeout(() => {
      window.print();
      
      setTimeout(() => {
        details.forEach((detail, index) => {
          detail.open = originalStates[index];
        });
        document.body.classList.remove('printing');
      }, 1000);
    }, 300);
  }
  
  /**
   * Clean up resources
   */
  cleanup() {
    // Remove event listeners
    this.eventListeners.forEach((listener, element) => {
      element.removeEventListener(...listener);
    });
    this.eventListeners.clear();
    
    // Clear components
    this.components.clear();
  }
  
  /**
   * Get component by tag name
   */
  getComponent(tagName) {
    return this.components.get(tagName.toLowerCase());
  }
  
  /**
   * Check if application is ready
   */
  isReady() {
    return this.isInitialized;
  }
}

// Initialize application when DOM is ready
const resumeApp = new ResumeApplication();

// Start initialization
resumeApp.init();

// Make app available globally for debugging
window.resumeApp = resumeApp;
window.APP_CONFIG = APP_CONFIG;

// Add global PDF download function for testing
window.downloadPDF = function() {
  console.log('Global downloadPDF called');
  if (window.resumeApp && window.resumeApp.downloadPDF) {
    window.resumeApp.downloadPDF();
  } else {
    console.error('Resume app not available');
  }
};

// Add simple test function
window.testPDF = function() {
  console.log('Testing PDF download...');
  console.log('html2pdf available:', typeof html2pdf !== 'undefined');
  
  const button = document.getElementById('download-pdf');
  console.log('Button element:', button);
  
  if (button) {
    console.log('Button text:', button.textContent);
    console.log('Button classes:', button.className);
    console.log('Button onclick:', button.onclick);
    console.log('Button listeners:', getEventListeners ? getEventListeners(button) : 'getEventListeners not available');
  }
  
  // Try to trigger download directly
  window.downloadPDF();
};

// Add profile animation test function
window.testProfileAnimation = function() {
  console.log('Testing profile animation...');
  
  const header = document.querySelector('site-header');
  const compactProfile = document.querySelector('profile-card[compact="true"]');
  const socialContacts = document.querySelector('social-contacts[position="dynamic"]');
  const mainProfile = document.querySelector('profile-card[main="true"]');
  
  console.log('Header:', header);
  console.log('Compact profile:', compactProfile);
  console.log('Social contacts:', socialContacts);
  console.log('Main profile:', mainProfile);
  
  if (header) {
    console.log('Header classes:', header.className);
    console.log('Toggling profile-visible class...');
    
    // Toggle the class to test animation
    header.classList.toggle('profile-visible');
    console.log('Header classes after toggle:', header.className);
    
    // Show element states
    if (compactProfile) {
      console.log('Compact profile display:', window.getComputedStyle(compactProfile).display);
      console.log('Compact profile opacity:', window.getComputedStyle(compactProfile).opacity);
      console.log('Compact profile transform:', window.getComputedStyle(compactProfile).transform);
    }
  }
};

// Add global function to manually trigger profile animation
window.showHeaderProfile = function() {
  const header = document.querySelector('site-header');
  if (header) {
    header.classList.add('profile-visible');
    console.log('Header profile shown');
  }
};

window.hideHeaderProfile = function() {
  const header = document.querySelector('site-header');
  if (header) {
    header.classList.remove('profile-visible');
    console.log('Header profile hidden');
  }
};

// Remove click events on mouse use (for better keyboard navigation UX)
document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-navigation');
});

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ResumeApplication, APP_CONFIG };
}