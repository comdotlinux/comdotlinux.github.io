# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Guruprasad Kulkarni, hosted on GitHub Pages at `bio.kulkarni.cloud`. It's a static HTML site based on the "TXT by HTML5 UP" template.

## Technology Stack

- **Frontend**: Pure HTML, CSS (compiled from SASS), and jQuery-based JavaScript
- **CSS Preprocessor**: SASS (source in `/assets/sass/`)
- **Icons**: Font Awesome
- **Hosting**: GitHub Pages with custom domain
- **Node.js**: Version 21.6.2 (specified in `.tool-versions`)

## Development Commands

### Local Development Server
```bash
./dev-server.sh
```
This starts a browser-sync server with live reload on file changes.

### Modern Development
The new website uses pure CSS (no SASS compilation needed) and vanilla JavaScript with Web Components. Simply:
1. Run `./dev-server.sh` to start the development server
2. Edit HTML, CSS, or JavaScript files directly
3. Changes will auto-reload in the browser

### Testing the Website
- Open http://localhost:3002 when browser-sync is running
- Test theme switching (light/dark mode)
- Verify print layout with Ctrl+P (or Cmd+P)
- Check responsive design on different screen sizes

## Project Structure

- `/assets/` - Modern static assets
  - `/styles/` - CSS files (main.css, themes.css, components.css, print.css)
  - `/scripts/` - JavaScript modules and Web Components
    - `/components/` - Web Component definitions
  - `/images/` - Optimized images (profile.jpg)
  - `/data/` - JSON/JS data files (resume-data.js)
- `index.html` - Modern single-page application
- `dev-server.sh` - Development server script
- `PRD.md` - Product Requirements Document
- `CLAUDE.md` - This development guide
- `CNAME` - Custom domain configuration

## Key Files

- `index.html` - Modern single-page resume application
- `assets/styles/main.css` - Core styles and layout
- `assets/styles/themes.css` - Light/dark theme system with CSS custom properties
- `assets/styles/components.css` - Component-specific styles
- `assets/scripts/main.js` - Application initialization and global functionality
- `assets/data/resume-data.js` - Centralized resume content data

## Architecture

- **Web Components**: Custom elements for modular, reusable components
- **CSS Custom Properties**: Theme system supporting light/dark modes
- **Progressive Enhancement**: Works without JavaScript, enhanced with it
- **Print Optimization**: Dedicated print styles for PDF generation
- **Accessibility**: WCAG 2.1 AA compliant with proper ARIA labels
- **Performance**: Optimized for fast loading with minimal dependencies

## Deployment

The site automatically deploys via GitHub Pages when changes are pushed to the main branch. The custom domain `bio.kulkarni.cloud` is configured via the CNAME file.

## PDF Generation Requirements

The website includes a PDF download feature that must generate a traditional resume format matching the reference screenshots provided. Key requirements:

### PDF Layout Specifications
- **Font**: Times New Roman, 11pt body text, 22pt header
- **Colors**: Blue headers (#4472C4), black text on white background
- **Margins**: 0.5 inch on all sides
- **Format**: Traditional two-page resume layout

### PDF Content Structure
1. **Header**: Centered name (blue, large), contact information below
2. **PROFILE**: Two-column layout with bold left column, regular right column
3. **SKILLS**: Bullet-point list with proper indentation
4. **EXPERIENCE**: Job entries with company, role, dates, description, and bullet points
5. **EDUCATION**: Centered institutional information

### Technical Implementation
- Uses html2pdf.js library for client-side PDF generation
- Creates isolated iframe to avoid Web Component cloning errors
- Generates timestamped filenames (DD-MON-YYYY_HHMM format)
- PDF button in navigation should be hidden in print/PDF output
- Must match exact formatting from reference screenshots

### PDF Generation Process
1. Button click triggers `generateCleanPDF()` method
2. Creates hidden iframe with clean HTML (no Web Components)
3. Applies traditional resume CSS styling
4. Uses html2pdf to convert and download
5. Cleans up iframe after generation

## Important Notes

- Pure HTML5, CSS3, and ES6+ JavaScript - no frameworks or build tools required
- Web Components provide modularity without external dependencies  
- Theme system uses CSS custom properties for instant theme switching
- Print styles automatically optimize layout for PDF export
- PDF generation uses isolated iframe to avoid Web Component conflicts
- All content is centralized in `assets/data/resume-data.js` for easy updates
- Responsive design works from mobile to desktop
- Fully accessible with keyboard navigation and screen reader support