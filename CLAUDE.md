# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Guruprasad Kulkarni, hosted on GitHub Pages at `bio.kulkarni.cloud`. It's a modern static HTML site built with Web Components and vanilla JavaScript.

## Technology Stack

- **Frontend**: Pure HTML5, CSS3, and Vanilla JavaScript ES6+
- **Architecture**: Web Components with custom elements
- **CSS**: Native CSS with custom properties (no preprocessing)
- **Icons**: Unicode emoji icons
- **PDF Generation**: html2pdf.js library for client-side PDF export
- **Development**: browser-sync for live reload
- **Hosting**: GitHub Pages with custom domain `bio.kulkarni.cloud`
- **Dependencies**: Zero build tools, no external frameworks

## Development Commands

### Local Development Server
```bash
./dev-server.sh
```
This starts a browser-sync server with live reload on file changes.

### Development Workflow
The website uses modern web standards with no build process:
1. Run `./dev-server.sh` to start browser-sync development server
2. Edit HTML, CSS, or JavaScript files directly
3. Changes auto-reload in the browser at http://localhost:3002
4. All styles use CSS custom properties for theming
5. Web Components provide modular architecture

### Testing the Website
- Open http://localhost:3002 when browser-sync is running
- Test theme switching (light/dark mode)
- Verify print layout with Ctrl+P (or Cmd+P)
- Check responsive design on different screen sizes

## Project Structure

- `/assets/` - Static assets organized by type
  - `/styles/` - CSS files with modern architecture
    - `main.css` - Core layout and typography
    - `themes.css` - Light/dark theme definitions with CSS custom properties
    - `components.css` - Component-specific styling
    - `mobile.css` - Mobile/tablet responsive overrides and media queries
    - `print.css` - PDF/print optimized styles
    - `layout.css`, `unified-layout.css` - Alternative layout options
    - `*-resume.css` - Different resume style variations
  - `/scripts/` - JavaScript architecture
    - `main.js` - Application initialization and global functionality
    - `/components/` - Web Component definitions
      - `base-component.js` - Abstract base class for all components
      - `theme-switcher.js` - Theme toggle functionality
      - `resume-app.js` - Main application container
      - `*-components.js` - Specific component implementations
  - `/images/` - Assets (profile.jpg, favicons)
  - `/data/` - Centralized data management
    - `resume-data.js` - All resume content in structured format
- `index.html` - Single-page application with semantic HTML
- Alternative pages: `index-simple.html`, `print.html`, `browser-ux-test.html`
- `dev-server.sh` - Browser-sync development server
- Test files: `test-*.html`, `ux-validation-test.js`
- Documentation: `CLAUDE.md`, `PRD.md`, `UX_*.md`
- Configuration: `CNAME`, favicon files

## Key Files

- `index.html` - Main single-page application with Web Components
- `assets/scripts/main.js` - Application class with PDF generation and global event handling
- `assets/scripts/components/base-component.js` - Abstract base class with utility methods
- `assets/data/resume-data.js` - Centralized data store with utility functions
- `assets/styles/main.css` - Core layout with CSS Grid and responsive design
- `assets/styles/themes.css` - Theme system using CSS custom properties
- `dev-server.sh` - Simple browser-sync server with Chrome browser launch

## Architecture

- **Web Components**: Custom elements extending HTMLElement with BaseComponent class
- **Component Lifecycle**: connectedCallback, disconnectedCallback, attributeChangedCallback patterns
- **Event Management**: Custom event system with debouncing and throttling utilities
- **State Management**: Theme persistence via localStorage, reactive UI updates
- **CSS Architecture**: Custom properties for theming, CSS Grid for layout
- **Responsive Design**: Mobile-first approach with CSS Grid breakpoints
- **Accessibility**: Skip links, ARIA labels, keyboard navigation, screen reader support
- **Performance**: Intersection observers, debounced scroll/resize handlers, minimal DOM manipulation
- **PDF Generation**: Client-side PDF creation with isolated rendering context

## Deployment

The site automatically deploys via GitHub Pages when changes are pushed to the main branch. The custom domain `bio.kulkarni.cloud` is configured via the CNAME file.

## PDF Generation Requirements

The website includes a PDF download feature that must generate a traditional resume format matching the reference screenshots provided. Key requirements:

