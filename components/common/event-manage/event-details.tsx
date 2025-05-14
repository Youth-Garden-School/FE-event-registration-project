"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, MapPin, Users, Trash2, Edit, Save, Clock, Upload } from "lucide-react"
import { format, parseISO } from "date-fns"
import { vi } from "date-fns/locale"
import type { EventDetail } from "@/lib/api-event"
import { updateEvent } from "@/lib/api-event"
import { supabase } from "@/lib/supabase"
// import { toast } from "@/components/ui/use-toast"

interface EventDetailsProps {
  event: EventDetail
  registrationsCount: number
  onEventUpdated: (event: EventDetail) => void
  onDeleteClick: () => void
}

export function EventDetailsComponent({ event, registrationsCount, onEventUpdated, onDeleteClick }: EventDetailsProps) {
  const [editMode, setEditMode] = useState(false)
  const [editedEvent, setEditedEvent] = useState<EventDetail>(event)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Các state cho thời gian tùy chỉnh để tránh hiển thị SA/CH
  const [startHour, setStartHour] = useState<string>(
    editedEvent.startTime ? new Date(editedEvent.startTime).getHours().toString().padStart(2, "0") : "00",
  )
  const [startMinute, setStartMinute] = useState<string>(
    editedEvent.startTime ? new Date(editedEvent.startTime).getMinutes().toString().padStart(2, "0") : "00",
  )
  const [endHour, setEndHour] = useState<string>(
    editedEvent.endTime ? new Date(editedEvent.endTime).getHours().toString().padStart(2, "0") : "00",
  )
  const [endMinute, setEndMinute] = useState<string>(
    editedEvent.endTime ? new Date(editedEvent.endTime).getMinutes().toString().padStart(2, "0") : "00",
  )

  // Format date and time
  const formatDateTime = (dateString: string) => {
    try {
      const date = parseISO(dateString)
      return format(date, "dd/MM/yyyy HH:mm", { locale: vi })
    } catch (e) {
      return dateString
    }
  }

  // Handle input changes in edit mode
  const handleInputChange = (field: string, value: string) => {
    setEditedEvent({
      ...editedEvent,
      [field]: value,
    })
  }

  // Cập nhật thời gian bắt đầu
  const updateStartTime = () => {
    const dateObj = new Date(editedEvent.startTime)
    dateObj.setHours(Number(startHour), Number(startMinute), 0, 0)
    handleInputChange("startTime", dateObj.toISOString())
  }

  // Cập nhật thời gian kết thúc
  const updateEndTime = () => {
    const dateObj = new Date(editedEvent.endTime)
    dateObj.setHours(Number(endHour), Number(endMinute), 0, 0)
    handleInputChange("endTime", dateObj.toISOString())
  }

  // Sanitize file name for Supabase storage
  const sanitizeFileName = (name: string) => {
    return name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9._-]/g, "")
      .toLowerCase()
  }

  // Handle file upload to Supabase
  const handleFileUpload = async (file: File) => {
    if (!file) return

    // Validate file
    if (!["image/jpeg", "image/png", "image/gif"].includes(file.type) || file.size > 5 * 1024 * 1024) {
      setError("Chỉ hỗ trợ ảnh JPG, PNG, GIF nhỏ hơn 5MB")
      return
    }

    setUploading(true)
    setError(null)

    try {
      // Upload to Supabase
      const sanitizedName = sanitizeFileName(file.name)
      const fileName = `events/${event.id}/${Date.now()}_${sanitizedName}`

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(fileName, file, { cacheControl: "3600", upsert: false })

      if (uploadError) throw new Error(uploadError.message)

      const { data: urlData } = supabase.storage.from("images").getPublicUrl(fileName)

      if (!urlData.publicUrl) throw new Error("Không thể lấy URL ảnh")

      // Update event with new cover image URL
      handleInputChange("coverImage", urlData.publicUrl)
      // Ảnh đã được cập nhật thành công
    } catch (err: any) {
      console.error("Upload Error:", err)
      setError(err.message || "Tải ảnh thất bại")
    } finally {
      setUploading(false)
    }
  }

  // Handle event update
  const handleSaveChanges = async () => {
    setSaving(true)
    setError(null)

    try {
      const response = await updateEvent(event.id, {
        title: editedEvent.title,
        description: editedEvent.description,
        coverImage: editedEvent.coverImage,
        startTime: editedEvent.startTime,
        endTime: editedEvent.endTime,
        location: editedEvent.location,
      })

      onEventUpdated(response.data.result)
      setEditMode(false)
      // Sự kiện đã được cập nhật thành công
    } catch (err) {
      console.error("Error updating event:", err)
      setError(err instanceof Error ? err.message : "Đã xảy ra lỗi khi cập nhật sự kiện")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Event image */}
      <div className="relative h-48">
        <Image
          src={editedEvent.coverImage || "/placeholder.svg?height=400&width=600"}
          alt={event.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {editMode && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/gif"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleFileUpload(file)
              }}
            />
            <Button
              variant="secondary"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="gap-2"
            >
              {uploading ? (
                <>
                  <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                  <span>Đang tải...</span>
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  <span>Tải ảnh lên</span>
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Event info */}
      <div className="p-4">
        {editMode ? (
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Tiêu đề
              </label>
              <Input
                id="title"
                value={editedEvent.title || ""}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Nhập tiêu đề sự kiện"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">Thời gian</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full border-2 border-blue-500 bg-white flex-shrink-0 mr-2"></div>
                    <label htmlFor="startDate" className="text-sm font-medium">
                      Bắt đầu
                    </label>
                  </div>
                  <Input
                    id="startDate"
                    type="date"
                    value={editedEvent.startTime ? new Date(editedEvent.startTime).toISOString().split("T")[0] : ""}
                    onChange={(e) => {
                      // Lấy ngày mới
                      const [y, m, d] = e.target.value.split("-").map(Number)
                      // Khởi tạo Date object từ giá trị cũ
                      const dateObj = new Date(editedEvent.startTime)
                      // Cập nhật ngày trên local
                      dateObj.setFullYear(y, m - 1, d)
                      // Giữ nguyên giờ và phút hiện tại
                      dateObj.setHours(Number(startHour), Number(startMinute), 0, 0)
                      handleInputChange("startTime", dateObj.toISOString())
                    }}
                    className="mb-2"
                  />

                  {/* Thay thế input time bằng select giờ và phút */}
                  <div className="flex gap-2 items-center">
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={startHour}
                      onChange={(e) => {
                        setStartHour(e.target.value)
                        setTimeout(updateStartTime, 0)
                      }}
                    >
                      {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                        <option key={hour} value={hour.toString().padStart(2, "0")}>
                          {hour.toString().padStart(2, "0")}
                        </option>
                      ))}
                    </select>
                    <span>:</span>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={startMinute}
                      onChange={(e) => {
                        setStartMinute(e.target.value)
                        setTimeout(updateStartTime, 0)
                      }}
                    >
                      {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                        <option key={minute} value={minute.toString().padStart(2, "0")}>
                          {minute.toString().padStart(2, "0")}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full border-2 border-gray-300 bg-white flex-shrink-0 mr-2"></div>
                    <label htmlFor="endDate" className="text-sm font-medium">
                      Kết thúc
                    </label>
                  </div>
                  <Input
                    id="endDate"
                    type="date"
                    value={editedEvent.endTime ? new Date(editedEvent.endTime).toISOString().split("T")[0] : ""}
                    onChange={(e) => {
                      const [y, m, d] = e.target.value.split("-").map(Number)
                      const dateObj = new Date(editedEvent.endTime)
                      dateObj.setFullYear(y, m - 1, d)
                      dateObj.setHours(Number(endHour), Number(endMinute), 0, 0)
                      handleInputChange("endTime", dateObj.toISOString())
                    }}
                    className="mb-2"
                  />

                  {/* Thay thế input time bằng select giờ và phút */}
                  <div className="flex gap-2 items-center">
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={endHour}
                      onChange={(e) => {
                        setEndHour(e.target.value)
                        setTimeout(updateEndTime, 0)
                      }}
                    >
                      {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                        <option key={hour} value={hour.toString().padStart(2, "0")}>
                          {hour.toString().padStart(2, "0")}
                        </option>
                      ))}
                    </select>
                    <span>:</span>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={endMinute}
                      onChange={(e) => {
                        setEndMinute(e.target.value)
                        setTimeout(updateEndTime, 0)
                      }}
                    >
                      {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                        <option key={minute} value={minute.toString().padStart(2, "0")}>
                          {minute.toString().padStart(2, "0")}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">Địa điểm</span>
              </div>
              <Input
                id="location"
                value={editedEvent.location || ""}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="Địa điểm trực tiếp hoặc liên kết ảo"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Edit className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">Mô tả</span>
              </div>
              <Textarea
                id="description"
                value={editedEvent.description || ""}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={3}
                placeholder="Mô tả về sự kiện của bạn"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex gap-2 pt-4">
              <Button onClick={handleSaveChanges} className="flex-1 gap-2" disabled={saving}>
                <Save className="h-4 w-4" />
                <span>{saving ? "Đang lưu..." : "Lưu thay đổi"}</span>
              </Button>
              <Button variant="outline" onClick={() => setEditMode(false)} className="flex-1">
                Hủy
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-bold">{event.title}</h2>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setEditMode(true)}
                aria-label="Chỉnh sửa"
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="h-4 w-4 flex-shrink-0" />
                <span>{formatDateTime(event.startTime)}</span>
              </div>

              <div className="flex items-start gap-2 text-gray-600">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-1" />
                <span>{event.location}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <Users className="h-4 w-4 flex-shrink-0" />
                <span>{registrationsCount} người đã đăng ký</span>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium mb-2">Mô tả</h3>
              <p className="text-gray-600 text-sm">{event.description}</p>
            </div>

            <div className="border-t pt-4 mt-4">
              <Button variant="destructive" className="w-full" onClick={onDeleteClick} aria-label="Xóa sự kiện">
                <Trash2 className="h-4 w-4 mr-2" />
                <span>Xóa sự kiện</span>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
