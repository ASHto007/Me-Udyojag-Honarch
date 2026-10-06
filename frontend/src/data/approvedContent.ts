/**
 * Master Approved Content Hub
 * 
 * Re-exports all verified domain data from their dedicated, separated data files.
 * This maintains full backwards compatibility with any existing components.
 * 
 * To add or modify data, edit the dedicated files directly:
 * - Mentors:     src/data/mentorsData.ts
 * - Milestones:   src/data/milestonesData.ts
 * - Stories:      src/data/storiesData.ts
 * - Statistics:   src/data/statisticsData.ts
 * - Awards:       src/data/awardsData.ts
 * - Founder:      src/data/founderData.ts
 */

export * from './mentorsData';
export * from './milestonesData';
export * from './storiesData';
export * from './statisticsData';
export * from './awardsData';
export * from './founderData';
