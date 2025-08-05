/**
 * Resume Data Configuration
 * Centralized data for the resume application
 */

const RESUME_DATA = {
  // Personal Information
  personal: {
    name: "Guruprasad Kulkarni",
    title: "Senior Java Developer",
    location: "München, Germany",
    tagline: "Java / Kotlin / Dart / Javascript",
    email: "guruprasad.kulkarni@example.com", // Update with actual email
    profileImage: "assets/images/profile.jpg",
    
    // Bio and summary
    summary: {
      brief: "12 years Programming, 2 Years functional Testing and a bit of Non Functional Testing. Believe in Open Source Software, Linux and Of Course Java! Science and Technology Enthusiast.",
      detailed: [
        "Developer by profession who loves Java but is interested in other technologies. I prefer standards-based approaches and advocate for Jakarta EE with Eclipse Microprofile. I'm particularly passionate about Web Components and modern web standards.",
        "My experience spans from traditional enterprise applications to modern cloud-native microservices, with a strong focus on clean code, testing, and maintainable architectures."
      ]
    }
  },
  
  // Contact Information
  contacts: [
    {
      type: "email",
      label: "Email",
      url: "mailto:guruprasad.kulkarni@example.com",
      icon: "📧",
      username: null
    },
    {
      type: "github",
      label: "GitHub",
      url: "https://github.com/comdotlinux",
      icon: "🐙",
      username: "comdotlinux"
    },
    {
      type: "linkedin",
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/comdotlinux/",
      icon: "💼",
      username: "comdotlinux"
    },
    {
      type: "mastodon",
      label: "Mastodon",
      url: "https://mastodon.social/@comdotlinux",
      icon: "🐘",
      username: "@comdotlinux"
    },
    {
      type: "stackoverflow",
      label: "Stack Overflow",
      url: "https://stackoverflow.com/users/3331412/comdotlinux",
      icon: "💬",
      username: "comdotlinux"
    }
  ],
  
  // Skills organized by category
  skills: {
    "Backend Technologies": [
      { name: "Java", level: "expert", years: 12 },
      { name: "Kotlin", level: "expert", years: 5 },
      { name: "Spring Framework", level: "expert", years: 8 },
      { name: "Jakarta EE", level: "advanced", years: 4 },
      { name: "Quarkus", level: "advanced", years: 3 },
      { name: "Micronaut", level: "intermediate", years: 2 },
      { name: "Helidon", level: "intermediate", years: 2 }
    ],
    
    "Frontend & Mobile": [
      { name: "JavaScript", level: "advanced", years: 6 },
      { name: "Dart", level: "intermediate", years: 3 },
      { name: "Flutter", level: "intermediate", years: 3 },
      { name: "Web Components", level: "advanced", years: 5 },
      { name: "HTML/CSS", level: "advanced", years: 8 }
    ],
    
    "Cloud & DevOps": [
      { name: "AWS", level: "expert", years: 4 },
      { name: "Terraform", level: "expert", years: 4 },
      { name: "Docker", level: "expert", years: 6 },
      { name: "Kubernetes", level: "advanced", years: 3 },
      { name: "Amazon EKS", level: "advanced", years: 3 },
      { name: "TestContainers", level: "intermediate", years: 2 }
    ],
    
    "Tools & Platforms": [
      { name: "Gradle", level: "expert", years: 8 },
      { name: "GitHub Actions", level: "expert", years: 5 },
      { name: "Hasura GraphQL", level: "advanced", years: 4 },
      { name: "Prometheus", level: "advanced", years: 3 },
      { name: "Grafana", level: "advanced", years: 3 },
      { name: "Apollo GraphQL", level: "intermediate", years: 2 }
    ]
  },
  
  // Professional Experience
  experience: [
    {
      title: "Senior Developer",
      company: "SafeNow GmbH",
      companyUrl: "https://safenow.app",
      duration: "June 2020 - Present",
      location: "München, Germany",
      current: true,
      summary: "Leading backend architecture and microservice development for safety-focused platform.",
      achievements: [
        "Designed and implemented backend architecture with microservice communication patterns",
        "Set up complete AWS infrastructure using Terraform (EKS, RDS, CloudFront, S3, App Runner)",
        "Built CI/CD pipelines with GitHub Actions and Codefresh for automated deployments",
        "Integrated monitoring solutions with Prometheus, Grafana, and Loki for comprehensive observability",
        "Implemented secure secret management using AWS Secrets Manager"
      ],
      technologies: ["Java 17", "Kotlin", "Spring", "Hasura GraphQL", "PostgreSQL", "Flutter/Dart", "AWS", "Terraform"]
    },
    
    {
      title: "Tech Lead / Senior Java Developer",
      company: "IDnow GmbH",
      companyUrl: "https://idnow.eu",
      duration: "Sept 2017 - June 2020",
      location: "München, Germany",
      current: false,
      summary: "Led development of identity verification platform and mentored development teams.",
      achievements: [
        "Tech Lead for Autoident Product Team (Jan 2019 - June 2020)",
        "Senior Java Developer role (Sept 2017 - Dec 2018)",
        "Developed scalable identity verification solutions",
        "Mentored junior developers and established coding standards",
        "Collaborated with product teams on feature development and technical strategy"
      ],
      technologies: ["Java", "Spring Boot", "Microservices", "Docker", "Kubernetes"]
    },
    
    {
      title: "Team Lead / Senior Developer",
      company: "Accenture",
      companyUrl: "https://accenture.com",
      duration: "Jan 2017 - Sept 2017",
      location: "Frankfurt & Pune",
      current: false,
      summary: "Developed banking portal for Germany's second-largest bank with international team coordination.",
      achievements: [],
      technologies: ["Java", "Spring", "Banking Systems"]
    },
    
    {
      title: "Senior Software Engineer",
      company: "Talentica Software",
      companyUrl: "https://talentica.com",
      duration: "April 2014 - Aug 2014",
      location: "Pune",
      current: false,
      summary: "Software development for enterprise clients.",
      achievements: [],
      technologies: ["Java", "Enterprise Applications"]
    },
    
    {
      title: "Various Development Roles",
      company: "Wipro Technologies",
      companyUrl: "https://wipro.com",
      duration: "Nov 2007 - April 2014",
      location: "Pune, York (UK), Dublin (Ireland)",
      current: false,
      summary: "Insurance and financial systems development with international assignments.",
      achievements: [],
      technologies: ["Java", "Insurance Systems", "Financial Applications"]
    }
  ],
  
  // Projects and Presentations
  projects: {
    presentations: [
      {
        name: "Quarkus Framework",
        description: "Comprehensive presentation on Quarkus cloud-native development",
        type: "presentation",
        links: [
          { label: "View Slides", url: "#" },
          { label: "Source Code", url: "#" }
        ]
      },
      {
        name: "Java 9 Features",
        description: "Deep dive into Java 9 modules and new language features",
        type: "presentation",
        links: [
          { label: "View Slides", url: "#" },
          { label: "Source Code", url: "#" }
        ]
      }
    ],
    
    openSource: [
      {
        name: "Design Patterns",
        description: "Java implementation of common design patterns with examples",
        type: "opensource",
        links: [
          { label: "GitHub", url: "https://github.com/comdotlinux/design-patterns" }
        ]
      },
      {
        name: "Java Exercises",
        description: "Collection of Java programming exercises and solutions",
        type: "opensource",
        links: [
          { label: "GitHub", url: "https://github.com/comdotlinux/java-exercises" }
        ]
      },
      {
        name: "GitHub Release Tool",
        description: "Utility for automating GitHub release management",
        type: "opensource",
        links: [
          { label: "GitHub", url: "https://github.com/comdotlinux/github-release-tool" }
        ]
      },
      {
        name: "Simple Java ETL",
        description: "Lightweight ETL framework for Java SE applications",
        type: "opensource",
        links: [
          { label: "GitHub", url: "https://github.com/comdotlinux/simple-java-etl" }
        ]
      }
    ]
  },
  
  // Education
  education: [
    {
      degree: "Bachelor of Production Engineering",
      institution: "V.I.T, Pune, Maharashtra",
      year: null,
      description: null
    },
    {
      degree: "Diploma in Mechanical Engineering",
      institution: "S.I.T, Pune, Maharashtra",
      year: null,
      description: null
    }
  ],
  
  // Navigation Links
  navigation: [
    { label: "Home", href: "#home", external: false },
    { label: "Blog", href: "https://blog.kulkarni.cloud", external: true },
    { label: "Meetups", href: "#meetups", external: false },
    { label: "Personal Projects", href: "#projects", external: false }
  ],
  
  // Meta Information
  meta: {
    siteName: "Guruprasad Kulkarni - Resume",
    siteUrl: "https://bio.kulkarni.cloud",
    blogUrl: "https://blog.kulkarni.cloud",
    lastUpdated: "2024-01-15",
    version: "2.0.0"
  }
};

