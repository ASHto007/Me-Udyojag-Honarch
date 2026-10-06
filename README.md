# Mi Udyojak Honarach (मी उद्योजक होणारच)
### Professional Full-Stack Architecture (Frontend + Backend)

A production-grade, enterprise full-stack platform built with a strictly separated React 19 + Vite frontend and a Node.js + Express.js + MongoDB backend.

---

## 🏛️ System Architecture

```text
mi-udyojak-honarach/
│
├── frontend/                     # React 19 + Vite client application
│   ├── public/
│   │   ├── assets/              # Archival photos, conclave media & brand images
│   │   ├── images/
│   │   ├── icons/
│   │   ├── videos/
│   │   ├── favicon.svg
│   │   ├── robots.txt
│   │   └── sitemap.xml
│   │
│   ├── src/
│   │   ├── assets/              # Local static media & vectors
│   │   ├── components/
│   │   │   ├── common/          # BrandLogoTab, SectionBackdrop, TypewriterText, ErrorBoundary
│   │   │   ├── layout/          # FloatingDock, Footer
│   │   │   ├── forms/           # ContactForm, EventEnquiryModal
│   │   │   ├── motion/          # TiltedCard 3D tilt effects
│   │   │   └── ui/              # Modal, LayoutGrid, Dialog Lifecycle coordinator
│   │   ├── sections/
│   │   │   ├── Hero/            # Hero section
│   │   │   ├── About/           # Mission & pillars
│   │   │   ├── Services/        # 5 core programs
│   │   │   ├── Milestones/      # Vertical chronological timeline
│   │   │   ├── Mentors/         # Mentors directory & advisory panel
│   │   │   ├── Events/          # Upcoming conclaves & past archives
│   │   │   ├── Gallery/         # 3D Orbit photo gallery
│   │   │   ├── SuccessStories/  # Entrepreneur case studies
│   │   │   ├── Join/            # Membership & inquiry section
│   │   │   └── Footer/          # Footer section
│   │   ├── services/
│   │   │   ├── apiClient.js     # Centralized HTTP client
│   │   │   ├── enquiryService.js # Enquiry submission API service
│   │   │   └── eventRegistrationService.js # Event registration API service
│   │   ├── data/                # Separated domain data files (mentors, events, stories, etc.)
│   │   ├── styles/              # Global Tailwind CSS tokens
│   │   ├── App.tsx              # Root application layout
│   │   └── main.tsx             # Application bootstrap
│   ├── .env.example
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                      # Node.js + Express.js + MongoDB REST API
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js            # Mongoose connection & disconnect handler
│   │   │   └── env.js           # Validated environment configuration
│   │   ├── models/
│   │   │   ├── Enquiry.js       # Mongoose model for general enquiries
│   │   │   └── EventRegistration.js # Mongoose model for event registrations with unique indexes
│   │   ├── controllers/
│   │   │   ├── enquiryController.js # Enquiry business logic & controlled field parsing
│   │   │   └── eventRegistrationController.js # Event registration logic & 409 duplicate handling
│   │   ├── routes/
│   │   │   ├── healthRoutes.js  # GET /api/health
│   │   │   ├── enquiryRoutes.js # POST /api/enquiries
│   │   │   └── eventRegistrationRoutes.js # POST /api/event-registrations
│   │   ├── services/
│   │   │   └── emailService.js  # Nodemailer notifications (Admin + User acknowledgements)
│   │   ├── middleware/
│   │   │   ├── errorHandler.js  # Centralized error handler (400, 404, 409, 500)
│   │   │   ├── notFound.js      # 404 handler
│   │   │   ├── rateLimiter.js   # Express rate limiters for IP abuse prevention
│   │   │   └── validateRequest.js # Request validation middleware
│   │   ├── validators/
│   │   │   ├── enquiryValidator.js # Validation for enquiries
│   │   │   └── eventRegistrationValidator.js # Validation for event registrations
│   │   ├── utils/
│   │   │   ├── normalizeEmail.js # Trimming & lowercasing
│   │   │   ├── normalizePhone.js # Indian 10-digit phone normalization
│   │   │   └── sanitize.js      # HTML & XSS sanitization
│   │   ├── app.js               # Express application configuration
│   │   └── server.js            # HTTP server bootstrap & graceful shutdown
│   ├── tests/
│   │   ├── enquiry.test.js      # Integration test suite for enquiries
│   │   └── eventRegistration.test.js # Integration test suite for registrations
│   ├── .env.example
│   ├── package.json
│   └── README.md
│
├── .gitignore
├── package.json
└── README.md
```

---

## ⚡ Quick Start

### 1. Root Workspaces
From repository root:
```bash
npm install
```

### 2. Run Backend
```bash
cd backend
npm install
npm run dev
```
Backend runs at `http://localhost:5000` (Healthcheck: `http://localhost:5000/api/health`).

### 3. Run Frontend
In a second terminal:
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at `http://localhost:5173`.

---

## 📡 REST API Specifications

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/docs` | **Interactive Swagger UI API Documentation** |
| `GET` | `/api/docs.json` | OpenAPI 3.0 JSON specification schema |
| `GET` | `/api/health` | Healthcheck and database connectivity diagnostic |
| `POST` | `/api/enquiries` | Submit general business / membership inquiry |
| `GET` | `/api/enquiries` | Administrative pagination list of enquiries |
| `POST` | `/api/event-registrations` | Register interest for upcoming conclave / event |
| `GET` | `/api/event-registrations` | Administrative pagination list of event registrations |

---

## 🧪 Verification & Tests

### Backend Test Suite
```bash
cd backend
npm test
```
- Tests 12/12 passing: healthchecks, OpenAPI/Swagger specification, input validation, duplicate event registration conflict (`409 Conflict`), and record persistence.

### Frontend Production Build
```bash
cd frontend
npm run build
```
- Compiles production Vite client bundle into `frontend/dist/`.

---

## 🚢 Deployment Architecture

- **Frontend**: Deployed to **Vercel**
  - Root directory: `frontend`
  - Build command: `npm run build`
  - Output directory: `dist`
  - Environment variable: `VITE_API_URL=https://api.yourdomain.com/api`
- **Backend**: Deployed to **Render / Railway**
  - Root directory: `backend`
  - Start command: `npm start`
  - Environment variables: `NODE_ENV=production`, `MONGODB_URI=<Atlas URI>`, `FRONTEND_URL=https://yourdomain.com`, `SMTP_*`
- **Database**: **MongoDB Atlas**
