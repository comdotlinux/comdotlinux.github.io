/**
 * Minimal Resume Data Configuration
 * Only contains data actually used by components (PDF generation, email updates)
 * Main resume content is now maintained directly in HTML
 */

const RESUME_DATA = {
  // Personal Information - Used by PDF generation
  personal: {
    name: "Guruprasad Kulkarni",
    title: "Senior Java Developer",
    location: "München, Germany",
    email: "guruprasad.kulkarni@example.com"
  },
  
  // Contact Information - Used by print.html for email updates
  contacts: [
    {
      type: "email",
      label: "Email",
      url: "mailto:guruprasad.kulkarni@example.com"
    }
  ]
};

// Utility functions (kept minimal for compatibility)
const ResumeDataUtils = {
  /**
   * Get total years of experience
   */
  getTotalExperience() {
    return 18; // Updated total experience
  }
};

// Make data available globally
window.RESUME_DATA = RESUME_DATA;
window.ResumeDataUtils = ResumeDataUtils;

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { RESUME_DATA, ResumeDataUtils };
}