// Utility functions for working with resume data
const ResumeDataUtils = {
  
  /**
   * Get all skills as a flat array
   */
  getAllSkills() {
    const allSkills = [];
    Object.values(RESUME_DATA.skills).forEach(categorySkills => {
      allSkills.push(...categorySkills);
    });
    return allSkills;
  },
  
  /**
   * Get skills by level
   */
  getSkillsByLevel(level) {
    return this.getAllSkills().filter(skill => skill.level === level);
  },
  
  /**
   * Get current job
   */
  getCurrentJob() {
    return RESUME_DATA.experience.find(job => job.current);
  },
  
  /**
   * Get total years of experience
   */
  getTotalExperience() {
    // Calculate from start date of first job to now
    const firstJob = RESUME_DATA.experience[RESUME_DATA.experience.length - 1];
    const startYear = 2007; // Based on Wipro start date
    const currentYear = new Date().getFullYear();
    return currentYear - startYear;
  },
  
  /**
   * Get skills for a specific technology
   */
  getSkillByName(name) {
    return this.getAllSkills().find(skill => 
      skill.name.toLowerCase() === name.toLowerCase()
    );
  },
  
  /**
   * Get all external links
   */
  getExternalLinks() {
    const links = [];
    
    // Add contact links
    RESUME_DATA.contacts.forEach(contact => {
      if (contact.url.startsWith('http')) {
        links.push({
          label: contact.label,
          url: contact.url,
          type: 'contact'
        });
      }
    });
    
    // Add project links
    Object.values(RESUME_DATA.projects).flat().forEach(project => {
      project.links.forEach(link => {
        if (link.url.startsWith('http')) {
          links.push({
            label: `${project.name} - ${link.label}`,
            url: link.url,
            type: 'project'
          });
        }
      });
    });
    
    return links;
  }
};

// Make data available globally
window.RESUME_DATA = RESUME_DATA;
window.ResumeDataUtils = ResumeDataUtils;

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { RESUME_DATA, ResumeDataUtils };
}