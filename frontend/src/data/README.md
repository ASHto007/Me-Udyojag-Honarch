# Data Architecture & Content Management Guide

All website data has been separated into dedicated, modular files under `src/data/`. This enables you to easily add, edit, or remove content without touching any React UI components.

---

## 📁 Directory Structure

| File | Purpose | Corresponding Section / Component |
| :--- | :--- | :--- |
| [`mentorsData.ts`](./mentorsData.ts) | Mentors, advisory panel, and industry leaders | `#mentors` (Mentors & Guidance) |
| [`eventsData.ts`](./eventsData.ts) | Upcoming conclaves & past event archives | `#community` (Community & Conclaves) |
| [`milestonesData.ts`](./milestonesData.ts) | Historical timeline & milestones | `#achievements` (Milestones of a Grassroots Journey) |
| [`storiesData.ts`](./storiesData.ts) | Entrepreneur case studies & success stories | `#stories` (Success Stories & Founder Journeys) |
| [`statisticsData.ts`](./statisticsData.ts) | Key metrics and verified impact figures | `#stats` (Verified Impact Statistics) |
| [`awardsData.ts`](./awardsData.ts) | Recognitions, honors, and awards | `#about` / Company Overview awards list |
| [`programsData.ts`](./programsData.ts) | Core services & initiative cards | `#programs` (Services & Core Initiatives) |
| [`videosData.ts`](./videosData.ts) | Video interviews, talks, and conclave footage | `#videos` (Featured Video Interviews & Talks) |
| [`galleryData.ts`](./galleryData.ts) | Photo gallery items, conclave albums, and press clippings | `#gallery` (Archival Photo Records & Media) |
| [`founderData.ts`](./founderData.ts) | Founder quote, bio, and vision pillars | `#founder-vision` (Founder Vision) |
| [`publicContact.ts`](./publicContact.ts) | Official public email, phone, location | Footer, Contact forms, and header |
| [`approvedContent.ts`](./approvedContent.ts) | Backwards-compatibility bridge | Re-exports all domain files |
| [`index.ts`](./index.ts) | Central barrel export | Allows clean imports from `src/data` |

---

## 🚀 How to Add Data

### 1. Adding an Event (`eventsData.ts`)
Open [`eventsData.ts`](./eventsData.ts).
- For **Upcoming Events**, add an entry to `UPCOMING_EVENTS`.
- For **Past Events**, add an entry to `PAST_EVENTS`.

```typescript
// Example for UPCOMING_EVENTS:
{
  id: 'pune-conclave-2027',
  title: 'Western Maharashtra MSME & Manufacturing Conclave',
  marathiTitle: 'पश्चिम महाराष्ट्र सूक्ष्म, लघु व मध्यम उद्योग परिषद',
  date: 'Sunday, 18 April 2027',
  time: '10:00 AM – 5:30 PM IST',
  location: 'Auto Cluster Exhibition Center, Chinchwad, Pune',
  description: 'Regional manufacturing conclave focusing on vendor development, supply chain linkages, and capital subsidies.',
  statusBadge: 'Registrations Open',
  statusType: 'open',
  image: '/assets/orbit-1.webp',
  imageAlt: 'Western Maharashtra MSME Conclave Pune',
  isFeatured: false,
  type: 'upcoming',
  allowsEnquiry: true,
  category: 'Regional Conclave',
  startsAt: '2027-04-18T10:00:00+05:30',
  endsAt: '2027-04-18T17:30:00+05:30'
}
```

---

### 2. Adding a Mentor (`mentorsData.ts`)
Open [`mentorsData.ts`](./mentorsData.ts) and append to `APPROVED_MENTORS`:

```typescript
{
  id: 'mentor-santosh-shinde',
  name: 'Santosh Shinde',
  designation: 'Managing Director',
  company: 'Sahyadri Agro Industries',
  expertise: ['Food Processing', 'Cold Chain', 'Govt Subsidies'],
  yearsExperience: '22+',
  shortBio: 'Specializes in scaling agri-processing ventures and securing agro-industrial cluster incentives across Maharashtra.',
  photo: '/assets/mentor-1.jpg',
  tag: 'Agri-Business Mentor',
  linkedInUrl: 'https://linkedin.com'
}
```

---

### 3. Adding a Milestone (`milestonesData.ts`)
Open [`milestonesData.ts`](./milestonesData.ts) and append to `APPROVED_MILESTONES`:

```typescript
{
  id: 'milestone-gmec-2018',
  period: 'October 2018',
  date: '2018-10-15',
  title: 'Global Maharashtrian Entrepreneurship Conclave',
  desc: 'Founding symposium convening regional industrialists, trade delegates, and aspiring business pioneers.',
  badge: 'Flagship Inception',
  location: 'The Taj Mahal Palace, Mumbai',
  peopleReached: 500
}
```

---

### 4. Adding a Success Story (`storiesData.ts`)
Open [`storiesData.ts`](./storiesData.ts) and append to `APPROVED_STORIES`:

```typescript
{
  id: 'story-pravin-kadam',
  name: 'Pravin Kadam',
  company: 'Sahyadri Bio-Organics',
  industry: 'Agri-Tech & Organics',
  location: 'Kolhapur, Maharashtra',
  challenge: 'Struggling with retail distribution networks and state MSME compliance.',
  support: 'Connected with cluster mentors and facilitated B2B market tie-ups.',
  result: 'Expanded retail placement into 45+ organic stores across Pune & Mumbai.',
  quote: 'The mentorship transformed our operational mindset from a small farm unit into a commercial brand.'
}
```

---

### 5. Adding Impact Statistics (`statisticsData.ts`)
Open [`statisticsData.ts`](./statisticsData.ts) and append to `APPROVED_STATISTICS`:

> Recognized labels that show automatic custom icons:
> - `'Entrepreneurs Connected'`
> - `'Districts Reached'`
> - `'Events Conducted'`
> - `'Mentors'`
> - `'Businesses Supported'`
> - `'Years of Journey'`

```typescript
{
  id: 'stat-entrepreneurs',
  label: 'Entrepreneurs Connected',
  value: '25,000+',
  source: 'Statewide registration logs 2018-2026'
}
```

---

### 6. Adding Awards (`awardsData.ts`)
Open [`awardsData.ts`](./awardsData.ts) and append to `APPROVED_AWARDS`:

```typescript
{
  id: 'award-state-msme-2022',
  name: 'Maharashtra Youth Enterprise Catalyst Honor',
  year: '2022',
  organisation: 'State Chamber of Commerce & Industry',
  image: '/assets/gallery-2.webp',
  imageAlt: 'Maharashtra Youth Enterprise Catalyst Honor Ceremony',
  description: 'Recognized for pioneering grassroots entrepreneurship bootcamps across 30+ districts.'
}
```

---

### 7. Adding or Editing Programs (`programsData.ts`)
Open [`programsData.ts`](./programsData.ts). Modify existing services or add a new program following `ProgramItem`.

---

## 🖼️ Media & Photos
- Store local photos and banners in `public/assets/` (e.g., `public/assets/my-photo.webp`).
- In data files, reference them as `/assets/my-photo.webp`.
