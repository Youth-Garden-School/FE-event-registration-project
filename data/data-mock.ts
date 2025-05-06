import { parseISO } from "date-fns"

export const calendarData = {
  id: "01969ef1-71f4-7834-b73b-b96774ba8eda",
  name: "Updated Calendar #10",
  color: "#000000",
  description: "best",
  coverImage: "https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/Image%20FP_2024/hinh-anime-2.jpg",
  avatarImage: "https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/Image%20FP_2024/hinh-anime-2.jpg",
  userId: null,
  events: [
    {
      id: "01969ef5-0ea1-7d84-a32d-adcdaec7ffd1",
      title: "anime hay",
      description: "best",
      coverImage:
        "https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/Image%20FP_2024/hinh-anime-2.jpg",
      startTime: "2027-12-01T09:00:00",
      endTime: "2027-12-01T17:00:00",
      location: "Số 1 phố Cầu Giấy, P.Láng Thượng, Q.Đống Đa, Hà Nội.",
      isOnline: false,
      eventColor: "#FF5733",
      fontStyle: "Arial",
      themeMode: "LIGHT",
      style: "EMOJI",
      seasonalTheme: "SPRING",
      requiresApproval: false,
      attendees: [],
      category: null,
      createdAt: "2025-05-05T05:39:42.369576",
      updatedAt: "2025-05-05T05:40:12.085298",
      createdBy: "01968c61-bc2c-7336-bdba-6a7afb7dda2a",
      updatedBy: "01968c61-bc2c-7336-bdba-6a7afb7dda2a",
    },
  ],
  createdAt: "2025-05-05T05:35:45.652799",
  updatedAt: "2025-05-05T05:36:04.363561",
}

