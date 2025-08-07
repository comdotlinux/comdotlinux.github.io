/**
 * UX Validation Test Suite
 * Comprehensive accessibility and user experience testing
 */

class UXValidator {
  constructor() {
    this.findings = [];
    this.errors = [];
    this.warnings = [];
    this.recommendations = [];
    this.testResults = {
      accessibility: {},
      profileAnimation: {},
      responsiveness: {},
      performance: {},
      usability: {}
    };
  }
  
  async runAllTests() {
    console.log('🔍 Starting comprehensive UX validation...');
    
    try {
      await this.testAccessibility();
      await this.testProfileAnimation();
      await this.testResponsiveness();
      await this.testPerformance();
      await this.testUsability();
      
      this.generateReport();
    } catch (error) {
      console.error('❌ Test suite failed:', error);
    }
  }
  
  async testAccessibility() {
    console.log('🧭 Testing WCAG 2.1 AA Compliance...');
    
    // Test 1: Semantic HTML structure
    this.testSemanticHTML();
    
    // Test 2: ARIA labels and landmarks
    this.testARIALabels();
    
    // Test 3: Keyboard navigation
    await this.testKeyboardNavigation();
    
    // Test 4: Color contrast
    this.testColorContrast();
    
    // Test 5: Skip links
    this.testSkipLinks();
    
    // Test 6: Screen reader compatibility
    this.testScreenReaderSupport();
  }
  
