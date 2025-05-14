// lib/api-event.ts

import api from './api'               // axios instance với baseURL + auth interceptor

/** Envelope chung cho mọi response từ API */
interface ApiResponse<T> {
  code: number
  message: string
  result: T
}

/** Wrapper paging trả về từ backend */
export interface PagedResult<T> {
  content: T[]
  pageNumber: number
  pageSize: number
  totalPages: number
  totalElements: number
  first: boolean
  last: boolean
}

/** Model User tối thiểu */
export interface User {
  id: string
  username?: string
  email?: string
  // …các field khác nếu cần
}

/** Chi tiết Event */
export interface EventDetail {
  id: string
  title: string
  description: string
  coverImage: string
  startTime: string
  endTime: string
  location: string
  isOnline: boolean
  eventColor?: string
  fontStyle?: string
  themeMode?: string
  style?: string
  seasonalTheme?: string
  requiresApproval?: boolean
  category?: string | null
  createdAt: string
  updatedAt: string
  createdBy: string
  updatedBy: string
}

/** Model Registration */
export interface Registration {
  id: string
  event: EventDetail
  user: User
  status: string
  registeredAt: string
  notes?: string
  createdAt: string
  updatedAt: string
  createdBy: string
  updatedBy: string
}

/** Payload đăng ký khách mời */
export interface GuestInfo {
  firstName: string
  lastName: string
  email: string
  notes?: string
}

/** ============================
 *  Event CRUD Endpoints
 * ============================ */

/** Tạo mới một event */
export const createEvent = (payload: Partial<EventDetail>) =>
  api.post<ApiResponse<EventDetail>>('/events', payload)

/** Cập nhật event theo ID */
export const updateEvent = (eventId: string, payload: Partial<EventDetail>) =>
  api.put<ApiResponse<EventDetail>>(`/events/${eventId}`, payload)

/** Lấy chi tiết 1 event theo ID */
export const getEvent = (eventId: string) =>
  api.get<ApiResponse<EventDetail>>(`/events/${eventId}`)

/** Lấy danh sách tất cả events */
export const getAllEvents = () =>
  api.get<ApiResponse<EventDetail[]>>('/events')

/** Xóa 1 event theo ID */
export const deleteEvent = (eventId: string) =>
  api.delete<ApiResponse<null>>(`/events/${eventId}`)

/** ============================
 *  Registration Endpoints
 * ============================ */

/** Đăng ký tham gia event (user đã login) */
export const registerEvent = (eventId: string) =>
  api.post<ApiResponse<Registration>>(`/events/${eventId}/registrations`, {})

/** Đăng ký khách cho event */
export const registerGuestEvent = (eventId: string, guest: GuestInfo) =>
  api.post<ApiResponse<Registration>>(
    `/events/${eventId}/registrations/guest`,
    guest
  )

/**
 * Lấy registrations của 1 event
 * → POST /events/{eventId}/registrations/get với body pagination
 */
export const getEventRegistrations = (
  eventId: string,
  page = 0,
  size = 10,
  sortBy: string = 'createdAt'
) =>
  api.post<ApiResponse<PagedResult<Registration>>>(
    `/events/${eventId}/registrations/get`,
    { page, size, sortBy }
  )

/**
 * Lấy tất cả registrations của user hiện tại
 * → POST /registrations/me với body pagination
 */
export const getUserRegistrations = (
  page = 0,
  size = 10,
  sortBy: string = 'createdAt'
) =>
  api.post<ApiResponse<PagedResult<Registration>>>(
    '/registrations/me',
    { page, size, sortBy }
  )

/** Hủy một registration theo ID */
export const cancelRegistration = (registrationId: string) =>
  api.put<ApiResponse<null>>(
    `/registrations/${registrationId}/cancel`,
    {}
  )


