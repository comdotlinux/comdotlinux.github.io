# Product Requirements Document (PRD)
## Modern Resume Single Page Application

### 1. Executive Summary

Transform the existing portfolio website into a modern, standards-compliant HTML5 single-page application (SPA) that serves as both an interactive online resume and a printable PDF document. The application will use vanilla JavaScript (ES6+), CSS3, and Web Components for a clean, maintainable architecture.

### 2. Goals & Objectives

#### Primary Goals
- Create a professional, modern resume website that fits within 1-2 pages when printed
- Implement a clean, accessible design with dark/light theme support
- Build using modern web standards without framework dependencies
- Enable PDF export functionality for offline use
- Maintain all existing content while improving presentation

#### Success Metrics
- Page load time < 2 seconds
- Lighthouse score > 90 for all categories
- WCAG 2.1 AA compliance
- Print-friendly layout that fits standard A4/Letter paper
- Zero JavaScript framework dependencies

### 3. Navigation Requirements

The top navigation bar must include these existing links:
- **Home** - Smooth scroll to top/header section
- **Blog** - External link to blog.kulkarni.cloud
- **Meetups** - Section with presentations (Quarkus, Java 9)
- **Personal Projects** - Section showcasing GitHub projects

### 4. Technical Requirements

#### 4.1 Technology Stack
- **HTML5**: Semantic markup with proper ARIA labels
- **CSS3**: Modern CSS with CSS Grid, Flexbox, and Custom Properties
- **JavaScript ES6+**: Vanilla JS with Web Components
- **No frameworks**: Pure web standards implementation
- **Build Tools**: None required for production

#### 4.2 Browser Support
- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

### 5. Content Sections (Implementation Steps)

#### 5.1 Header Section
**Step 1**: Create header with personal information
- Name: Guruprasad Kulkarni
- Title: Senior Java Developer
- Location: München, Germany
- Profile photo (circular, optimized)

**Step 2**: Add contact information bar
- Email, GitHub, LinkedIn, Mastodon, Stack Overflow
- Theme toggle button

#### 5.2 Professional Summary
**Step 1**: Create concise summary section
- "12 years Programming, 2 Years functional Testing"
- "Java / Kotlin / Dart / Javascript"
- Philosophy: "Believe in Open Source Software, Linux and Of Course Java!"

**Step 2**: Add expandable "Read More" functionality
- Detailed bio about standards-based approaches
- Jakarta EE, Eclipse Microprofile preference
- Web Components advocacy

#### 5.3 Skills & Technologies
**Step 1**: Design skill categories
- Backend: Java, Kotlin, Spring, Jakarta EE, Quarkus
- Frontend: JavaScript, Dart, Web Components
- Cloud: AWS, Terraform, Docker, Kubernetes
- Tools: Gradle, GitHub Actions, Prometheus, Grafana

**Step 2**: Create visual skill representation
- Skill tags with experience indicators
- Hover effects for additional details
- Compact grid layout for print

#### 5.4 Professional Experience
**Step 1**: Create experience cards (no timelines, just steps)
1. **SafeNow GmbH** - Senior Developer (June 2020 - Present)
   - Backend architecture and microservice communication
   - AWS infrastructure with Terraform
   - Tech: Java 17, Kotlin, Spring, Hasura GraphQL

2. **IDnow GmbH** - Tech Lead/Senior Developer (Sept 2017 - June 2020)
   - Identity verification platform
   - Team leadership and technical direction

3. **Accenture** - Team Lead/Senior Developer (Jan 2017 - Sept 2017)
   - Banking portal for major German bank
   - Multiple locations: Frankfurt, Pune

4. **Talentica Software** - Senior Software Engineer (April 2014 - Aug 2014)

5. **Wipro Technologies** - Various roles (Nov 2007 - April 2014)
   - Insurance and financial systems
   - International experience: UK, Ireland

**Step 2**: Add "Show More" for detailed descriptions
- Key achievements and technologies
- Quantifiable results where available

