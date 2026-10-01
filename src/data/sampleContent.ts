import type { EventItem } from './eventsData';
import type { MentorGalleryItem } from '../components/AccordionGallery';

// Fictional content requested for the website preview; replace with verified records before launch.
export const SAMPLE_EVENTS: EventItem[] = [
  {
    "id": "sample-founder-conclave",
    "title": "Maharashtra Founders Conclave",
    "date": "14 November 2026",
    "time": "10:00 AM - 5:00 PM",
    "location": "Pune (sample venue)",
    "description": "A day of founder conversations, practical workshops and small-group networking for aspiring entrepreneurs across Maharashtra.",
    "isFeatured": true,
    "type": "upcoming",
    "statusBadge": "Sample event",
    "statusType": "closed",
    "image": "",
    "allowsEnquiry": false,
    "isSample": true
  },
  {
    "id": "sample-business-circle",
    "title": "Local Business Networking Circle",
    "date": "28 November 2026",
    "time": "4:00 PM - 7:00 PM",
    "location": "Thane (sample venue)",
    "description": "Introduce your venture, exchange ideas with fellow founders and explore possible collaborations in a friendly community setting.",
    "type": "upcoming",
    "statusBadge": "Sample event",
    "statusType": "closed",
    "image": "",
    "allowsEnquiry": false,
    "isSample": true
  },
  {
    "id": "sample-startup-workshop",
    "title": "From Idea to First Customer",
    "date": "12 December 2026",
    "time": "10:00 AM - 1:00 PM",
    "location": "Online (sample session)",
    "description": "A hands-on workshop covering customer interviews, simple pricing and the first steps toward testing a business idea.",
    "type": "upcoming",
    "statusBadge": "Sample event",
    "statusType": "closed",
    "image": "",
    "allowsEnquiry": false,
    "isSample": true
  },
  {
    "id": "sample-women-enterprise",
    "title": "Women in Enterprise Meetup",
    "date": "August 2026",
    "location": "Nashik (sample venue)",
    "description": "An illustrative community meetup bringing homegrown brands together to discuss packaging, sales and customer relationships.",
    "type": "past",
    "statusBadge": "Sample event",
    "statusType": "closed",
    "image": "",
    "allowsEnquiry": false,
    "isSample": true,
    "recapNote": "Illustrative event, not a historical record."
  },
  {
    "id": "sample-msme-dialogue",
    "title": "MSME Growth Dialogue",
    "date": "June 2026",
    "location": "Kolhapur (sample venue)",
    "description": "A sample roundtable on improving operations, building a reliable supplier network and planning steady business growth.",
    "type": "past",
    "statusBadge": "Sample event",
    "statusType": "closed",
    "image": "",
    "allowsEnquiry": false,
    "isSample": true,
    "recapNote": "Illustrative event, not a historical record."
  }
];

export const SAMPLE_MENTORS: MentorGalleryItem[] = [
  {
    "name": "Anaya Deshmukh",
    "role": "Business Strategy Mentor",
    "tag": "Sample profile",
    "description": "A fictional mentor profile focused on turning early ideas into practical business plans, clear pricing and achievable first steps.",
    "image": "/assets/sample-mentor-1.svg",
    "alt": "Illustrated placeholder for a fictional mentor"
  },
  {
    "name": "Rohan Kulkarni",
    "role": "Marketing & Brand Mentor",
    "tag": "Sample profile",
    "description": "A fictional guide to customer research, brand positioning and affordable digital marketing for local enterprises.",
    "image": "/assets/sample-mentor-2.svg",
    "alt": "Illustrated placeholder for a fictional mentor"
  },
  {
    "name": "Meera Patil",
    "role": "Finance & Operations Mentor",
    "tag": "Sample profile",
    "description": "A fictional advisor helping small businesses understand cash flow, organize day-to-day operations and plan for growth.",
    "image": "/assets/sample-mentor-3.svg",
    "alt": "Illustrated placeholder for a fictional mentor"
  },
  {
    "name": "Sahil Joshi",
    "role": "Product & Technology Mentor",
    "tag": "Sample profile",
    "description": "A fictional mentor exploring simple digital tools, product experiments and better customer experiences.",
    "image": "/assets/sample-mentor-4.svg",
    "alt": "Illustrated placeholder for a fictional mentor"
  }
];

export const SAMPLE_STORIES = [
  {
    "id": "sample-food",
    "name": "Kavya More",
    "business": "Sahyadri Kitchen",
    "sector": "Food & Local Products",
    "city": "Pune",
    "title": "From family recipes to a local food brand",
    "description": "In this fictional journey, Kavya tests a small menu with neighbours, refines her packaging and builds a repeat-order routine before expanding her range.",
    "lesson": "Start small, listen to customers and improve one step at a time."
  },
  {
    "id": "sample-craft",
    "name": "Nikhil Jadhav",
    "business": "Mati Craft Studio",
    "sector": "Craft & Creative Enterprise",
    "city": "Kolhapur",
    "title": "Giving traditional craft a new storefront",
    "description": "This sample story follows Nikhil as he photographs handmade products, creates a simple catalogue and connects with local retailers through community introductions.",
    "lesson": "Make your work easy to discover and simple to buy."
  },
  {
    "id": "sample-service",
    "name": "Priya Sawant",
    "business": "Udaan Digital Services",
    "sector": "Digital Services",
    "city": "Nashik",
    "title": "Turning a practical skill into a service",
    "description": "In this illustrative story, Priya helps neighbourhood shops manage their online presence, defines clear service packages and grows through referrals.",
    "lesson": "Solve a specific problem and build trust with consistent service."
  }
];

export const SAMPLE_MILESTONES = [
  {
    "period": "2016",
    "title": "The first community circle",
    "desc": "A sample starting point: a small group comes together to share business ideas and discuss the challenges of getting started.",
    "badge": "Sample milestone"
  },
  {
    "period": "2018",
    "title": "Learning through local workshops",
    "desc": "An illustrative next chapter introduces practical sessions on planning, customer discovery and running a small enterprise.",
    "badge": "Sample milestone"
  },
  {
    "period": "2020",
    "title": "Conversations move online",
    "desc": "This fictional timeline explores online mentoring sessions and peer discussions that help founders stay connected.",
    "badge": "Sample milestone"
  },
  {
    "period": "2023",
    "title": "Building connections across districts",
    "desc": "A sample growth chapter brings local business circles together to exchange experiences and explore collaborations.",
    "badge": "Sample milestone"
  },
  {
    "period": "2026",
    "title": "A new generation of founders",
    "desc": "An illustrative milestone focuses on helping first-time founders test ideas, find guidance and build lasting community relationships.",
    "badge": "Sample milestone"
  }
];
