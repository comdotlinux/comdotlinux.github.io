/**
 * Navigation Components
 * Handles navigation links and action buttons
 */

/**
 * Navigation Links Component
 */
class NavLinks extends BaseComponent {
  constructor() {
    super();
  }
  
  connectedCallback() {
    super.connectedCallback();
  }
  
  render() {
    // Create navigation structure if not already present
    if (!this.querySelector('ul, .nav-menu')) {
      const navList = this.createElement('ul', { 
        className: 'nav-menu',
        role: 'menubar'
      });
      
      // Move all nav-link children to list
      const navLinks = this.querySelectorAll('nav-link');
      navLinks.forEach(link => {
        const listItem = this.createElement('li', { role: 'none' });
        listItem.appendChild(link);
        navList.appendChild(listItem);
      });
      
      this.appendChild(navList);
    }
  }
}

/**
 * Individual Navigation Link Component
 */
class NavLink extends BaseComponent {
  static get observedAttributes() {
    return ['href', 'external', 'smooth-scroll'];
  }
  
  constructor() {
    super();
  }
  
  connectedCallback() {
    super.connectedCallback();
  }
  
  render() {
    const href = this.getAttribute('href');
    const isExternal = this.getAttribute('external') === 'true';
    const smoothScroll = this.getAttribute('smooth-scroll') === 'true';
    const label = this.textContent.trim();
    
    const link = this.createElement('a', {
      href: href,
      className: `nav-link ${isExternal ? 'external' : ''}`,
      role: 'menuitem',
      'aria-label': isExternal ? 
        `Visit ${label} (opens in new tab)` : 
        `Go to ${label.toLowerCase()} section`
    });
    
    if (isExternal) {
      link.target = '_blank';
      link.rel = 'noopener';
      link.innerHTML = `${label} <span class="external-icon" aria-hidden="true">↗</span>`;
    } else {
      link.textContent = label;
    }
    
    // Replace content with link
    this.innerHTML = '';
    this.appendChild(link);
  }
  
  setupEventListeners() {
    super.setupEventListeners();
    
    const link = this.querySelector('a');
    if (link && !this.getAttribute('external')) {
      link.addEventListener('click', (e) => {
        if (this.getAttribute('smooth-scroll') === 'true') {
          e.preventDefault();
          this.handleSmoothScroll(this.getAttribute('href'));
        }
        
        this.emit('nav-click', { 
          href: this.getAttribute('href'),
          label: this.textContent.trim()
        });
      });
    }
  }
  
  handleSmoothScroll(href) {
    if (href.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) {
        const headerHeight = document.querySelector('site-header')?.offsetHeight || 80;
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  }
}

/**
 * Action Buttons Container Component
 */
class ActionButtons extends BaseComponent {
  constructor() {
    super();
  }
  
  connectedCallback() {
    super.connectedCallback();
  }
  
  render() {
    // Add action buttons container class
    this.classList.add('action-buttons-container');
  }
}

/**
 * Download Button Component
 */
class DownloadButton extends BaseComponent {
  static get observedAttributes() {
    return ['type', 'filename', 'action'];
  }
  
  constructor() {
    super();
  }
  
  connectedCallback() {
    super.connectedCallback();
  }
  
  render() {
    const type = this.getAttribute('type') || 'pdf';
    const filename = this.getAttribute('filename') || 'resume.pdf';
    const action = this.getAttribute('action') || 'new-window';
    const label = this.textContent.trim() || 'Download';
    
    this.innerHTML = `
      <button class="pdf-button" aria-label="Download resume as PDF">
        <span class="download-icon">📄</span>
        <span class="download-text">${label}</span>
      </button>
    `;
  }
  