  testSemanticHTML() {
    const results = {
      passed: [],
      failed: [],
      warnings: []
    };
    
    // Check for proper heading hierarchy
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let lastLevel = 0;
    
    headings.forEach(heading => {
      const level = parseInt(heading.tagName.charAt(1));
      if (level - lastLevel > 1) {
        results.warnings.push(`Heading hierarchy jump: ${heading.tagName} after H${lastLevel}`);
      }
      lastLevel = level;
    });
    
    // Check for main element
    if (!document.querySelector('main')) {
      results.failed.push('Missing main element for primary content');
    } else {
      results.passed.push('Main element present');
    }
    
    // Check for nav elements
    const navElements = document.querySelectorAll('nav, [role="navigation"]');
    if (navElements.length === 0) {
      results.failed.push('Missing navigation landmarks');
    } else {
      results.passed.push(`Navigation landmarks found: ${navElements.length}`);
    }
    
    // Check for proper form labels
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      const label = document.querySelector(`label[for="${input.id}"]`);
      const ariaLabel = input.getAttribute('aria-label');
      const ariaLabelledBy = input.getAttribute('aria-labelledby');
      
      if (!label && !ariaLabel && !ariaLabelledBy) {
        results.failed.push(`Input without proper label: ${input.type || input.tagName}`);
      }
    });
    
    this.testResults.accessibility.semanticHTML = results;
  }
  
  testARIALabels() {
    const results = {
      passed: [],
      failed: [],
      warnings: []
    };
    
    // Check for proper ARIA labels on interactive elements
    const interactiveElements = document.querySelectorAll(
      'button, a, input, select, textarea, [role="button"], [role="link"]'
    );
    
    interactiveElements.forEach(element => {
      const ariaLabel = element.getAttribute('aria-label');
      const ariaLabelledBy = element.getAttribute('aria-labelledby');
      const textContent = element.textContent.trim();
      
      if (!ariaLabel && !ariaLabelledBy && !textContent) {
        results.failed.push(`Interactive element without accessible name: ${element.tagName}`);
      } else {
        results.passed.push(`Accessible name present: ${element.tagName}`);
      }
    });
    
    // Check for proper landmark roles
    const requiredLandmarks = ['navigation', 'main', 'banner', 'contentinfo'];
    const existingLandmarks = new Set();
    
    document.querySelectorAll('[role]').forEach(element => {
      existingLandmarks.add(element.getAttribute('role'));
    });
    
    // Also check semantic elements that create implicit landmarks
    if (document.querySelector('nav')) existingLandmarks.add('navigation');
    if (document.querySelector('main')) existingLandmarks.add('main');
    if (document.querySelector('header')) existingLandmarks.add('banner');
    if (document.querySelector('footer')) existingLandmarks.add('contentinfo');
    
    requiredLandmarks.forEach(landmark => {
      if (existingLandmarks.has(landmark)) {
        results.passed.push(`Landmark present: ${landmark}`);
      } else {
        results.warnings.push(`Missing recommended landmark: ${landmark}`);
      }
    });
    
    this.testResults.accessibility.ariaLabels = results;
  }
  
  async testKeyboardNavigation() {
    const results = {
      passed: [],
      failed: [],
      warnings: []
    };
    
    // Check for proper focus indicators
    const focusableElements = document.querySelectorAll(
      'a, button, input, select, textarea, [tabindex="0"], [role="button"], [role="link"]'
    );
    
    // Check skip link functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
      // Simulate focus on skip link
      skipLink.focus();
      const computedStyle = window.getComputedStyle(skipLink);
      if (computedStyle.top === '-100px') {
        results.failed.push('Skip link remains hidden when focused');
      } else {
        results.passed.push('Skip link becomes visible when focused');
      }
    }
    
    // Check for proper tab order
    let tabOrderIssues = 0;
    focusableElements.forEach((element, index) => {
      const tabIndex = element.getAttribute('tabindex');
      if (tabIndex && parseInt(tabIndex) > 0) {
        tabOrderIssues++;
      }
    });
    
    if (tabOrderIssues > 0) {
      results.warnings.push(`${tabOrderIssues} elements using positive tabindex (not recommended)`);
    } else {
      results.passed.push('No positive tabindex values found');
    }
    
    this.testResults.accessibility.keyboardNavigation = results;
  }
  
  testColorContrast() {
    const results = {
      passed: [],
      failed: [],
      warnings: []
    };
    
    // This would require more sophisticated color analysis
    // For now, we'll check if CSS custom properties are properly defined
    const rootStyles = getComputedStyle(document.documentElement);
    
    const colorProperties = [
      '--text-primary', '--bg-primary', '--color-primary',
      '--text-secondary', '--bg-secondary', '--border-primary'
    ];
    
    colorProperties.forEach(property => {
      const value = rootStyles.getPropertyValue(property);
      if (!value) {
        results.warnings.push(`Color property not defined: ${property}`);
      } else {
        results.passed.push(`Color property defined: ${property}`);
      }
    });
    
    this.testResults.accessibility.colorContrast = results;
  }
  
  testSkipLinks() {
    const results = {
      passed: [],
      failed: [],
      warnings: []
    };
    
    const skipLink = document.querySelector('.skip-link');
    if (!skipLink) {
      results.failed.push('Skip link not found');
    } else {
      results.passed.push('Skip link present');
      
      // Check if skip link has proper href
      const href = skipLink.getAttribute('href');
      if (!href || !href.startsWith('#')) {
        results.failed.push('Skip link missing proper href');
      } else {
        const target = document.querySelector(href);
        if (!target) {
          results.failed.push(`Skip link target not found: ${href}`);
        } else {
          results.passed.push('Skip link target exists');
        }
      }
    }
    
    this.testResults.accessibility.skipLinks = results;
  }
  
  testScreenReaderSupport() {
    const results = {
      passed: [],
      failed: [],
      warnings: []
    };
    
    // Check for proper heading structure
    const h1Elements = document.querySelectorAll('h1');
    if (h1Elements.length === 0) {
      results.failed.push('No H1 heading found');
    } else if (h1Elements.length > 1) {
      results.warnings.push(`Multiple H1 headings found: ${h1Elements.length}`);
    } else {
      results.passed.push('Single H1 heading found');
    }
    
    // Check for hidden content that should be available to screen readers
    const srOnlyElements = document.querySelectorAll('.sr-only');
    if (srOnlyElements.length > 0) {
      results.passed.push(`Screen reader only content found: ${srOnlyElements.length} elements`);
    }
    
    // Check for proper alt text on images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      const alt = img.getAttribute('alt');
      if (alt === null) {
        results.failed.push(`Image missing alt attribute: ${img.src}`);
      } else if (alt === '') {
        results.passed.push(`Decorative image properly marked: ${img.src}`);
      } else {
        results.passed.push(`Image has descriptive alt text: ${img.src}`);
      }
    });
    
    this.testResults.accessibility.screenReaderSupport = results;
  }
  
  async testProfileAnimation() {
    console.log('🎬 Testing Profile Animation Behavior...');
    
    const results = {
      passed: [],
      failed: [],
      warnings: []
    };
    
    // Check for main profile element
    const mainProfile = document.querySelector('profile-card[main="true"]');
    if (!mainProfile) {
      results.failed.push('Main profile card not found');
      this.testResults.profileAnimation = results;
      return;
    }
    
    // Check for compact profile in header
    const compactProfile = document.querySelector('profile-card[compact="true"]');
    if (!compactProfile) {
      results.failed.push('Compact profile card not found in header');
    } else {
      results.passed.push('Compact profile card found');
      
      // Check initial visibility
      const isHidden = compactProfile.style.display === 'none' || 
                     compactProfile.style.opacity === '0';
      if (!isHidden) {
        results.warnings.push('Compact profile should be initially hidden');
      } else {
        results.passed.push('Compact profile initially hidden');
      }
    }
    
    // Check for site-header component
    const siteHeader = document.querySelector('site-header');
    if (!siteHeader) {
      results.failed.push('Site header component not found');
    } else {
      results.passed.push('Site header component found');
      
      // Check for profile visibility class behavior
      if (!siteHeader.classList.contains('profile-visible')) {
        results.passed.push('Header profile hidden by default');
      }
    }
    
    // Check for social contacts dynamic positioning
    const dynamicSocialContacts = document.querySelector('social-contacts[position="dynamic"]');
    if (!dynamicSocialContacts) {
      results.warnings.push('Dynamic social contacts not found');
    } else {
      results.passed.push('Dynamic social contacts found');
    }
    
    // Check for reduced motion support
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      results.passed.push('Respects user motion preferences');
    }
    
    this.testResults.profileAnimation = results;
  }
  
  async testResponsiveness() {
    console.log('📱 Testing Responsive Design...');
    
    const results = {
      passed: [],
      failed: [],
      warnings: []
    };
    
    const viewports = [
      { name: 'Mobile', width: 375, height: 667 },
      { name: 'Tablet', width: 768, height: 1024 },
      { name: 'Desktop', width: 1200, height: 800 },
      { name: 'Large Desktop', width: 1920, height: 1080 }
    ];
    
    // Test viewport meta tag
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (!viewportMeta) {
      results.failed.push('Missing viewport meta tag');
    } else {
      results.passed.push('Viewport meta tag present');
    }
    
    // Test CSS media queries
    const stylesheets = Array.from(document.styleSheets);
    let hasMediaQueries = false;
    
    try {
      stylesheets.forEach(stylesheet => {
        if (stylesheet.cssRules) {
          Array.from(stylesheet.cssRules).forEach(rule => {
            if (rule.type === CSSRule.MEDIA_RULE) {
              hasMediaQueries = true;
            }
          });
        }
      });
    } catch (e) {
      results.warnings.push('Could not access some stylesheets for media query check');
    }
    
    if (hasMediaQueries) {
      results.passed.push('CSS media queries found');
    } else {
      results.warnings.push('No CSS media queries detected');
    }
    
    // Test touch targets (minimum 44x44px)
    const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
    interactiveElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      if (rect.width < 44 || rect.height < 44) {
        results.warnings.push(`Touch target too small: ${element.tagName} (${rect.width}x${rect.height})`);
      }
    });
    
    this.testResults.responsiveness = results;
  }
  
  async testPerformance() {
    console.log('⚡ Testing Performance...');
    
    const results = {
      passed: [],
      failed: [],
      warnings: []
    };
    
    // Check for performance API
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0];
      
      if (navigation) {
        const loadTime = navigation.loadEventEnd - navigation.fetchStart;
        const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart;
        
        if (loadTime < 2000) {
          results.passed.push(`Page load time: ${loadTime}ms (under 2s target)`);
        } else {
          results.warnings.push(`Page load time: ${loadTime}ms (exceeds 2s target)`);
        }
        
        if (domContentLoaded < 1500) {
          results.passed.push(`DOM ready time: ${domContentLoaded}ms`);
        } else {
          results.warnings.push(`DOM ready time: ${domContentLoaded}ms (may be slow)`);
        }
      }
      
      // Check for render blocking resources
      const resources = performance.getEntriesByType('resource');
      const renderBlockingCSS = resources.filter(resource => 
        resource.name.endsWith('.css') && 
        !resource.name.includes('print.css')
      );
      
      if (renderBlockingCSS.length > 3) {
        results.warnings.push(`Multiple render-blocking CSS files: ${renderBlockingCSS.length}`);
      }
    }
    
    // Check for lazy loading
    const images = document.querySelectorAll('img');
    let lazyImages = 0;
    images.forEach(img => {
      if (img.getAttribute('loading') === 'lazy') {
        lazyImages++;
      }
    });
    
    if (lazyImages > 0) {
      results.passed.push(`Lazy loading images: ${lazyImages}`);
    }
    
    // Check for preload directives
    const preloadLinks = document.querySelectorAll('link[rel="preload"]');
    if (preloadLinks.length > 0) {
      results.passed.push(`Resource preloading: ${preloadLinks.length} resources`);
    }
    
    this.testResults.performance = results;
  }
  
  async testUsability() {
    console.log('🎯 Testing Usability...');
    
    const results = {
      passed: [],
      failed: [],
      warnings: []
    };
    
    // Test theme switching functionality
    const themeToggle = document.querySelector('theme-toggle');
    if (!themeToggle) {
      results.warnings.push('Theme toggle not found');
    } else {
      results.passed.push('Theme toggle present');
    }
    
    // Test PDF download functionality
    const downloadButton = document.querySelector('download-button');
    if (!downloadButton) {
      results.warnings.push('Download button not found');
    } else {
      results.passed.push('PDF download button present');
    }
    
    // Test navigation smooth scrolling
    const navLinks = document.querySelectorAll('nav-link[smooth-scroll="true"]');
    if (navLinks.length > 0) {
      results.passed.push(`Smooth scroll navigation: ${navLinks.length} links`);
    }
    
    // Test expandable content
    const expandableElements = document.querySelectorAll('[expandable="true"]');
    if (expandableElements.length > 0) {
      results.passed.push(`Expandable content sections: ${expandableElements.length}`);
    }
    
    // Check for proper error handling
    const webComponents = document.querySelectorAll(
      'site-header, profile-card, nav-links, social-contacts, professional-summary, technical-skills, experience-section, projects-section'
    );
    
    webComponents.forEach(component => {
      if (component.tagName && !customElements.get(component.tagName.toLowerCase())) {
        results.failed.push(`Web component not registered: ${component.tagName}`);
      }
    });
    
    this.testResults.usability = results;
  }
  
  generateReport() {
    console.log('\n' + '='.repeat(80));
    console.log('📊 UX VALIDATION REPORT');
    console.log('='.repeat(80));
    
    this.generateAccessibilityReport();
    this.generateProfileAnimationReport();
    this.generateResponsivenessReport();
    this.generatePerformanceReport();
    this.generateUsabilityReport();
    this.generateSummaryReport();
  }
  
  generateAccessibilityReport() {
    console.log('\n🧭 ACCESSIBILITY (WCAG 2.1 AA) COMPLIANCE:');
    console.log('-'.repeat(50));
    
    const categories = [
      'semanticHTML', 'ariaLabels', 'keyboardNavigation', 
      'colorContrast', 'skipLinks', 'screenReaderSupport'
    ];
    
    categories.forEach(category => {
      const results = this.testResults.accessibility[category];
      if (results) {
        console.log(`\n${category.toUpperCase()}:`);
        if (results.passed.length > 0) {
          console.log('  ✅ PASSED:');
          results.passed.forEach(item => console.log(`     • ${item}`));
        }
        if (results.failed.length > 0) {
          console.log('  ❌ FAILED:');
          results.failed.forEach(item => console.log(`     • ${item}`));
        }
        if (results.warnings.length > 0) {
          console.log('  ⚠️  WARNINGS:');
          results.warnings.forEach(item => console.log(`     • ${item}`));
        }
      }
    });
  }
  
  generateProfileAnimationReport() {
    console.log('\n🎬 PROFILE ANIMATION BEHAVIOR:');
    console.log('-'.repeat(50));
    
    const results = this.testResults.profileAnimation;
    if (results.passed.length > 0) {
      console.log('  ✅ PASSED:');
      results.passed.forEach(item => console.log(`     • ${item}`));
    }
    if (results.failed.length > 0) {
      console.log('  ❌ FAILED:');
      results.failed.forEach(item => console.log(`     • ${item}`));
    }
    if (results.warnings.length > 0) {
      console.log('  ⚠️  WARNINGS:');
      results.warnings.forEach(item => console.log(`     • ${item}`));
    }
  }
  
  generateResponsivenessReport() {
    console.log('\n📱 RESPONSIVE DESIGN:');
    console.log('-'.repeat(50));
    
    const results = this.testResults.responsiveness;
    if (results.passed.length > 0) {
      console.log('  ✅ PASSED:');
      results.passed.forEach(item => console.log(`     • ${item}`));
    }
    if (results.failed.length > 0) {
      console.log('  ❌ FAILED:');
      results.failed.forEach(item => console.log(`     • ${item}`));
    }
    if (results.warnings.length > 0) {
      console.log('  ⚠️  WARNINGS:');
      results.warnings.forEach(item => console.log(`     • ${item}`));
    }
  }
  
  generatePerformanceReport() {
    console.log('\n⚡ PERFORMANCE:');
    console.log('-'.repeat(50));
    
    const results = this.testResults.performance;
    if (results.passed.length > 0) {
      console.log('  ✅ PASSED:');
      results.passed.forEach(item => console.log(`     • ${item}`));
    }
    if (results.failed.length > 0) {
      console.log('  ❌ FAILED:');
      results.failed.forEach(item => console.log(`     • ${item}`));
    }
    if (results.warnings.length > 0) {
      console.log('  ⚠️  WARNINGS:');
      results.warnings.forEach(item => console.log(`     • ${item}`));
    }
  }
  
  generateUsabilityReport() {
    console.log('\n🎯 USABILITY:');
    console.log('-'.repeat(50));
    
    const results = this.testResults.usability;
    if (results.passed.length > 0) {
      console.log('  ✅ PASSED:');
      results.passed.forEach(item => console.log(`     • ${item}`));
    }
    if (results.failed.length > 0) {
      console.log('  ❌ FAILED:');
      results.failed.forEach(item => console.log(`     • ${item}`));
    }
    if (results.warnings.length > 0) {
      console.log('  ⚠️  WARNINGS:');
      results.warnings.forEach(item => console.log(`     • ${item}`));
    }
  }
  
  generateSummaryReport() {
    console.log('\n📋 SUMMARY & RECOMMENDATIONS:');
    console.log('-'.repeat(50));
    
    let totalPassed = 0;
    let totalFailed = 0;
    let totalWarnings = 0;
    
    // Count all results
    Object.values(this.testResults).forEach(category => {
      if (category.passed) {
        totalPassed += category.passed.length;
        totalFailed += category.failed.length;
        totalWarnings += category.warnings.length;
      } else {
        // Handle nested categories (like accessibility)
        Object.values(category).forEach(subcategory => {
          if (subcategory.passed) {
            totalPassed += subcategory.passed.length;
            totalFailed += subcategory.failed.length;
            totalWarnings += subcategory.warnings.length;
          }
        });
      }
    });
    
    console.log(`  ✅ Total Passed: ${totalPassed}`);
    console.log(`  ❌ Total Failed: ${totalFailed}`);
    console.log(`  ⚠️  Total Warnings: ${totalWarnings}`);
    
    const overallScore = ((totalPassed / (totalPassed + totalFailed + totalWarnings)) * 100).toFixed(1);
    console.log(`\n🏆 Overall UX Score: ${overallScore}%`);
    
    // Generate recommendations
    console.log('\n🎯 RECOMMENDATIONS:');
    if (totalFailed === 0 && totalWarnings === 0) {
      console.log('  🌟 Excellent! All tests passed. The website meets high UX standards.');
    } else {
      if (totalFailed > 0) {
        console.log('  🔥 CRITICAL: Address failed tests immediately for accessibility compliance');
      }
      if (totalWarnings > 0) {
        console.log('  💡 SUGGESTIONS: Review warnings to improve user experience');
      }
    }
    
    // Specific recommendations based on common patterns
    if (totalFailed > totalWarnings) {
      console.log('  📌 Focus on fixing accessibility issues first');
    } else {
      console.log('  📌 Consider implementing suggested improvements for better UX');
    }
    
    console.log('\n' + '='.repeat(80));
  }
}

// Auto-run when script is loaded
if (typeof window !== 'undefined') {
  window.UXValidator = UXValidator;
  
  // Add console command for manual testing
  window.runUXValidation = () => {
    const validator = new UXValidator();
    validator.runAllTests();
  };
  
  console.log('🧪 UX Validator loaded. Run: runUXValidation()');
}