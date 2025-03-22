import type { Event } from "./types";

// Lấy ngày hiện tại để phân loại sự kiện / Get current date to categorize events
const currentDate = new Date();
// Định dạng ngày hiện tại theo chuẩn ISO để so sánh / Format current date in ISO format for comparison
const currentDateISO = currentDate.toISOString().split("T")[0];

// Danh sách tất cả sự kiện / List of all events
export const events: Event[] = [
  {
    id: "1",
    title: "Chung kết Web3 Ideathon 2025",
    time: "13:30",
    endTime: "19:00",
    date: "2024-06-28", // Sự kiện sắp tới / Upcoming event
    dateLabel: "28 thg 6",
    dayLabel: "Thứ Sáu",
    location: "Hội trường Thành ủy",
    organizer: "Bởi VBI Academy & GFI - Golden Financial Innovation",
    image: "/images/events/event.jpg",
    participants: [
      { id: "1", name: "Nguyễn Văn A", avatar: "/images/avatars/avatar.jpg" },
      { id: "2", name: "Trần Thị B", avatar: "/images/avatars/avatar.jpg" },
      { id: "3", name: "Lê Văn C", avatar: "/images/avatars/avatar.jpg" },
      { id: "4", name: "Phạm Thị D", avatar: "/images/avatars/avatar.jpg" },
      { id: "5", name: "Hoàng Văn E", avatar: "/images/avatars/avatar.jpg" },
      { id: "6", name: "Ngô Thị F", avatar: "/images/avatars/avatar.jpg" },
      { id: "7", name: "Ngô Thị L", avatar: "/images/avatars/avatar.jpg" },
      // ... thêm 87 người nữa
    ],
    isParticipating: true,
    isUserEvent: false,
  },
  {
    id: "2",
    title: "Blockchain Workshop",
    time: "15:30",
    date: "2024-05-29", // Sự kiện sắp tới / Upcoming event
    dateLabel: "29 thg 5",
    dayLabel: "Thứ Bảy",
    location: "643 Đ. Phạm Văn Đồng",
    image: "/images/events/event.jpg",
    participants: [
      { id: "1", name: "Nguyễn Văn A", avatar: "/images/avatars/avatar.jpg" },
      { id: "2", name: "Trần Thị B", avatar: "/images/avatars/avatar.jpg" },
      { id: "3", name: "Lê Văn C", avatar: "/images/avatars/avatar.jpg" },
    ],
    isUserEvent: true,
    isParticipating: false,
  },
  {
    id: "3",
    title: "Khóa học NFT",
    time: "9:30",
    date: "2024-06-13", // Sự kiện sắp tới / Upcoming event
    dateLabel: "13 thg 6",
    dayLabel: "Thứ Năm",
    location: "Thư viện Tạ Quang Bửu",
    image: "/images/events/event.jpg",
    participants: [
      { id: "1", name: "Nguyễn Văn A", avatar: "/images/avatars/avatar.jpg" },
      { id: "2", name: "Trần Thị B", avatar: "/images/avatars/avatar.jpg" },
    ],
    isUserEvent: false,
    isParticipating: true,
  },
  {
    id: "4",
    title: "Web3 Conference 2023",
    time: "8:30",
    endTime: "17:00",
    date: "2023-10-15", // Sự kiện đã qua / Past event
    dateLabel: "15 thg 10",
    dayLabel: "Chủ Nhật",
    location: "Trung tâm Hội nghị Quốc gia",
    image: "/images/events/event.jpg",
    participants: [
      { id: "1", name: "Nguyễn Văn A", avatar: "/images/avatars/avatar.jpg" },
      { id: "2", name: "Trần Thị B", avatar: "/images/avatars/avatar.jpg" },
      { id: "3", name: "Lê Văn C", avatar: "/images/avatars/avatar.jpg" },
      { id: "4", name: "Phạm Thị D", avatar: "/images/avatars/avatar.jpg" },
    ],
    isUserEvent: false,
    isParticipating: true,
  },
  {
    id: "5",
    title: "Blockchain Hackathon 2023",
    time: "9:00",
    endTime: "21:00",
    date: "2023-12-20", // Sự kiện đã qua / Past event
    dateLabel: "20 thg 12",
    dayLabel: "Thứ Tư",
    location: "Đại học Bách Khoa Hà Nội",
    image: "/images/events/event.jpg",
    participants: [
      { id: "1", name: "Nguyễn Văn A", avatar: "/images/avatars/avatar.jpg" },
      { id: "2", name: "Trần Thị B", avatar: "/images/avatars/avatar.jpg" },
      { id: "3", name: "Lê Văn C", avatar: "/images/avatars/avatar.jpg" },
    ],
    isUserEvent: true,
    isParticipating: true,
  },
  {
    id: "6",
    title: "DeFi Summit Vietnam 2024",
    time: "10:00",
    endTime: "16:00",
    date: "2024-08-25", // Sự kiện sắp tới / Upcoming event
    dateLabel: "25 thg 8",
    dayLabel: "Thứ Bảy",
    location: "GEM Center, Quận 1, TP.HCM",
    image: "/images/events/event.jpg",
    participants: [
      { id: "1", name: "Nguyễn Văn A", avatar: "/images/avatars/avatar.jpg" },
      { id: "2", name: "Trần Thị B", avatar: "/images/avatars/avatar.jpg" },
    ],
    isUserEvent: false,
    isParticipating: false,
  },
];

// Danh sách sự kiện sắp tới / Upcoming events list
export const upcomingEvents = events.filter(
  (event) => event.date >= currentDateISO,
);

// Danh sách sự kiện đã qua / Past events list
export const pastEvents = events.filter((event) => event.date < currentDateISO);
