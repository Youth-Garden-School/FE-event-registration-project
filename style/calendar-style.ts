export interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode | string;
}

export interface ProfileData {
  name: string;
  description: string;
  coverImage: string;
  logoImage: string;
  timeZone: string;
  currentTime: string;
  socialLinks: SocialLink[];
}

export interface CommunityData {
  name: string;
  description: string;
  website: string;
  founder: string;
  timezone: string;
  currentTime: string;
  logo: string;
}

export interface EventCategory {
  id: string;
  name: string;
  count: number;
  color: string;
}

export interface Event {
  id: number;
  title: string;
  date: Date;
  time: string;
  hosts: string[];
  type: string;
  image: string;
  attendees: number;
  location?: string;
}
