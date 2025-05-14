export type ThemeMode = "light" | "dark" | "system";
export type EventStyle = "default" | "minimal" | "modern";

export interface User {
  id: string;
  email?: string;
  name?: string;
  avatar?: string;
}

export interface EventAttendee {
  id: string;
  user?: User;
  email?: string;
  status?: string;
}

export interface EventDetail {
  id: string;
  title: string;
  description: string;
  coverImage?: string;
  posterImage?: string;
  image?: string;
  startTime: string;
  endTime: string;
  location?: string;
  city?: string;
  fullAddress?: string;
  isOnline: boolean;
  eventColor?: string;
  fontStyle?: string;
  themeMode?: ThemeMode;
  style?: EventStyle;
  createdBy: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt?: string;
  calendarId?: string;
  attendees?: EventAttendee[];
  featured?: boolean;
  featuredLocation?: string;
  organizers?: any[];
  hosts?: string[];
}

export interface EventWithUI extends EventDetail {
  myRegistrationId?: string;
  attendeeCount: number;
  requiresApproval: boolean;
  isUserEvent: boolean;
  dateLabel: string;
  dayLabel: string;
  displayTime?: string;
}
