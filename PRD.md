# Product Requirements Document (PRD)
## Modern Resume Single Page Application

<!-- AGENT ORCHESTRATION INSTRUCTIONS
When implementing this project, use the following agent configuration:

PRIMARY WORKER AGENTS:
- `frontend-developer` - Lead HTML/CSS/Web Components implementation
- `javascript-pro` - Handle all JavaScript logic and Web Components architecture
- `ux-researcher` - Validate user experience and accessibility
- `project-manager` - Track progress and ensure all requirements are met

MANAGEMENT AGENTS:
- `agent-organizer` - Coordinate between worker agents
- `context-manager` - Maintain project context and requirements
- `knowledge-synthesizer` - Combine insights from all agents

COORDINATION:
- `multi-agent-coordinator` - Main orchestrator using `task-distributor`

CONSULTATIVE AGENTS (as needed):
- `ui-designer` - Visual design decisions
- `ux-researcher` - User experience validation
- `visual-storyteller` - Content presentation optimization

IMPORTANT: No need to commit early as we are on a branch. Continue until all tasks are complete, then show the final results.
-->

### 1. Executive Summary

Transform the existing portfolio website into a modern, standards-compliant HTML5 single-page application (SPA) that serves as both an interactive online resume and a printable PDF document. The application will use vanilla JavaScript (ES6+), CSS3, and Web Components for a clean, maintainable architecture.

### 2. Goals & Objectives

#### Primary Goals
- Create a professional, modern resume website that fits within 1-2 pages when printed
- Implement a clean, accessible design with dark/light theme support
- Build using modern web standards without framework dependencies
- Enable PDF export functionality for offline use
- Maintain all existing content while improving presentation
- **Replace all top-level HTML elements with custom web components while preserving exact UI/UX**

#### Success Metrics
- Page load time < 2 seconds
- Lighthouse score > 90 for all categories
- WCAG 2.1 AA compliance
- Print-friendly layout that fits standard A4/Letter paper
- Zero JavaScript framework dependencies
- **100% web component architecture for all major UI elements**

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
- **Web Components**: Custom elements for all top-level components

#### 4.2 Browser Support
- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

#### 4.3 Critical UI/UX Requirements
- **MUST maintain exact same appearance, hover effects, blur effects, scroll behavior, and popups**
- **Header profile animation**: Profile seamlessly moves to header when main profile scrolls out of view
- **No header expansion**: Header maintains fixed height, profile slides in from left
- **Social links repositioning**: Moves between nav links and download button when profile appears

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
- "18 years of total experience in Software Development"
- "Java / Kotlin / Dart / Javascript"
- Philosophy: "Believe in Open Source Software, Linux and Of Course Java!"

**Step 2**: Add expandable "Read More" functionality
- Detailed bio about standards-based approaches
- Jakarta EE, Eclipse Microprofile preference
- Web Components advocacy

#### 5.3 Skills & Technologies
**Step 1**: Design skill categories
- Backend: Java, Kotlin (6 years), Spring, Jakarta EE, Quarkus
- Frontend: JavaScript, Dart, Web Components
- Cloud: AWS (6 years - EKS, App Runner, Aurora V2), Terraform, Docker, Kubernetes
- Monitoring: Grafana, Prometheus
- Tools: Gradle, GitHub Actions, GitHub Copilot, JetBrains AI, Claude Code

**Step 2**: Create visual skill representation
- Skill tags with experience indicators
- Hover effects for additional details
- Compact grid layout for print

#### 5.4 Professional Experience
**Step 1**: Create experience cards (no timelines, just steps)
1. **SafeNow GmbH** - Backend Team Lead (Jan 2025 - Present)
   - Leading a team of 4 senior backend engineers
   - Designed and implemented currently running SafeNow Backend Architecture
   - Involved in every aspect of backend: infrastructure setup, database design, REST endpoints
   - Authentication, authorization, and performance optimizations
   - Creating and running load tests using Grafana K6
   - Integrations: Twilio Verify, SendGrid email, Firebase Messaging
   - Metrics, CDC with Debezium and Kafka
   - External event sending using enterprise integration patterns with Apache Camel
   - Maintaining low-code backend customer support tool using Retool
   - Experience with AI coding assistants: GitHub Copilot, JetBrains AI, Claude Code