#### 5.5 Projects & Presentations
**Step 1**: Create project showcase
- GitHub projects with descriptions
- Personal tools and utilities
- Open source contributions

**Step 2**: Include meetup presentations
- Quarkus presentation with source code
- Java 9 presentation with source code
- Links to slides and demonstrations

#### 5.6 Education
- Bachelor of Production Engineering - V.I.T, Pune
- Diploma in Mechanical Engineering - S.I.T, Pune

### 6. Web Components Architecture

```
<resume-app>
  ├── <nav-header>           // Navigation with existing links
  ├── <theme-switcher>       // Dark/light toggle
  ├── <resume-header>        // Personal info and photo
  ├── <contact-bar>          // Social links with icons
  ├── <professional-summary> // Expandable bio section
  ├── <skills-grid>          // Categorized skills
  ├── <experience-section>   // Job history cards
  │   └── <experience-card>  // Individual position
  ├── <projects-showcase>    // GitHub projects + presentations
  └── <education-section>    // Education information
```

### 7. Design System

#### 7.1 Color Palette
**Light Theme**
- Background: #FFFFFF
- Navigation: rgba(255, 255, 255, 0.95)
- Text: #1A1A1A
- Primary: #2563EB (Professional blue)
- Secondary: #64748B (Slate gray)
- Accent: #10B981 (Success green)
- Borders: #E5E7EB

**Dark Theme**
- Background: #0F172A (Dark slate)
- Navigation: rgba(15, 23, 42, 0.95)
- Text: #F1F5F9 (Light slate)
- Primary: #3B82F6 (Bright blue)
- Secondary: #94A3B8 (Light slate)
- Accent: #34D399 (Emerald)
- Borders: #334155

#### 7.2 Typography
- Headings: System font stack (-apple-system, BlinkMacSystemFont, "Segoe UI")
- Body: Same system stack for consistency
- Monospace: "SF Mono", Monaco, Consolas for code
- Print sizes: Optimized for A4/Letter readability

#### 7.3 Spacing System
- Base unit: 8px
- Scale: 8, 16, 24, 32, 48, 64px
- Print margins: 0.75in all sides

### 8. Key Features

#### 8.1 Navigation
- Sticky header with blur background
- Smooth scroll to sections
- External link indicators for blog
- Active section highlighting

#### 8.2 Theme System
- System preference detection
- localStorage persistence
- Smooth transitions between themes
- Print optimization (force light theme)

#### 8.3 Interactive Elements
- Expandable summary and job details
- Skill hover effects
- Smooth animations (respecting prefers-reduced-motion)
- Keyboard navigation support

#### 8.4 PDF Export
- Print-optimized layout
- Page break controls
- Expanded content for complete information
- Clean, professional formatting

### 9. File Structure
```
/
├── index.html              // Main HTML file
├── assets/
│   ├── styles/
│   │   ├── main.css       // Core styles
│   │   ├── components.css // Component styles
│   │   ├── themes.css     // Theme variables
│   │   └── print.css      // Print-specific styles
│   ├── scripts/
│   │   ├── main.js        // App initialization
│   │   └── components/    // Web component files
│   ├── images/
│   │   └── profile.jpg    // Optimized profile photo
│   └── data/
│       └── resume-data.js // Centralized content data
├── PRD.md                 // This document
└── CLAUDE.md             // Development guide
```

### 10. Implementation Steps

1. **Foundation Setup** - HTML structure, CSS architecture
2. **Component Development** - Web components for each section  
3. **Content Integration** - Migrate existing data
4. **Theme Implementation** - Dark/light mode system
5. **Print Optimization** - PDF-ready styling
6. **Polish & Testing** - Animations, accessibility, performance

### 11. Success Criteria

✅ Clean, modern design that impresses recruiters  
✅ Fully functional without JavaScript (progressive enhancement)  
✅ Perfect print layout within 2 pages  
✅ Lightning-fast load times  
✅ Easy content updates through data files  
✅ Accessible to all users  
✅ Works offline after first visit