// lib/api-calendar.ts

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  coverImage?: string;
  startTime: string;
  endTime: string;
  location?: string;
  isOnline: boolean;
  eventColor?: string;
  fontStyle?: string;
  themeMode?: string;
  style?: string;
  seasonalTheme?: string;
  requiresApproval?: boolean;
  attendees?: any[];
  category?: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

export interface Calendar {
  id: string;
  name: string;
  color: string;
  coverImage?: string;
  avatarImage?: string;
  description?: string;
  events?: CalendarEvent[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://be-event-registration-project-jpv3.onrender.com/api";

function getAuthHeaders(): Record<string,string> {
  if (typeof window === "undefined") return { "Content-Type": "application/json" };
  const token = localStorage.getItem("ACCESS_TOKEN");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

/**  
 * Lấy tất cả calendars  
 * GET /calendars  
 */
export async function fetchAllCalendars(): Promise<Calendar[]> {
  const res = await fetch(`${API_BASE_URL}/calendars`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    throw new Error(`Error fetching calendars: ${res.status}`);
  }
  const { result } = await res.json();
  return result as Calendar[];
}

/**  
 * Lấy chi tiết một calendar (có kèm events)  
 * GET /calendars/:id  
 */
export async function getCalendarById(
  id: string
): Promise<Calendar> {
  const res = await fetch(`${API_BASE_URL}/calendars/${id}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    throw new Error(`Error fetching calendar ${id}: ${res.status}`);
  }
  const { result } = await res.json();
  return result as Calendar;
}

/**  
 * Helper: chỉ lấy mảng events từ calendar  
 */
export async function fetchCalendarEvents(
  id: string
): Promise<CalendarEvent[]> {
  const cal = await getCalendarById(id);
  return cal.events ?? [];
}

/**  
 * Tạo mới một calendar  
 * POST /calendars  
 */
export async function createCalendar(input: {
  name: string;
  color: string;
  coverImage?: string;
  avatarImage?: string;
  description?: string;
}): Promise<Calendar> {
  const res = await fetch(`${API_BASE_URL}/calendars`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    throw new Error(`Error creating calendar: ${res.status}`);
  }
  const { result } = await res.json();
  return result as Calendar;
}

/**  
 * Cập nhật calendar  
 * PUT /calendars/:id  
 */
export async function updateCalendar(
  id: string,
  updates: {
    name?: string;
    color?: string;
    coverImage?: string;
    avatarImage?: string;
    description?: string;
  }
): Promise<Calendar> {
  const res = await fetch(`${API_BASE_URL}/calendars/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(updates),
  });
  if (!res.ok) {
    throw new Error(`Error updating calendar ${id}: ${res.status}`);
  }
  const { result } = await res.json();
  return result as Calendar;
}

/**  
 * Xóa calendar  
 * DELETE /calendars/:id  
 */
export async function deleteCalendar(
  id: string
): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/calendars/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    throw new Error(`Error deleting calendar ${id}: ${res.status}`);
  }
}

/**
 * Thêm sự kiện vào 1 calendar
 * POST /calendars/:id/events
 * body: ["eventId1", "eventId2", …]
 */
export async function addEventsToCalendar(
  calendarId: string,
  eventIds: string[]
): Promise<{ code: number; message: string }> {
  const res = await fetch(`${API_BASE_URL}/calendars/${calendarId}/events`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(eventIds),
  });
  if (!res.ok) {
    throw new Error(`Error adding events to calendar ${calendarId}: ${res.status}`);
  }
  return await res.json();
}

export async function deleteEventFromCalendar(
  calendarId: string,
  eventId: string
): Promise<{ code: number; message: string }> {
  const res = await fetch(
    `${API_BASE_URL}/calendars/${calendarId}/events/${eventId}`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
    }
  );
  if (!res.ok) {
    throw new Error(
      `Error deleting event ${eventId} from calendar ${calendarId}: ${res.status}`
    );
  }
  return await res.json();
}