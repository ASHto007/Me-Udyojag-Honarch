import { SAMPLE_EVENTS } from './sampleContent';
/**
 * Events Data Model & Repository
 * 
 * Verifiable event records categorized into Upcoming and Past events.
 * Timings reflect local Asia/Kolkata timezone.
 */

export interface EventItem {
  id: string;
  title: string;
  marathiTitle?: string;
  date: string;
  time?: string;
  location: string;
  description: string;
  statusBadge: string;
  statusType: 'open' | 'invitation' | 'closed' | 'postponed' | 'cancelled';
  image: string;
  isFeatured?: boolean;
  type: 'upcoming' | 'past';
  allowsEnquiry: boolean;
  isSample?: boolean;
  photosAnchor?: string;
  recapNote?: string;
}

// Sample records for the requested preview.
export const EVENTS_DATA: EventItem[] = SAMPLE_EVENTS;
