// Enum cho chế độ nền / Enum for theme mode
// export enum ThemeMode {
//   LIGHT = "LIGHT",
//   DARK = "DARK",
// }

// // Enum cho phong cách sự kiện / Enum for event style
// export enum EventStyle {
//   EMOJI = "EMOJI", // Biểu tượng cảm xúc
//   GLITTER = "GLITTER", // Kim tuyến
//   ZIGZAG = "ZIGZAG", // Mẫu zigzag
//   MINIMAL = "MINIMAL", // Tối giản
//   CUSTOM = "CUSTOM", // Tùy chỉnh khác
// }

// // Enum cho chủ đề theo mùa / Enum for seasonal theme
// export enum SeasonalTheme {
//   SPRING = "SPRING", // Xuân
//   SUMMER = "SUMMER", // Hạ
//   AUTUMN = "AUTUMN", // Thu
//   WINTER = "WINTER", // Đông
// }

export interface Event {
  id: string;
  title: string;
  description?: string;
  coverImage?: string;
  startTime: string;
  endTime?: string;
  location?: string;
  isOnline: boolean;
  calendarId: string;
  eventColor?: string;
  fontStyle?: string;
  // themeMode?: ThemeMode;
  // style?: EventStyle;
  // seasonalTheme?: SeasonalTheme;
  requiresApproval: boolean;
  organizer?: string; // Tổ chức/người tổ chức sự kiện
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  attendees: EventAttendee[];
  isOrganizer?: boolean; // Người dùng hiện tại có phải là người tổ chức không
}

export interface EventAttendee {
  email: string;
  id?: string;
}

export interface Calendar {
  id: string;
  name: string;
  color?: string;
  events: Event[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

// Helper types for UI
export interface EventWithUI {
  id: string;
  title: string;
  description?: string;
  coverImage?: string;
  startTime: string;
  endTime: string;
  location?: string;
  isOnline: boolean;
  eventColor?: string;
  attendees: EventAttendee[];
  dateLabel: string;
  dayLabel: string;
  displayTime: string;
  isRegistered: boolean;
  calendarId: string;
  requiresApproval: boolean;
  isUserEvent: boolean;
}

export interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventWithUI;
  registrationId?: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