### PDF Layout Specifications
- **Font**: Times New Roman, 11pt body text, 22pt header
- **Colors**: Blue headers (#4472C4), black text on white background
- **Margins**: 0.5 inch on all sides
- **Format**: Single-page resume layout (current implementation)
- **File Naming**: `Guruprasad_Kulkarni_Resume_DD-MON-YYYY_HHMM.pdf`

### PDF Content Structure
1. **Header**: Centered name (blue, large), contact information below
2. **PROFILE**: Two-column layout with bold left column, regular right column
3. **SKILLS**: Bullet-point list with proper indentation
4. **EXPERIENCE**: Job entries with company, role, dates, description, and bullet points
5. **EDUCATION**: Centered institutional information

### Technical Implementation
- Uses html2pdf.js CDN library loaded in index.html
- Creates isolated HTML content without Web Components
- Two PDF generation methods: simple HTML string approach and complex DOM cloning
- Fallback to browser print dialog if PDF generation fails
- PDF button with loading states and user feedback
- Automatic cleanup of temporary DOM elements

### PDF Generation Process
1. PDF button click triggers `downloadPDF()` in main.js:462
2. Primary method uses `generateSimplePDF()` creating clean HTML string
3. Creates temporary iframe with traditional resume styling
4. html2pdf converts iframe content to PDF with A4 format
5. Automatic cleanup and button state reset
6. User confirmation for fallback to browser print on errors

## Development Notes

- **Zero Dependencies**: No npm, webpack, or build process required
- **Web Standards**: Uses native Web Components API, CSS custom properties, ES6+ modules
- **Data-Driven**: All content centralized in `resume-data.js` with utility functions
- **Theme System**: CSS custom properties enable instant light/dark mode switching
- **Component Architecture**: BaseComponent class provides common functionality (observers, utilities, lifecycle)
- **Event System**: Custom events for component communication, debounced handlers for performance
- **Accessibility**: Skip links, ARIA attributes, keyboard navigation, screen reader optimization
- **Responsive**: CSS Grid layout with mobile-first breakpoints
- **PDF Export**: Client-side generation with html2pdf.js, fallback to print dialog
- **Performance**: Intersection observers, minimal DOM manipulation, lazy loading patterns

## Responsive Design Guidelines

### Critical Layout Behavior
- **Desktop (>1024px)**: Side-by-side layout with Experience on left, Skills on right sidebar
- **Mobile/Tablet (≤1024px)**: Stacked layout with Experience first, then Skills below

### Navigation Header Behavior
- **Desktop**: Shows brand text ("Guruprasad Kulkarni") on initial load, switches to profile + social links when scrolled
- **Mobile/Tablet (≤1024px)**: Always shows profile image + info + social links (scrolled state style)
- **Mobile/Tablet (≤1024px)**: Main header profile section and contact links are HIDDEN

### Mobile-First CSS Architecture
- `main.css` - Desktop-first base styles and grid layouts
- `mobile.css` - Mobile-specific overrides with media queries
- `components.css` - Component styling with responsive considerations

### Media Query Breakpoints
- `@media (max-width: 1024px)` - Primary mobile/tablet breakpoint
- `@media (max-width: 767px)` - Mobile-specific adjustments
- `@media (max-width: 480px)` - Small mobile optimizations

### Performance Optimizations Applied
- Optimized profile image from 1.2MB to 21KB with WebP format
- Deferred non-critical CSS loading for components and themes
- Lazy-loaded html2pdf.js library to reduce initial bundle size
- Added explicit image dimensions to prevent Cumulative Layout Shift (CLS)
- CSS containment and min-heights to prevent layout thrashing

## Critical Development Rules

### NEVER Break Desktop Layout
- Desktop layout (>1024px) must remain unchanged when making mobile adjustments
- Use media queries `@media (max-width: 1024px)` for mobile-only changes
- Test both desktop AND mobile after every change
- Desktop navigation scrolling behavior must remain intact

### Mobile Navigation Requirements
- Below 1024px: Hide main header profile section completely
- Below 1024px: Show profile + social links in navigation header (scrolled state)
- Below 1024px: Hide brand text in navigation
- Never add mobile menus or hamburger toggles unless explicitly requested

### Layout Order Requirements
- Desktop: Experience (left) + Skills (right sidebar)
- Mobile: Experience first, then Skills below
- Use CSS `order` property in media queries to control layout sequence

### File Organization
- `main.css`: Desktop-first base styles, avoid mobile-specific code here
- `mobile.css`: All mobile overrides with proper media queries
- `components.css`: Component styles that work across all breakpoints

## Testing and Debugging

- Use browser DevTools to inspect Web Components
- Global variables: `window.resumeApp`, `window.RESUME_DATA`, `window.downloadPDF()`
- Test PDF functionality: `window.testPDF()` function available
- Theme switching: Persisted in localStorage, respects system preferences
- Multiple layout variations available for testing different designs
- **CRITICAL**: Test at 1024px, 768px, and 480px breakpoints after changes
- **CRITICAL**: Verify desktop layout (>1024px) remains unchanged