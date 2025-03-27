import type {
  EventWithUI,
  ThemeMode,
  EventStyle,
  SeasonalTheme,
} from "../style/events-stype";

// Hàm format thời gian / Time formatting function
const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("vi-VN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

const formatTime = (date: Date): string => {
  return new Intl.DateTimeFormat("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

// Lấy ngày hiện tại để phân loại sự kiện / Get current date to categorize events
const currentDate = new Date();

// Danh sách tất cả sự kiện / List of all events
export const events: EventWithUI[] = [
  {
    id: "1",
    title: "Chung kết Web3 Ideathon 2025",
    description:
      "Sự kiện chung kết cuộc thi Web3 Ideathon 2025 - Nơi hội tụ những ý tưởng đột phá về Web3 và blockchain. Tham gia cùng chúng tôi để chứng kiến những dự án xuất sắc nhất và cơ hội networking với các chuyên gia hàng đầu.",
    startTime: new Date("2024-06-28T13:30:00").toISOString(),
    endTime: new Date("2024-06-28T17:00:00").toISOString(),
    displayTime: "13:30 - 17:00",
    displayDate: "Thứ Sáu, ngày 28 tháng 6 năm 2024",
    organizer: "VBI Academy & GFI - Golden Financial Innovation",
    location: "Hội trường Thành ủy, 272 Võ Thị Sáu, Quận 3, TP.HCM",
    isOnline: false,
    calendarId: "cal_1",
    coverImage: "/images/events/ideathon-summer.jpg",
    requiresApproval: false,
    dateLabel: "28 Th6",
    dayLabel: "Thứ Sáu",
    eventColor: "#FF9933", // Màu cam ấm áp cho mùa hè
    fontStyle: "Montserrat",
    themeMode: "LIGHT" as ThemeMode,
    style: "EMOJI" as EventStyle,
    seasonalTheme: "SUMMER" as SeasonalTheme,
    attendees: [
      {
        id: "1",
        eventId: "1",
        userId: "user_1",
        email: "nguyenvana@example.com",
        status: "CONFIRMED",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "2",
        eventId: "1",
        userId: "user_2",
        email: "tranthib@example.com",
        status: "CONFIRMED",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "3",
        eventId: "1",
        email: "levanc@example.com",
        status: "PENDING",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "user_1",
    updatedBy: "user_1",
    isUserEvent: false,
    isParticipating: true,
  },
  {
    id: "2",
    title: "Blockchain Workshop Online: Từ Cơ Bản Đến Nâng Cao",
    description:
      "Workshop trực tuyến chuyên sâu về Blockchain và ứng dụng thực tế. Khám phá các khái niệm cốt lõi, smart contracts, và xu hướng mới nhất trong không gian Web3. Phù hợp cho cả người mới bắt đầu và các nhà phát triển có kinh nghiệm.",
    startTime: new Date("2024-05-29T15:30:00").toISOString(),
    endTime: new Date("2024-05-29T18:30:00").toISOString(),
    displayTime: "15:30 - 18:30",
    displayDate: "Thứ Bảy, ngày 29 tháng 5 năm 2024",
    organizer: "VBI Academy",
    isOnline: true,
    calendarId: "cal_1",
    coverImage: "/images/events/workshop-spring.jpg",
    requiresApproval: true,
    dateLabel: "29 thg 5",
    dayLabel: "Thứ Bảy",
    eventColor: "#98FB98", // Màu xanh lá nhạt cho mùa xuân
    fontStyle: "Poppins",
    themeMode: "DARK" as ThemeMode,
    style: "GLITTER" as EventStyle,
    seasonalTheme: "SPRING" as SeasonalTheme,
    attendees: [
      {
        id: "4",
        eventId: "2",
        userId: "user_3",
        email: "user1@example.com",
        status: "CONFIRMED",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "5",
        eventId: "2",
        email: "user2@example.com",
        status: "CANCELED",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "user_1",
    updatedBy: "user_1",
    isUserEvent: true,
    isParticipating: false,
  },
  {
    id: "3",
    title: "NFT Art Exhibition: Nghệ Thuật Số Trong Kỷ Nguyên Web3",
    description:
      "Triển lãm nghệ thuật NFT đột phá kết hợp công nghệ thực tế ảo (VR) và thực tế tăng cường (AR). Khám phá các tác phẩm nghệ thuật số độc đáo từ các nghệ sĩ hàng đầu trong không gian Web3. Trải nghiệm tương tác trực tiếp với nghệ thuật qua công nghệ metaverse.",
    startTime: new Date("2024-07-15T10:00:00").toISOString(),
    endTime: new Date("2024-07-15T20:00:00").toISOString(),
    organizer: "TPHCM Innovation Hub & VBI Academy",
    location: "TPHCM Innovation Hub, 232 Võ Thị Sáu, Quận 3, TP.HCM",
    isOnline: false,
    calendarId: "cal_2",
    coverImage: "/images/events/nft-art-summer.jpg",
    requiresApproval: false,
    dateLabel: "15 thg 7",
    dayLabel: "Thứ Hai",
    eventColor: "#87CEEB", // Màu xanh da trời cho mùa hè
    fontStyle: "Helvetica Neue",
    themeMode: "LIGHT" as ThemeMode,
    style: "MINIMAL" as EventStyle,
    seasonalTheme: "SUMMER" as SeasonalTheme,
    attendees: [
      {
        id: "6",
        eventId: "3",
        userId: "user_4",
        email: "artist1@example.com",
        status: "CONFIRMED",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "user_2",
    updatedBy: "user_2",
    isUserEvent: false,
    isParticipating: true,
  },
  {
    id: "4",
    title: "Winter Blockchain Summit 2024",
    description:
      "Hội nghị Blockchain mùa đông quy tụ các chuyên gia hàng đầu trong ngành. Tham gia các phiên thảo luận chuyên sâu về DeFi, NFTs, Layer 2, và tương lai của Web3. Cơ hội networking độc đáo với các nhà lãnh đạo công nghệ và đầu tư trong không gian blockchain.",
    startTime: new Date("2024-12-20T09:00:00").toISOString(),
    endTime: new Date("2024-12-20T17:00:00").toISOString(),
    organizer: "Vietnam Blockchain Innovation",
    location: "JW Marriott Hanoi, 8 Đỗ Đức Dục, Nam Từ Liêm, Hà Nội",
    isOnline: false,
    calendarId: "cal_3",
    coverImage: "/images/events/summit-winter.jpg",
    requiresApproval: true,
    dateLabel: "20 thg 12",
    dayLabel: "Thứ Sáu",
    eventColor: "#B0E0E6", // Màu xanh băng giá cho mùa đông
    fontStyle: "Playfair Display",
    themeMode: "DARK" as ThemeMode,
    style: "ZIGZAG" as EventStyle,
    seasonalTheme: "WINTER" as SeasonalTheme,
    attendees: [
      {
        id: "7",
        eventId: "4",
        userId: "user_5",
        email: "speaker1@example.com",
        status: "CONFIRMED",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "8",
        eventId: "4",
        userId: "user_6",
        email: "speaker2@example.com",
        status: "PENDING",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "user_3",
    updatedBy: "user_3",
    isUserEvent: true,
    isParticipating: true,
  },
  {
    id: "5",
    title: "Autumn DeFi Hackathon 2024",
    description:
      "48 giờ hackathon về DeFi với tổng giải thưởng lên đến $50,000. Thử thách bản thân trong việc xây dựng các giải pháp DeFi sáng tạo cùng các developer từ khắp Đông Nam Á. Mentoring từ các chuyên gia blockchain hàng đầu và cơ hội nhận đầu tư từ các quỹ crypto uy tín.",
    startTime: new Date("2024-09-15T08:00:00").toISOString(),
    endTime: new Date("2024-09-17T08:00:00").toISOString(),
    organizer: "FPT Software & VBI Academy",
    location: "Đại học FPT Hà Nội, Khu CNC Hòa Lạc, Thạch Thất, Hà Nội",
    isOnline: false,
    calendarId: "cal_4",
    coverImage: "/images/events/hackathon-autumn.jpg",
    requiresApproval: true,
    dateLabel: "15 thg 9",
    dayLabel: "Chủ Nhật",
    eventColor: "#D2691E", // Màu nâu đỏ cho mùa thu
    fontStyle: "Source Sans Pro",
    themeMode: "LIGHT" as ThemeMode,
    style: "CUSTOM" as EventStyle,
    seasonalTheme: "AUTUMN" as SeasonalTheme,
    attendees: [
      {
        id: "9",
        eventId: "5",
        userId: "user_7",
        email: "team1@example.com",
        status: "CONFIRMED",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "10",
        eventId: "5",
        userId: "user_8",
        email: "team2@example.com",
        status: "CONFIRMED",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "111",
        eventId: "5",
        userId: "user_8",
        email: "team2@example.com",
        status: "CONFIRMED",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "12",
        eventId: "5",
        userId: "user_8",
        email: "team2@example.com",
        status: "CONFIRMED",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "user_1",
    updatedBy: "user_1",
    isUserEvent: true,
    isParticipating: true,
  },
];

// Danh sách sự kiện sắp tới / Upcoming events list
export const upcomingEvents = events
  .filter((event) => new Date(event.startTime) >= currentDate)
  .sort(
    (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
  );

// Danh sách sự kiện đã qua / Past events list
export const pastEvents = events
  .filter((event) => new Date(event.startTime) < currentDate)
  .sort(
    (a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime(),
  );

// Hàm helper để lấy thông tin thời gian / Helper function to get time information
export const getEventTimeInfo = (event: EventWithUI) => {
  if (!event.startTime) return null;

  const start = new Date(event.startTime);
  const end = event.endTime ? new Date(event.endTime) : null;

  return {
    fullDate: formatDate(start),
    timeRange: end
      ? `${formatTime(start)} - ${formatTime(end)}`
      : formatTime(start),
    shortDate: `${start.getDate()} Th${start.getMonth() + 1}`,
    dayName: new Intl.DateTimeFormat("vi-VN", { weekday: "long" }).format(
      start,
    ),
  };
};
