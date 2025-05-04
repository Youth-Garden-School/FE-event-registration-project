// lib/api-events.ts
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
  // …các field khác backend trả
}

export interface Registration {
  id: string;
  eventId: string;
  userId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  // …các field khác nếu cần
}

// 1) GET /events/:id
export async function getEventById(id: string): Promise<EventDetail> {
  const { data } = await api.get<{ result: EventDetail }>(`/events/${id}`);
  return data.result;
}

// 2) GET My Registration cho event này
export async function getMyRegistration(
  eventId: string,
): Promise<Registration | null> {
  // Kết quả tạm thời
  let regs: Registration[] = [];

  // Thử endpoint /events/:id/registrations/me
  try {
    const { data } = await api.get<{ result?: Registration[] }>(
      `/events/${eventId}/registrations/me`,
    );
    if (Array.isArray(data.result)) {
      regs = data.result;
    }
  } catch (_err) {
    // bỏ qua, sẽ fallback
  }

  // Nếu chưa có kết quả, fallback sang /registrations/me rồi filter
  if (!regs.length) {
    try {
      const { data } = await api.get<{ result?: Registration[] }>(
        `/registrations/me`,
      );
      if (Array.isArray(data.result)) {
        regs = data.result.filter((r) => r.eventId === eventId);
      }
    } catch (_err) {
      // bỏ qua
    }
  }

  return regs.length > 0 ? regs[0] : null;
}

// 3) POST /events/:id/registrations
export async function registerEvent(eventId: string): Promise<Registration> {
  const { data } = await api.post<{ result: Registration }>(
    `/events/${eventId}/registrations`,
  );
  return data.result;
}

// 4) PUT /registrations/:id/cancel
export async function cancelRegistration(
  registrationId: string,
): Promise<Registration> {
  const { data } = await api.put<{ result: Registration }>(
    `/registrations/${registrationId}/cancel`,
  );
  return data.result;
}
