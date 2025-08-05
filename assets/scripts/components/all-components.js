/**
 * All Components Import
 * Loads all component files for the resume application
 */

// Load all component scripts
(function() {
  const componentFiles = [
    'base-component.js',
    'theme-switcher.js', 
    'resume-app.js',
    'skills-components.js',
    'experience-components.js'
  ];
  
  const basePath = 'assets/scripts/components/';
  
  componentFiles.forEach(file => {
    const script = document.createElement('script');
    script.src = basePath + file;
    script.async = false; // Ensure they load in order
    document.head.appendChild(script);
  });
})();