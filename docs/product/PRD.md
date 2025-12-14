# Product Requirements Document (PRD)

**Project:** W3J STUDIO Portfolio
**Owner:** w3jdev
**Status:** In Development
**Version:** 1.0.0

## 1. Executive Summary
W3J STUDIO is a digital portfolio designed to demonstrate technical mastery over modern web technologies (WebGL, React, Animation) through a "Brutalist Chaos" aesthetic. It serves as both a showcase of past work and a functional capability statement for potential enterprise clients.

## 2. Objectives
*   **Primary:** Convert visitors into leads by showcasing high-end, custom web development skills.
*   **Secondary:** Establish a unique brand identity ("The Art in the Error") that differentiates from standard agency templates.
*   **Technical:** Achieve 60fps performance on modern devices despite heavy visual effects.

## 3. Target Audience
*   **Creative Directors** looking for technical partners.
*   **Tech Startups** needing distinctive, avant-garde branding/web presence.
*   **Recruiters** scouting for Senior/Lead Frontend talent.

## 4. Functional Requirements

### 4.1. Global UI
*   **Custom Cursor:** Physics-based follower with state-aware interactions (hover, text, default).
*   **Noise Overlay:** Persistent SVG turbulence filter to unify the visual style.
*   **Navigation:** Seamless transitions between "Home" and "Project Detail" views without full page reloads.

### 4.2. Home Page
*   **Liquid Hero:** Interactive 3D blob reacting to mouse/time (simulated audio reactivity).
*   **Manifesto:** Scroll-triggered text reveal animation.
*   **Selected Works:** List of projects with hover-reveal image trails and physics-based floating previews.
*   **Interactive Playground:** A "viral" toy section (particles, drawing) to increase time-on-site.

### 4.3. Project Detail (Case Study)
*   **Dynamic Loading:** Content populated via JSON/Props.
*   **Parallax Header:** Large hero image with scroll-based scale/opacity effects.
*   **Content Modules:** Sidebar metadata, Gallery grid, Challenge/Solution text blocks.
*   **Next Project CTA:** Infinite marquee and large click area to flow to the next case study.

## 5. Non-Functional Requirements
*   **Performance:** Lighthouse Performance score > 90 (Desktop).
*   **Accessibility:** Semantic HTML where possible, though aesthetic compromise is expected for "brutalist" elements.
*   **Compatibility:** Chrome, Firefox, Safari (Modern). Mobile responsive.

## 6. Success Metrics
*   **Engagement:** Average session duration > 2 minutes.
*   **Conversion:** Contact form submission rate > 1%.
*   **Performance:** Zero frame drops during scroll on M1 Macs.

---
*Authored by w3jdev*