  setupEventListeners() {
    super.setupEventListeners();
    
    const button = this.querySelector('button');
    if (button) {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleDownload();
      });
    }
  }
  
  handleDownload() {
    const action = this.getAttribute('action') || 'pdf-library';
    const filename = this.getAttribute('filename') || 'resume.pdf';
    
    // Always use pdf-library for consistent results
    this.generatePDFInline(filename);
    
    // Emit download event
    this.emit('download-requested', { 
      type: this.getAttribute('type'),
      filename: filename,
      action: 'pdf-library'
    });
  }
  
  async generatePDFInline(filename) {
    if (typeof html2pdf === 'undefined') {
      console.error('html2pdf library not loaded');
      return;
    }
    
    try {
      // Create a clean iframe for PDF generation to avoid Web Component issues
      const iframe = document.createElement('iframe');
      iframe.style.position = 'absolute';
      iframe.style.left = '-9999px';
      iframe.style.width = '8.5in';
      iframe.style.height = '11in';
      document.body.appendChild(iframe);
      
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      
      // Generate clean HTML without Web Components
      const cleanHTML = this.generateCleanHTML();
      
      iframeDoc.open();
      iframeDoc.write(cleanHTML);
      iframeDoc.close();
      
      // Wait for content to load
      await this.wait(1000);
      
      // Configure PDF options for traditional resume format
      const opt = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: this.generateTimestampedFilename(filename),
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          allowTaint: true
        },
        jsPDF: { 
          unit: 'in', 
          format: 'letter', 
          orientation: 'portrait' 
        }
      };
      
      // Generate PDF from iframe content
      await html2pdf().set(opt).from(iframeDoc.body).save();
      
      // Clean up
      document.body.removeChild(iframe);
      
    } catch (error) {
      console.error('PDF generation failed:', error);
    }
  }
  
  generateCleanHTML() {
    const data = window.RESUME_DATA || {};
    const name = data.personal?.name || 'Guruprasad Kulkarni';
    const title = data.personal?.title || 'Senior Java Developer';
    const location = data.personal?.location || 'München, Germany';
    const email = data.personal?.email || 'guruprasad.kulkarni@example.com';
    
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${name} - Resume</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: 'Times New Roman', serif;
          font-size: 11pt;
          line-height: 1.4;
          color: #000;
          background: white;
        }
        .resume-header {
          text-align: center;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid #ccc;
        }
        .resume-name {
          font-size: 22pt;
          font-weight: bold;
          color: #4472C4;
          margin-bottom: 5px;
        }
        .resume-contact {
          font-size: 10pt;
          margin: 5px 0;
        }
        .section {
          margin: 15px 0;
        }
        .section-title {
          font-size: 12pt;
          font-weight: bold;
          color: #4472C4;
          margin-bottom: 8px;
          text-transform: uppercase;
        }
        .profile-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 15px;
        }
        .profile-item {
          display: flex;
        }
        .profile-label {
          font-weight: bold;
          width: 120px;
          flex-shrink: 0;
        }
        .profile-value {
          flex: 1;
        }
        .skills-list {
          columns: 2;
          column-gap: 30px;
        }
        .skills-list li {
          margin: 3px 0;
          list-style: disc;
          margin-left: 20px;
        }
        .experience-item {
          margin: 12px 0;
          page-break-inside: avoid;
        }
        .job-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 5px;
        }
        .job-title {
          font-weight: bold;
          font-size: 11pt;
        }
        .job-period {
          font-style: italic;
          font-size: 10pt;
        }
        .job-company {
          font-weight: bold;
          margin-bottom: 3px;
        }
        .job-details ul {
          margin: 5px 0 10px 20px;
        }
        .job-details li {
          margin: 2px 0;
          list-style: disc;
        }
        .education-item {
          text-align: center;
          margin: 8px 0;
        }
        @page {
          margin: 0.5in;
          size: letter;
        }
        @media print {
          body { -webkit-print-color-adjust: exact; }
        }
      </style>
    </head>
    <body>
      <div class="resume-header">
        <h1 class="resume-name">${name}</h1>
        <div class="resume-contact">${email} | ${location}</div>
        <div class="resume-contact">LinkedIn: linkedin.com/in/comdotlinux | GitHub: github.com/comdotlinux</div>
      </div>
      
      <div class="section">
        <h2 class="section-title">PROFILE</h2>
        <div class="profile-grid">
          <div class="profile-item">
            <div class="profile-label">Total Experience:</div>
            <div class="profile-value">18 years of Software Development</div>
          </div>
          <div class="profile-item">
            <div class="profile-label">Core Technologies:</div>
            <div class="profile-value">Java / Kotlin / Dart / Javascript</div>
          </div>
          <div class="profile-item">
            <div class="profile-label">Current Role:</div>
            <div class="profile-value">Backend Team Lead at SafeNow GmbH</div>
          </div>
          <div class="profile-item">
            <div class="profile-label">Philosophy:</div>
            <div class="profile-value">Open Source Software, Linux, and Java enthusiast</div>
          </div>
        </div>
      </div>
      
      <div class="section">
        <h2 class="section-title">SKILLS</h2>
        <ul class="skills-list">
          <li>Java (18+ years), Kotlin (6 years)</li>
          <li>Spring Framework, Jakarta EE, Quarkus</li>
          <li>AWS (EKS, App Runner, Aurora V2)</li>
          <li>Docker, Kubernetes, Terraform</li>
          <li>Microservices Architecture</li>
          <li>GraphQL (Hasura, Apollo)</li>
          <li>JavaScript, Dart, Flutter</li>
          <li>Prometheus, Grafana, GitHub Actions</li>
          <li>PostgreSQL, Database Design</li>
          <li>Apache Kafka, Debezium CDC</li>
        </ul>
      </div>
      
      <div class="section">
        <h2 class="section-title">EXPERIENCE</h2>
        
        <div class="experience-item">
          <div class="job-header">
            <div class="job-title">Backend Team Lead</div>
            <div class="job-period">Jan 2025 - Present</div>
          </div>
          <div class="job-company">SafeNow GmbH, München, Germany</div>
          <div class="job-details">
            <ul>
              <li>Leading a team of 4 senior backend engineers</li>
              <li>Designed and implemented currently running SafeNow Backend Architecture</li>
              <li>Full-stack backend ownership: infrastructure to database design</li>
              <li>Performance optimization and load testing with Grafana K6</li>
              <li>Experience with AI coding assistants: GitHub Copilot, JetBrains AI, Claude Code</li>
            </ul>
          </div>
        </div>
        
        <div class="experience-item">
          <div class="job-header">
            <div class="job-title">Senior Developer</div>
            <div class="job-period">June 2020 - Dec 2024</div>
          </div>
          <div class="job-company">SafeNow GmbH, München, Germany</div>
          <div class="job-details">
            <ul>
              <li>Backend architecture and microservice communication</li>
              <li>AWS infrastructure with Terraform (EKS, App Runner, Aurora V2)</li>
              <li>Java 17, Kotlin, Spring, Hasura GraphQL, PostgreSQL</li>
              <li>Monitoring with Grafana and Prometheus</li>
              <li>CI/CD pipelines with GitHub Actions and Codefresh</li>
            </ul>
          </div>
        </div>
        
        <div class="experience-item">
          <div class="job-header">
            <div class="job-title">Tech Lead / Senior Java Developer</div>
            <div class="job-period">Sept 2017 - June 2020</div>
          </div>
          <div class="job-company">IDnow GmbH, München, Germany</div>
          <div class="job-details">
            <ul>
              <li>Tech Lead for Autoident Product Team (Jan 2019 - June 2020)</li>
              <li>Identity verification platform development</li>
              <li>Team leadership and technical direction</li>
              <li>Mentored junior developers and established coding standards</li>
            </ul>
          </div>
        </div>
        
        <div class="experience-item">
          <div class="job-header">
            <div class="job-title">Team Lead / Senior Developer</div>
            <div class="job-period">Jan 2017 - Sept 2017</div>
          </div>
          <div class="job-company">Accenture, Frankfurt & Pune</div>
          <div class="job-details">
            <ul>
              <li>Banking portal for major German bank</li>
              <li>International team coordination</li>
            </ul>
          </div>
        </div>
        
        <div class="experience-item">
          <div class="job-header">
            <div class="job-title">Various Development Roles</div>
            <div class="job-period">Nov 2007 - April 2014</div>
          </div>
          <div class="job-company">Wipro Technologies, Multiple Locations</div>
          <div class="job-details">
            <ul>
              <li>International assignments in UK and Ireland</li>
              <li>Insurance and financial systems development</li>
              <li>Gained experience across multiple domains</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="section">
        <h2 class="section-title">EDUCATION</h2>
        <div class="education-item">
          <strong>Bachelor of Production Engineering</strong><br>
          V.I.T, Pune, Maharashtra - 2007
        </div>
        <div class="education-item">
          <strong>Diploma in Mechanical Engineering</strong><br>
          S.I.T, Pune, Maharashtra - 2004
        </div>
      </div>
    </body>
    </html>
    `;
  }
  
  generateTimestampedFilename(baseFilename) {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = now.toLocaleDateString('en', { month: 'short' }).toUpperCase();
    const year = now.getFullYear();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    
    const timestamp = `${day}-${month}-${year}_${hours}${minutes}`;
    const nameWithoutExt = baseFilename.replace(/\.[^/.]+$/, '');
    
    return `${nameWithoutExt}_${timestamp}.pdf`;
  }
  
  async wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

/**
 * Theme Toggle Component
 */
class ThemeToggle extends BaseComponent {
  static get observedAttributes() {
    return ['mode'];
  }
  
  constructor() {
    super();
    this.currentTheme = 'light';
  }
  
  connectedCallback() {
    super.connectedCallback();
    this.currentTheme = this.getCurrentTheme();
  }
  
  render() {
    const mode = this.getAttribute('mode') || 'toggle';
    
    this.innerHTML = `
      <button class="theme-toggle" aria-label="Toggle dark/light theme" title="Switch theme">
        <span class="theme-icon">${this.getThemeIcon()}</span>
      </button>
    `;
  }
  
  setupEventListeners() {
    super.setupEventListeners();
    
    const button = this.querySelector('button');
    if (button) {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleTheme();
      });
    }
    
    // Listen for theme changes from other sources
    window.addEventListener('theme-changed', (e) => {
      this.currentTheme = e.detail.theme;
      this.updateIcon();
    });
  }
  
  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    
    // Update document theme
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Save to localStorage
    localStorage.setItem('theme', newTheme);
    
    // Update current theme
    this.currentTheme = newTheme;
    this.updateIcon();
    
    // Emit theme change event
    this.emit('theme-changed', { theme: newTheme });
    window.dispatchEvent(new CustomEvent('theme-changed', { 
      detail: { theme: newTheme } 
    }));
  }
  
  updateIcon() {
    const iconElement = this.querySelector('.theme-icon');
    if (iconElement) {
      iconElement.textContent = this.getThemeIcon();
    }
  }
  
  getThemeIcon() {
    return this.currentTheme === 'light' ? '🌙' : '☀️';
  }
}

// Register components
customElements.define('nav-links', NavLinks);
customElements.define('nav-link', NavLink);
customElements.define('action-buttons', ActionButtons);
customElements.define('download-button', DownloadButton);
customElements.define('theme-toggle', ThemeToggle);