// Thêm một số sự kiện mẫu để demo
export const additionalEvents = [
  {
    id: "01969ef5-0ea1-7d84-a32d-adcdaec7ffd2",
    title: "Workshop Thiết kế UX/UI",
    description: "Học cách thiết kế giao diện người dùng hiệu quả và trải nghiệm người dùng tốt nhất",
    coverImage: "/placeholder.svg?height=400&width=400",
    startTime: "2025-06-15T10:00:00",
    endTime: "2025-06-15T16:00:00",
    location: "Tòa nhà Innovation, 123 Nguyễn Huệ, Quận 1, TP.HCM",
    isOnline: false,
    eventColor: "#4287f5",
    fontStyle: "Roboto",
    themeMode: "LIGHT",
    style: "MINIMAL",
    seasonalTheme: "SUMMER",
    requiresApproval: true,
    attendees: [
      { id: "user1", name: "Nguyễn Văn A", email: "nguyenvana@example.com" },
      { id: "user2", name: "Trần Thị B", email: "tranthib@example.com" },
      { id: "user3", name: "Lê Văn C", email: "levanc@example.com" },
    ],
    category: "workshop",
    createdAt: "2025-05-01T08:30:00.000000",
    updatedAt: "2025-05-01T08:30:00.000000",
    createdBy: "01968c61-bc2c-7336-bdba-6a7afb7dda2a",
    updatedBy: "01968c61-bc2c-7336-bdba-6a7afb7dda2a",
  },
  {
    id: "01969ef5-0ea1-7d84-a32d-adcdaec7ffd3",
    title: "Hội thảo Công nghệ AI",
    description: "Khám phá những tiến bộ mới nhất trong lĩnh vực trí tuệ nhân tạo và ứng dụng thực tế",
    coverImage: "/placeholder.svg?height=400&width=400",
    startTime: "2025-07-20T09:00:00",
    endTime: "2025-07-20T17:00:00",
    location: null,
    isOnline: true,
    eventColor: "#28a745",
    fontStyle: "Montserrat",
    themeMode: "DARK",
    style: "TECH",
    seasonalTheme: "NONE",
    requiresApproval: false,
    attendees: [
      { id: "user4", name: "Phạm Thị D", email: "phamthid@example.com" },
      { id: "user5", name: "Hoàng Văn E", email: "hoangvane@example.com" },
    ],
    category: "tech",
    createdAt: "2025-05-02T10:15:00.000000",
    updatedAt: "2025-05-02T10:15:00.000000",
    createdBy: "01968c61-bc2c-7336-bdba-6a7afb7dda2a",
    updatedBy: "01968c61-bc2c-7336-bdba-6a7afb7dda2a",
  },
  {
    id: "01969ef5-0ea1-7d84-a32d-adcdaec7ffd4",
    title: "Triển lãm Nghệ thuật Số",
    description: "Khám phá các tác phẩm nghệ thuật số từ các nghệ sĩ hàng đầu Việt Nam và quốc tế",
    coverImage: "/placeholder.svg?height=400&width=400",
    startTime: "2025-05-10T10:00:00",
    endTime: "2025-05-15T18:00:00",
    location: "Bảo tàng Mỹ thuật, 97 Phố Nguyễn Thái Học, Ba Đình, Hà Nội",
    isOnline: false,
    eventColor: "#9c27b0",
    fontStyle: "Playfair Display",
    themeMode: "LIGHT",
    style: "ARTISTIC",
    seasonalTheme: "SPRING",
    requiresApproval: false,
    attendees: [
      { id: "user6", name: "Ngô Thị F", email: "ngothif@example.com" },
      { id: "user7", name: "Đặng Văn G", email: "dangvang@example.com" },
      { id: "user8", name: "Vũ Thị H", email: "vuthih@example.com" },
      { id: "user9", name: "Bùi Văn I", email: "buivani@example.com" },
    ],
    category: "art",
    createdAt: "2025-04-15T14:20:00.000000",
    updatedAt: "2025-04-15T14:20:00.000000",
    createdBy: "01968c61-bc2c-7336-bdba-6a7afb7dda2a",
    updatedBy: "01968c61-bc2c-7336-bdba-6a7afb7dda2a",
  },
  {
    id: "01969ef5-0ea1-7d84-a32d-adcdaec7ffd5",
    title: "Hội nghị Phát triển Bền vững",
    description: "Thảo luận về các giải pháp phát triển bền vững và bảo vệ môi trường",
    coverImage: "/placeholder.svg?height=400&width=400",
    startTime: "2025-04-22T08:30:00",
    endTime: "2025-04-22T16:30:00",
    location: "Trung tâm Hội nghị Quốc gia, 57 Phạm Hùng, Cầu Giấy, Hà Nội",
    isOnline: false,
    eventColor: "#2e7d32",
    fontStyle: "Lato",
    themeMode: "LIGHT",
    style: "PROFESSIONAL",
    seasonalTheme: "NONE",
    requiresApproval: true,
    attendees: [
      { id: "user10", name: "Trương Văn K", email: "truongvank@example.com" },
      { id: "user11", name: "Lý Thị L", email: "lythil@example.com" },
    ],
    category: "conference",
    createdAt: "2025-03-10T09:45:00.000000",
    updatedAt: "2025-03-10T09:45:00.000000",
    createdBy: "01968c61-bc2c-7336-bdba-6a7afb7dda2a",
    updatedBy: "01968c61-bc2c-7336-bdba-6a7afb7dda2a",
  },
]

// Kết hợp sự kiện gốc và sự kiện bổ sung
export const events = [calendarData.events[0], ...additionalEvents]

// Tạo các ngày có sự kiện để hiển thị trên lịch
export const highlightedDays = events
  .map((event) => {
    if (!event.startTime) return null
    return typeof event.startTime === "string" ? parseISO(event.startTime) : event.startTime
  })
  .filter((date): date is Date => date !== null)

// Dữ liệu cộng đồng
export const communityData = {
  name: calendarData.name,
  description:
    calendarData.description || "Sự kiện cho các nhà thiết kế và người sáng tạo trên khắp SF, trực tuyến và thế giới!",
  website: "https://designbuddies.community",
  founder: "Grace Ling",
  timezone: "UTC",
  currentTime: "5:50 AM",
  logo: "/placeholder.svg?height=60&width=60",
}

// Danh mục sự kiện
export const eventCategories = [
  {
    id: "workshop",
    name: "Workshop",
    count: 1,
    color: "purple",
  },
  {
    id: "tech",
    name: "Công nghệ",
    count: 1,
    color: "green",
  },
  {
    id: "art",
    name: "Nghệ thuật",
    count: 1,
    color: "blue",
  },
  {
    id: "conference",
    name: "Hội nghị",
    count: 1,
    color: "orange",
  },
]

// Dữ liệu ảnh collage
export const collageImages = ["/placeholder.svg?height=150&width=250"]
