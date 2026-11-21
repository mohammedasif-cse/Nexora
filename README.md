# NEXORA 🪐🚀
> *The right opportunity, at your level.*

A fast, mobile-friendly web platform listing curated internships and hackathons for 1st and 2nd year college students across India, styled with the **Deep Space** aesthetic.

---

## 🎨 Design System

- **Colours**:
  - Space Black: `#010712`
  - Deep Lavender: `#7022FC`
  - Electric Blue: `#2196FF`
  - Cyber Cyan: `#18D5E8`
  - Soft White: `#F5F7FF`
- **Typography**:
  - Headings: `Instrument Serif` (with italic accent words `<em>`)
  - Body text: `Inter`
- **Atmospheric Background**:
  - Drifting multi-color neon blobs (`.bl.b1`, `.b2`, `.b3`) with soft 90px gaussian blur
  - Moving perspective cyber grid (`.grid`) with animated panning
- **Interactive Hero**:
  - Animated SVG orbit rings, glowing rotating nodes, and dashed orbital tracks
  - Pulsing radiant "Try Now" orb button
- **Mobile First**:
  - Fixed top navigation bar on desktop with spinning conic gradient icon
  - Bottom tab navigation bar on mobile devices (`Home`, `Explore`, `Dashboard`, `Profile`, `Saved`)

---

## 🧭 Application Pages

1. **Home (`#home`)**:
   - Hero banner with tagline: *"The right opportunity, at your level."*
   - Live verified opportunity counter
   - What NEXORA does, How it works (3-step cards), and Made for every student chips
2. **Explore Opportunities (`#explore`)**:
   - Real-time recommendation engine scoring opportunities against your profile
   - Badges: `Excellent Match` (Cyan), `Good Match` (Blue), `Beginner Friendly` (Lavender), `Skill Development Opportunity` (Soft White)
   - Personalized **Why** reasons and **To improve your fit** skill gap analysis
   - Category chips, keyword search, budget filter, distance filter, and mode filter (Online / Offline)
   - Direct official **Apply Now** external links
   - Single-click **Save** toggle
3. **My Dashboard (`#dashboard`)**:
   - Personalized welcome header
   - Circular profile completion gauge (`--p: %`)
   - Upcoming deadlines list with countdown
   - Top recommended opportunities
   - Active skills and certifications
   - Application tracking pipeline
   - Participation history
4. **My Profile (`#profile`)**:
   - Profile editor: Full name, College, Department, Location, Skills, Certifications, Projects, Hackathons, Internships, Interests
   - Selectors for Academic Year, Programming Level, and Budget
   - Auto-saves to database (`/api/profile` & `localStorage`)
5. **Saved Opportunities (`#saved`)**:
   - Lists saved opportunities
   - Application status pipeline tracker: `Saved` → `Applied` → `Shortlisted` → `Selected`
   - Real-time database sync (`/api/saved` & `localStorage`)

---

## 💻 How to Run Locally

```bash
# Start the local development server (serves app and database API)
node serve.js
```
Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔄 Live Data & Database

- **Opportunities**: Fetched live from published Google Sheets CSV with local fallback snapshot.
- **Database**: Saved profile and application statuses persist in `db.json` via `/api/profile` and `/api/saved` (with automatic `localStorage` synchronization for static deployments on Netlify and Vercel).
