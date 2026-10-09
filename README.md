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

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/docs` | Interactive Swagger UI API Documentation | Public |
| `GET` | `/api/docs.json` | OpenAPI 3.0 JSON specification schema | Public |
| `GET` | `/api/health` | Readiness & health check (200 / 503) | Public |
| `GET` | `/api/health/live` | Container liveness probe | Public |
| `GET` | `/api/health/ready` | Traffic readiness probe | Public |
| `POST` | `/api/enquiries` | Submit general business / membership inquiry | Public (Rate-limited) |
| `GET` | `/api/enquiries` | Administrative paginated list of enquiries | `x-admin-key` or `Bearer <key>` |
| `POST` | `/api/event-registrations` | Register interest for upcoming conclave / event | Public (Rate-limited) |
| `GET` | `/api/event-registrations` | Administrative paginated list of event registrations | `x-admin-key` or `Bearer <key>` |

---

## 🧪 Verification & Production Readiness

### Backend Syntax Verification
```bash
node --check backend/src/server.js
```

### Frontend Quality & Production Build
```bash
# Typecheck
npm run typecheck --workspace=frontend

# Linting
npm run lint --workspace=frontend

# Production bundle compilation
npm run build:frontend
```

---

## 🐳 Docker & Container Deployment

### Local / Self-Hosted VPS (Docker Compose)
Launch both backend and MongoDB with persistent data and healthchecks:
```bash
docker compose up -d --build
```
- Backend will be available at `http://localhost:5000`
- MongoDB will be available with persisted storage in named volume `mongo-data`

---

## 🚀 CI / CD Pipeline

Automated GitHub Actions workflow (`.github/workflows/ci.yml`) runs on push and pull request to `main`:
1. **Frontend Job**: Runs TypeScript typecheck, Oxlint, and production Vite bundle build.
2. **Backend Job**: Performs Node.js syntax verification and dependency validation.

---

## 🚢 Cloud Production Deployment

### Frontend (Vercel / Netlify / Cloudflare Pages)
- **Root Directory**: `frontend`
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variables**:
  - `VITE_API_URL`: `https://api.miudyojakhonarach.com/api` (or your backend domain)

### Backend (Render / Railway / AWS / Docker VPS)
- **Root Directory**: `backend`
- **Runtime**: Node.js 20 LTS (or Dockerfile)
- **Start Command**: `npm start`
- **Environment Variables**:
  - `NODE_ENV`: `production`
  - `PORT`: `5000` (or assigned port)
  - `MONGODB_URI`: `mongodb+srv://<user>:<password>@cluster0.mongodb.net/mi_udyojak?retryWrites=true&w=majority`
  - `FRONTEND_URL`: `https://miudyojakhonarach.com`
  - `ADMIN_API_KEY`: `<secure_random_hex_key>`
  - `ADMIN_EMAIL`: `miudyojakhonarch@gmail.com`
  - `EMAIL_FROM`: `"Mi Udyojak Honarach" <miudyojakhonarch@gmail.com>`
  - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` (e.g. Brevo, SendGrid, Amazon SES)

