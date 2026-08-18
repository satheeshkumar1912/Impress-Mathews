# Implementation Plan - Mathew Personal Portfolio Website

Build a pixel-perfect, responsive website matching the provided design image for **Mathew**, strictly adhering to all color themes, typography, text content, layout structures, and interactive animations specified by the user.

## Key Requirements & User Directives
1. **Remove Browse/Comment Components**: Omit all "Browse" and "Comment" overlay tags present in the screenshot.
2. **Exact Design & Theme**:
   - **Hero & Footer**: Deep dark forest green (`#0B2218` / `#0F2C1F`) with gold accent subtitles (`#C5A880`).
   - **Story Section**: Clean off-white background (`#F9F8F5`).
   - **Impact Section**: Warm sand/beige background (`#F4EFE6`).
   - **Execution Section**: Crisp white background (`#FFFFFF`).
   - **Typography**: Modern typography with serif quotes (`"First become worthy. Then aspire for greatness."` and `"Success is meaningful only when it creates opportunities for others."`).
3. **Continuous Horizontal Marquee**:
   - Dynamic, continuous CSS keyframe marquee for the partner/brand logos below the Hero section.
4. **Image Placeholders & Local File Management**:
   - Create empty/styled image frame containers inside cards where user images (`images/hero.jpg`, `images/journey.jpg`, `images/education.jpg`, etc.) can be loaded.
   - Include an interactive local file upload feature on placeholder frames so the user can test their images immediately in browser or add them into an `images/` directory.
5. **Interactive Elements**:
   - Interactive slide switcher for the "Education / Vision" card with `<` and `>` arrow buttons.

---

## User Review Required

> [!NOTE]
> All "Browse / Comment" annotation popups from the screenshot are stripped completely. Image frames have designated fallback containers with drag-and-drop / upload preview capability and clean `images/` directory linking.

---

## Proposed Changes

### Structure & Assets

#### [NEW] [index.html](file:///c:/Users/satheesh/Desktop/JOD/Impress/index.html)
- Main HTML5 document containing semantic sections:
  - Hero Section (Dark Forest Green background, split 2-column layout with quote, bio, and image placeholder)
  - Continuous Marquee Logo Ticker
  - "Every Journey Begins with a Purpose" Section (Off-white background, story text & image placeholder)
  - "Building Businesses That Create Meaningful Impact" Section (Warm beige background, quote, and interactive Impact card carousel)
  - "Defining Excellence Through Execution" Section (White background, 4 numbered achievement highlights)
  - Footer (Dark Forest Green background, brand title, links, and copyright)

#### [NEW] [style.css](file:///c:/Users/satheesh/Desktop/JOD/Impress/style.css)
- Design system variables (Colors, typography, spacing, shadows).
- CSS `@keyframes marquee` for infinite smooth scrolling banner.
- Responsive flexbox/grid layout breakpoints for Mobile, Tablet, and Desktop.
- Custom stylized placeholder styling with image preview support.

#### [NEW] [script.js](file:///c:/Users/satheesh/Desktop/JOD/Impress/script.js)
- JavaScript for:
  - Interactive Impact Carousel card navigation (`<` and `>` arrow buttons).
  - Instant local image upload preview helper (allowing user to select any local image file to immediately populate any card placeholder live in the browser).
  - Marquee duplicate generator for seamless continuous looping.

#### [NEW] [images/](file:///c:/Users/satheesh/Desktop/JOD/Impress/images)
- Directory created for user images (`hero.jpg`, `journey.jpg`, `education.jpg`, etc.).

---

## Verification Plan

### Manual Verification
1. Open `index.html` in browser or dev server.
2. Verify Hero section color (`#0B2218`), typography, quotes, and layout match the uploaded image.
3. Verify Browse / Comment buttons are absent.
4. Verify logo bar below hero scrolls continuously and horizontally without gaps.
5. Verify section backgrounds alternate matching the reference image (Dark Green -> White Marquee -> Off-White Story -> Warm Sand Impact -> White Highlights -> Dark Green Footer).
6. Verify interactive arrow buttons `<` `>` on the Impact section switch between Education, Mentorship, Community, and Sustainability cards.
7. Test image placeholder upload functionality and verifying images render cleanly inside cards.
















# Mathew Personal Portfolio Website - Walkthrough


## Key Achievements & Feature Implementation

### 1. Stripped "Browse / Comment" Components
- Excluded all "Browse" and "Comment" annotation buttons from every section.

### 2. Exact Color Palette, Theme & Typography
- **Hero & Footer**: Deep dark forest green (`#0B2218` / `#0F2C1F`) with gold accent labels (`#C8A165`).
- **My Story Section**: Soft off-white background (`#F9F8F5`).
- **Impact & Vision Section**: Warm sand beige background (`#F4EFE6`).
- **Key Highlights Section**: Crisp white background (`#FFFFFF`).
- **Typography**: Google Fonts **Plus Jakarta Sans** for modern headings & text, with **Cormorant Garamond** for italic quotes.

### 3. Continuous Horizontal Logo Marquee
- Built an infinite moving ticker below the Hero section using CSS `@keyframes marquee-scroll`.
- Features circular vector icons and partner titles (`Next Gen`, `Keynote`, `Venture`, `Strategic`, `Global`, `Capital`) moving continuously without stutter or gaps.


### 4. Interactive Impact Card Carousel
- Section 3 ("Building Businesses That Create Meaningful Impact") includes an interactive card switcher with `<` and `>` arrow controls to cycle through:
  - *Education*
  - *Community Growth*
  - *Sustainability*
  - *Entrepreneurship Mentorship*

---

## File Structure

- [index.html](file:///c:/Users/satheesh/Desktop/JOD/Impress/index.html) — Complete semantic HTML5 markup.
- [style.css](file:///c:/Users/satheesh/Desktop/JOD/Impress/style.css) — Full CSS design tokens, layouts, typography & marquee keyframe animations.
- [script.js](file:///c:/Users/satheesh/Desktop/JOD/Impress/script.js) — Marquee duplication, card carousel switching, and local image preview logic.
- [images/README.md](file:///c:/Users/satheesh/Desktop/JOD/Impress/images/README.md) — Guide for local image assets.

---

## How to Run & View locally

1. Open `index.html` directly in any web browser (e.g. Chrome, Edge).
2. To add your photos:
   - Option A: Place your image files inside `c:\Users\satheesh\Desktop\JOD\Impress\images\` as `hero.jpg` and `journey.jpg`.
   - Option B: Click the **Upload Image** button on any card frame in the browser to select an image file directly from your computer.
