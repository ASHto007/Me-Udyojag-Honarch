# Backend REST API — Mi Udyojak Honarach

Production-grade Node.js + Express.js + MongoDB API server powering inquiries, event registrations, and email notifications.

---

## 🛠️ Architecture

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database & ODM**: MongoDB with Mongoose
- **Security**: Helmet, CORS with strict origin validation, rate limiting
- **Input Validation**: validator, regex phone normalization, HTML sanitization
- **Duplicate Protection**: Compound unique indexes (`{ eventId, email }` & `{ eventId, phone }`) + controller-level checks returning `409 Conflict`
- **Email Service**: Nodemailer with HTML templates (asynchronous non-blocking dispatch)

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Fill in the parameters:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mi-udyojak-honarach
FRONTEND_URL=http://localhost:5173
ADMIN_EMAIL=miudyojakhonarch@gmail.com
EMAIL_FROM="Mi Udyojak Honarach <miudyojakhonarch@gmail.com>"
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
```

### 3. Run Locally
Development mode with auto-reload:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

---

## 📡 REST API Endpoints

### 1. Healthcheck
- **`GET /api/health`**
- **Response `200 OK`**:
```json
{
  "status": "ok",
  "timestamp": "2026-10-06T12:00:00.000Z",
  "uptime": 12.34,
  "database": {
    "status": "connected",
    "connected": true
  }
}
```

### 2. Enquiries
- **`POST /api/enquiries`**
- **Body**:
```json
{
  "fullName": "Rahul Deshmukh",
  "email": "rahul.deshmukh@example.com",
  "phone": "9876543210",
  "city": "Pune",
  "stage": "Aspiring Entrepreneur (Idea Stage)",
  "interest": "Mentorship & Guidance",
  "message": "Interested in agro-business cluster.",
  "consent": true
}
```
- **Responses**:
  - `201 Created`: Enquiry recorded, emails dispatched.
  - `400 Bad Request`: Validation failure.
  - `429 Too Many Requests`: Rate limit exceeded.

### 3. Event Registrations
- **`POST /api/event-registrations`**
- **Body**:
```json
{
  "eventId": "mumbai-expo-2027",
  "eventTitle": "Global Marathi Entrepreneurship Expo 2027",
  "fullName": "Aakash More",
  "email": "aakash.more@example.com",
  "phone": "9822012345",
  "businessName": "More Engineering",
  "cityDistrict": "Mumbai Suburban",
  "message": "Looking forward to attending.",
  "consent": true
}
```
- **Responses**:
  - `201 Created`: Registration confirmed, confirmation email dispatched.
  - `400 Bad Request`: Validation failure.
  - `409 Conflict`: Already registered with this email or phone for this event.
  - `429 Too Many Requests`: Rate limit exceeded.
