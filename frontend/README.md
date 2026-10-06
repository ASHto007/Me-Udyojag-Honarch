# Frontend Application — Mi Udyojak Honarach

A modern, responsive React 19 + Vite web application built with Tailwind CSS v4, Motion, Lucide React, and Three.js/Fiber.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Ensure `VITE_API_URL` points to your running backend:
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Start Development Server
```bash
npm run dev
```
The application will launch at `http://localhost:5173`.

### 4. Build for Production
```bash
npm run build
```
Generates production-optimized static assets in `dist/`.

---

## 📁 Directory Layout

```text
frontend/
├── public/
│   ├── assets/              # Archival photos, conclave media & brand assets
│   ├── favicon.svg          # Favicon
│   ├── robots.txt           # SEO crawlers policy
│   └── sitemap.xml          # Sitemap
├── src/
│   ├── assets/              # Local static media & vectors
│   ├── components/          # Reusable UI & forms
│   │   ├── common/          # Shared components (Header, BrandLogoTab, etc.)
│   │   ├── layout/          # Layout wrappers (FloatingDock, Footer)
│   │   ├── forms/           # ContactForm, EventEnquiryModal
│   │   ├── motion/          # TiltedCard motion physics
│   │   └── ui/              # Modal, LayoutGrid, Dialog lifecycle
│   ├── sections/            # Visual sections of the homepage
│   │   ├── Hero/            # Hero section
│   │   ├── About/           # About company
│   │   ├── Services/        # 5 core programs
│   │   ├── Milestones/      # Chronological expansion
│   │   ├── Mentors/         # Mentors directory
│   │   ├── Events/          # Upcoming & past conclaves
│   │   ├── Gallery/         # Orbit photo gallery
│   │   ├── SuccessStories/  # Entrepreneur case studies
│   │   ├── Join/            # Membership & inquiry section
│   │   └── Footer/          # Footer section
│   ├── data/                # Separated domain data files (mentors, events, etc.)
│   ├── services/            # API client and domain services
│   │   ├── apiClient.js     # Central HTTP client
│   │   ├── enquiryService.js # Enquiry submission API
│   │   └── eventRegistrationService.js # Event registration API
│   ├── styles/              # Global stylesheet & Tailwind utilities
│   ├── App.tsx              # Root app component
│   └── main.tsx             # Application entrypoint
├── .env.example
├── package.json
└── vite.config.ts
```