2. **SafeNow GmbH** - Senior Developer (June 2020 - Dec 2024)
   - Backend architecture and microservice communication
   - AWS infrastructure with Terraform (EKS, App Runner, Aurora V2)
   - Tech: Java 17, Kotlin, Spring, Hasura GraphQL
   - Monitoring with Grafana and Prometheus

3. **IDnow GmbH** - Tech Lead/Senior Developer (Sept 2017 - June 2020)
   - Identity verification platform
   - Team leadership and technical direction

4. **Accenture** - Team Lead/Senior Developer (Jan 2017 - Sept 2017)
   - Banking portal for major German bank
   - Multiple locations: Frankfurt, Pune

5. **Talentica Software** - Senior Software Engineer (April 2014 - Aug 2014)

6. **Wipro Technologies** - Various roles (Nov 2007 - April 2014)
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

#### 5.7 Hobbies & Home Lab
**Full-fledged home lab setup and maintained personally using:**
- **Infrastructure**: Self-hosted bare metal server (32 GB RAM, 12-core processor), Raspberry Pi 5 with Radxa Penta SATA HAT (4 SSDs for RAID NAS), Hetzner cloud server
- **Security & Access**: 
  - [Pangolin](https://github.com/fosrl/pangolin) for Authentication/Authorization with Zero Trust Access
  - TLS termination with [Let's Encrypt](https://letsencrypt.org/)
- **CI/CD**: [Komodo](https://github.com/moghtech/komodo) for continuous integration and deployment using Docker Compose
- **Self-hosted services**: 
  - [Immich](https://immich.app/) for photo storage
  - Minecraft servers using [itzg/minecraft-server](https://hub.docker.com/r/itzg/minecraft-server) Docker image
  - [n8n](https://n8n.io/) automation server
  - [AdGuard Home](https://github.com/AdguardTeam/AdGuardHome) (dedicated Raspberry Pi 3)
  - [Ollama](https://ollama.com/) with [Open WebUI](https://github.com/open-webui/open-webui) for local AI
- **Hardware**: [Radxa Penta SATA HAT](https://radxa.com/products/accessories/penta-sata-hat/) for Raspberry Pi 5 NAS setup
- **Cloud Provider**: [Hetzner](https://www.hetzner.com/) for cloud server hosting Pangolin
- **Network & Monitoring**: Complete infrastructure monitoring and management

### 6. Web Components Architecture

#### 6.1 Complete Component Structure
```html
<body>
    <!-- Sticky Header with Dynamic Profile -->
    <site-header sticky="true" blur="true">
        <profile-card compact="true" hidden-initial="true"></profile-card>
        <nav-links>
            <nav-link href="#home">Home</nav-link>
            <nav-link href="blog.kulkarni.cloud" external="true">Blog</nav-link>
            <nav-link href="#meetups">Meetups</nav-link>
            <nav-link href="#projects">Personal Projects</nav-link>
        </nav-links>
        <social-contacts position="dynamic">
            <contact-link icon="linkedin" href="...">LinkedIn</contact-link>
            <contact-link icon="github" href="...">GitHub</contact-link>
            <contact-link icon="email" href="...">Email</contact-link>
            <contact-link icon="mastodon" href="...">Mastodon</contact-link>
            <contact-link icon="stackoverflow" href="...">Stack Overflow</contact-link>
        </social-contacts>
        <action-buttons>
            <theme-toggle mode="system"></theme-toggle>
            <download-button type="pdf">Download PDF</download-button>
        </action-buttons>
    </site-header>

    <!-- Main Profile Section -->
    <profile-section id="home">
        <profile-card 
            name="Guruprasad Kulkarni"
            title="Senior Java Developer"
            location="München, Germany"
            photo="/assets/images/profile.jpg"
            main="true">
        </profile-card>
    </profile-section>

    <!-- Professional Summary -->
    <professional-summary expandable="true">
        <summary-brief slot="brief">
            <summary-line>18 years of total experience in Software Development</summary-line>
            <summary-line>Java / Kotlin / Dart / Javascript</summary-line>
            <summary-line>Believe in Open Source Software, Linux and Of Course Java!</summary-line>
        </summary-brief>
        <summary-detail slot="detail">
            <!-- Extended bio content -->
        </summary-detail>
    </professional-summary>

    <!-- Technical Skills -->
    <technical-skills>
        <skills-category title="Backend Technologies">
            <skill-tag experience="18 Years" level="expert">Java</skill-tag>
            <skill-tag experience="6 Years" level="expert">Kotlin</skill-tag>
            <skill-tag experience="10 Years" level="expert">Spring</skill-tag>
            <skill-tag experience="5 Years" level="advanced">Jakarta EE</skill-tag>
            <skill-tag experience="3 Years" level="advanced">Quarkus</skill-tag>
        </skills-category>
        
        <skills-category title="Frontend Technologies">
            <skill-tag experience="8 Years" level="advanced">JavaScript</skill-tag>
            <skill-tag experience="5 Years" level="intermediate">Dart</skill-tag>
            <skill-tag experience="4 Years" level="advanced">Web Components</skill-tag>
        </skills-category>
        
        <skills-category title="Cloud & DevOps">
            <skill-tag experience="6 Years" level="expert">AWS (EKS, App Runner, Aurora V2)</skill-tag>
            <skill-tag experience="5 Years" level="advanced">Terraform</skill-tag>
            <skill-tag experience="7 Years" level="expert">Docker</skill-tag>
            <skill-tag experience="5 Years" level="advanced">Kubernetes</skill-tag>
        </skills-category>
        
        <skills-category title="Tools & Monitoring">
            <skill-tag experience="8 Years" level="expert">Gradle</skill-tag>
            <skill-tag experience="4 Years" level="advanced">GitHub Actions</skill-tag>
            <skill-tag experience="6 Years" level="expert">Grafana</skill-tag>
            <skill-tag experience="6 Years" level="expert">Prometheus</skill-tag>
        </skills-category>
        
        <skills-category title="AI Coding Assistants">
            <skill-tag level="advanced">GitHub Copilot</skill-tag>
            <skill-tag level="advanced">JetBrains AI</skill-tag>
            <skill-tag level="advanced">Claude Code</skill-tag>
        </skills-category>
    </technical-skills>

    <!-- Professional Experience -->
    <experience-section>
        <experience-card 
            company="SafeNow GmbH"
            position="Backend Team Lead"
            period="Jan 2025 - Present"
            location="München, Germany"
            expandable="true">
            <job-highlights slot="highlights">
                <highlight>Leading a team of 4 senior backend engineers</highlight>
                <highlight>Designed and implemented currently running SafeNow Backend Architecture</highlight>
                <highlight>Full-stack backend ownership: infrastructure to database design</highlight>
                <highlight>Performance optimization and load testing with Grafana K6</highlight>
            </job-highlights>
            <job-details slot="details">
                <detail>Involved in every aspect of backend including infrastructure setup, database design, REST endpoints, authentication, and authorization</detail>
                <detail>Performance optimizations and creating/running load tests using Grafana K6</detail>
                <detail>Integrations with Twilio Verify, SendGrid email, Firebase Messaging</detail>
                <detail>Implemented metrics, CDC with Debezium and Kafka</detail>
                <detail>External event sending using enterprise integration patterns with Apache Camel</detail>
                <detail>Maintaining low-code backend customer support tool using Retool</detail>
                <detail>Leveraging AI coding assistants: GitHub Copilot, JetBrains AI, Claude Code</detail>
            </job-details>
        </experience-card>

        <experience-card 
            company="SafeNow GmbH"
            position="Senior Developer"
            period="June 2020 - Dec 2024"
            location="München, Germany"
            expandable="true">
            <job-highlights slot="highlights">
                <highlight>Backend architecture and microservice communication</highlight>
                <highlight>AWS infrastructure with Terraform (EKS, App Runner, Aurora V2)</highlight>
                <highlight>Java 17, Kotlin, Spring, Hasura GraphQL</highlight>
                <highlight>Monitoring with Grafana and Prometheus</highlight>
            </job-highlights>
            <job-details slot="details">
                <!-- Detailed job description -->
            </job-details>
        </experience-card>

        <experience-card 
            company="IDnow GmbH"
            position="Tech Lead/Senior Developer"
            period="Sept 2017 - June 2020"
            location="München, Germany"
            expandable="true">
            <job-highlights slot="highlights">
                <highlight>Identity verification platform</highlight>
                <highlight>Team leadership and technical direction</highlight>
            </job-highlights>
            <job-details slot="details">
                <!-- Detailed job description -->
            </job-details>
        </experience-card>

        <experience-card 
            company="Accenture"
            position="Team Lead/Senior Developer"
            period="Jan 2017 - Sept 2017"
            location="Frankfurt/Pune"
            expandable="true">
            <job-highlights slot="highlights">
                <highlight>Banking portal for major German bank</highlight>
                <highlight>Multiple locations: Frankfurt, Pune</highlight>
            </job-highlights>
            <job-details slot="details">
                <!-- Detailed job description -->
            </job-details>
        </experience-card>

        <experience-card 
            company="Talentica Software"
            position="Senior Software Engineer"
            period="April 2014 - Aug 2014"
            location="Pune, India"
            expandable="true">
            <!-- Content -->
        </experience-card>

        <experience-card 
            company="Wipro Technologies"
            position="Various Roles"
            period="Nov 2007 - April 2014"
            location="Multiple"
            expandable="true">
            <job-highlights slot="highlights">
                <highlight>Insurance and financial systems</highlight>
                <highlight>International experience: UK, Ireland</highlight>
            </job-highlights>
            <job-details slot="details">
                <!-- Detailed job description -->
            </job-details>
        </experience-card>
    </experience-section>

    <!-- Projects & Presentations -->
    <projects-section id="projects">
        <project-showcase>
            <project-card 
                title="GitHub Project 1"
                type="opensource"
                github="url"
                demo="url">
                <project-description>
                    <!-- Description -->
                </project-description>
                <project-tech>
                    <tech-tag>Java</tech-tag>
                    <tech-tag>Spring</tech-tag>
                </project-tech>
            </project-card>
            <!-- More project cards -->
        </project-showcase>
    </projects-section>

    <!-- Meetup Presentations -->
    <meetups-section id="meetups">
        <presentation-card
            title="Quarkus Presentation"
            event="Munich Java User Group"
            date="2023"
            slides="url"
            source="github-url">
            <presentation-description>
                <!-- Description -->
            </presentation-description>
        </presentation-card>
        
        <presentation-card
            title="Java 9 Features"
            event="Tech Meetup Munich"
            date="2022"
            slides="url"
            source="github-url">
            <presentation-description>
                <!-- Description -->
            </presentation-description>
        </presentation-card>
    </meetups-section>

    <!-- Education -->
    <education-section>
        <education-card
            degree="Bachelor of Production Engineering"
            institution="V.I.T, Pune"
            year="2007">
        </education-card>
        
        <education-card
            degree="Diploma in Mechanical Engineering"
            institution="S.I.T, Pune"
            year="2004">
        </education-card>
    </education-section>

    <!-- Hobbies & Home Lab -->
    <hobbies-section>
        <hobby-card title="Home Lab & Self-Hosting">
            <lab-infrastructure slot="infrastructure">
                <infrastructure-item type="server">Self-hosted bare metal server (32 GB RAM, 12-core processor)</infrastructure-item>
                <infrastructure-item type="nas" link="https://radxa.com/products/accessories/penta-sata-hat/">Raspberry Pi 5 with Radxa Penta SATA HAT (4 SSDs RAID NAS)</infrastructure-item>
                <infrastructure-item type="cloud" link="https://www.hetzner.com/">Hetzner cloud server running Pangolin</infrastructure-item>
                <infrastructure-item type="network">Raspberry Pi 3 dedicated for AdGuard Home</infrastructure-item>
            </lab-infrastructure>
            
            <lab-services slot="services">
                <service-category title="Security & Access">
                    <service-item link="https://github.com/fosrl/pangolin">Pangolin for Authentication/Authorization with Zero Trust Access</service-item>
                    <service-item link="https://letsencrypt.org/">TLS termination with Let's Encrypt</service-item>
                </service-category>
                
                <service-category title="CI/CD & Automation">
                    <service-item link="https://github.com/moghtech/komodo">Komodo for CI/CD using Docker Compose</service-item>
                    <service-item link="https://n8n.io/">n8n automation server</service-item>
                </service-category>
                
                <service-category title="Self-Hosted Applications">
                    <service-item link="https://immich.app/">Immich for photo storage</service-item>
                    <service-item link="https://hub.docker.com/r/itzg/minecraft-server">Minecraft servers (itzg/minecraft-server:latest)</service-item>
                    <service-item link="https://ollama.com/">Ollama with Open WebUI for local AI</service-item>
                    <service-item link="https://github.com/AdguardTeam/AdGuardHome">AdGuard Home for network-wide ad blocking</service-item>
                </service-category>
            </lab-services>
        </hobby-card>
    </hobbies-section>
</body>
```

#### 6.2 Component Behavior Specifications

##### Profile Animation Behavior
- **Main profile visibility detection**: Use Intersection Observer API
- **Header profile state**: Hidden initially with `opacity: 0` and `transform: translateX(-20px)`
- **Transition trigger**: When main profile scrolls out of view (threshold: 0.1)
- **Animation**: Profile slides in from left with fade-in effect (300ms ease)
- **No header height change**: Header maintains fixed height throughout transition

##### Social Contacts Dynamic Positioning
- **Initial position**: Right side of navigation links
- **Profile visible state**: Shifts right by profile width + spacing
- **Transition**: Smooth 300ms transform animation
- **Mobile behavior**: Stacks vertically in hamburger menu

##### Component Attributes & Slots

| Component | Attributes | Slots | Behavior |
|-----------|------------|-------|----------|
| `<site-header>` | `sticky`, `blur` | `default` | Sticky positioning with backdrop blur |
| `<profile-card>` | `name`, `title`, `location`, `photo`, `compact`, `main`, `hidden-initial` | - | Dual instance (main + header) with visibility toggle |
| `<nav-links>` | `position` | `default` | Horizontal navigation with smooth scroll |
| `<nav-link>` | `href`, `external`, `smooth-scroll` | `default` | Individual navigation item |
| `<social-contacts>` | `position` | `default` | Dynamic positioning based on profile state |
| `<contact-link>` | `icon`, `href`, `type` | `default` | Social media link with icon |
| `<theme-toggle>` | `mode` | - | Dark/light theme switcher |
| `<download-button>` | `type`, `filename`, `action` | `default` | PDF export functionality with new window option |
| `<professional-summary>` | `expandable` | `brief`, `detail` | Expandable content with smooth animation |
| `<technical-skills>` | - | `default` | Skills container |
| `<skills-category>` | `title` | `default` | Category grouping |
| `<skill-tag>` | `experience`, `level` | `default` | Individual skill with hover effect |
| `<experience-section>` | - | `default` | Experience container |
| `<experience-card>` | `company`, `position`, `period`, `location`, `expandable` | `highlights`, `details` | Job position card with expansion |
| `<projects-section>` | - | `default` | Projects container |
| `<project-card>` | `title`, `type`, `github`, `demo` | `description`, `tech` | Project showcase card |
| `<presentation-card>` | `title`, `event`, `date`, `slides`, `source` | `description` | Meetup presentation card |
| `<education-card>` | `degree`, `institution`, `year` | - | Education entry |

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
- **Profile slide-in animation when main profile out of view**

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
- **Seamless profile transition to header**
- **Dynamic social links repositioning**

#### 8.4 PDF Export
- Print-optimized layout
- Page break controls
- Expanded content for complete information
- Clean, professional formatting
- **Downloadable PDF Version**: 
  - Dedicated "Download PDF" button that opens a new print-optimized webpage
  - Separate route/page specifically formatted for printing
  - Clean, minimal styling optimized for PDF generation
  - All sections expanded by default in print view
  - Proper page breaks between sections
  - Headers and footers for professional appearance
  - A4/Letter paper size optimization
  - Browser print dialog triggered automatically or manual print option

### 9. File Structure
```
/
├── index.html              // Main HTML file
├── print.html              // Dedicated print-optimized version
├── assets/
│   ├── styles/
│   │   ├── main.css       // Core styles
│   │   ├── components.css // Component styles
│   │   ├── themes.css     // Theme variables
│   │   └── print.css      // Print-specific styles
│   ├── scripts/
│   │   ├── main.js        // App initialization
│   │   ├── print.js       // Print page functionality
│   │   └── components/    // Web component files
│   │       ├── site-header.js
│   │       ├── profile-card.js
│   │       ├── nav-links.js
│   │       ├── social-contacts.js
│   │       ├── professional-summary.js
│   │       ├── technical-skills.js
│   │       ├── experience-card.js
│   │       ├── project-card.js
│   │       └── [other components].js
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
3. **Profile Animation System** - Implement dual profile with transition logic
4. **Content Integration** - Migrate existing data
5. **Theme Implementation** - Dark/light mode system
6. **Print Optimization** - PDF-ready styling
7. **Printable Version Feature** - Implement dedicated print view page
8. **Polish & Testing** - Animations, accessibility, performance

### 11. Critical Implementation Notes

#### 11.1 Profile Transition Implementation
```javascript
// Pseudocode for profile transition
class SiteHeader extends HTMLElement {
    connectedCallback() {
        // Observe main profile visibility
        const mainProfile = document.querySelector('profile-section profile-card[main="true"]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.classList.remove('profile-visible');
                } else {
                    this.classList.add('profile-visible');
                }
            });
        }, { threshold: 0.1 });
        observer.observe(mainProfile);
    }
}
```

#### 11.3 Printable PDF Version Implementation
```javascript
// Download button functionality
class DownloadButton extends HTMLElement {
    connectedCallback() {
        this.addEventListener('click', () => {
            if (this.getAttribute('action') === 'new-window') {
                // Open print-optimized version in new window
                const printWindow = window.open('/print.html', '_blank');
                printWindow.onload = () => {
                    // Optional: Auto-trigger print dialog
                    if (this.getAttribute('auto-print') === 'true') {
                        printWindow.print();
                    }
                };
            }
        });
    }
}

// Print page specific styles
/* print.html specific CSS */
@media screen {
    body {
        max-width: 210mm; /* A4 width */
        margin: 0 auto;
        padding: 20mm;
        background: white;
    }
    
    /* All sections expanded by default */
    .expandable-content {
        display: block !important;
    }
    
    /* Hide interactive elements */
    .theme-toggle,
    .expand-button {
        display: none;
    }
}

@media print {
    /* Page break controls */
    .experience-card,
    .project-card {
        page-break-inside: avoid;
    }
    
    section {
        page-break-after: auto;
    }
    
    /* Professional headers/footers */
    @page {
        margin: 15mm;
        @top-center {
            content: "Guruprasad Kulkarni - Senior Java Developer";
        }
        @bottom-center {
            content: counter(page);
        }
    }
}
```

### 12. Success Criteria

✅ Clean, modern design that impresses recruiters  
✅ Fully functional without JavaScript (progressive enhancement)  
✅ Perfect print layout within 2 pages  
✅ Lightning-fast load times  
✅ Easy content updates through data files  
✅ Accessible to all users  
✅ Works offline after first visit  
✅ **All top-level components are custom web components**  
✅ **Exact same UI/UX preserved with CSS**  
✅ **Seamless profile-to-header transition**  
✅ **No header expansion or text movement**  
✅ **Dynamic social links positioning**  
✅ **Dedicated printable version with optimized PDF export**