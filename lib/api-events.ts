// lib/api-event.ts
import api from "./api";

export interface EventDetail {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  startTime: string;
  endTime: string;
  location: string;
  isOnline: boolean;
  // …các field khác mà backend trả
}

export interface Registration {
  id: string;
  status: string;
  createdAt: string;
  // …các field khác
}

// Lấy chi tiết event
export async function getEventById(id: string): Promise<EventDetail> {
  const { data } = await api.get<{ result: EventDetail }>(`/events/${id}`);
  return data.result;
}

// Lấy đăng ký của chính user
export async function getMyRegistration(
  eventId: string,
): Promise<Registration | null> {
  const { data } = await api.get<{ result: Registration[] }>(
    `/events/${eventId}/registrations/me`,
  );
  return data.result.length ? data.result[0] : null;
}

// Đăng ký
export async function registerEvent(eventId: string): Promise<Registration> {
  const { data } = await api.post<{ result: Registration }>(
    `/events/${eventId}/registrations`,
  );
  return data.result;
}

// Hủy đăng ký
export async function cancelRegistration(
  registrationId: string,
): Promise<Registration> {
  const { data } = await api.put<{ result: Registration }>(
    `/registrations/${registrationId}/cancel`,
  );
  return data.result;
}
