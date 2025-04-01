export const communityData = {
  name: "Design Buddies",
  description:
    "Sự kiện cho các nhà thiết kế và người sáng tạo trên khắp SF, trực tuyến và thế giới! Được tổ chức bởi Design Buddies, cộng đồng thiết kế lớn nhất thế giới",
  website: "https://designbuddies.community",
  founder: "Grace Ling",
  timezone: "UTC",
  currentTime: "5:50 AM",
  logo: "/placeholder.svg?height=60&width=60",
};

export const eventCategories = [
  {
    id: "bunny-house",
    name: "Bunny House",
    count: 3,
    color: "purple",
  },
  {
    id: "irl-sf",
    name: "IRL SF",
    count: 5,
    color: "green",
  },
  {
    id: "online",
    name: "Trực tuyến",
    count: 8,
    color: "blue",
  },
];

export const events = [
  {
    id: 1,
    title: "Cách đăng bài trên LinkedIn không bị cringe",
    date: new Date(2025, 2, 27),
    time: "23:00",
    hosts: ["Design Buddies", "Grace Ling"],
    type: "online",
    image: "/placeholder.svg?height=100&width=100",
    posterImage: "/placeholder.svg?height=400&width=400",
    attendees: 42,
    description:
      "Tham gia cùng chúng tôi trong một buổi tối sáng tạo nội dung và hợp tác! Dù bạn là người sáng tạo nội dung dày dặn kinh nghiệm hay mới bắt đầu, sự kiện này được thiết kế cho bất kỳ ai đam mê xây dựng sự hiện diện trực tuyến và kết nối với những người có cùng chí hướng.",
    location: "Trực tuyến qua Zoom",
    zoomLink: "https://zoom.us/j/123456789",
    meetingId: "123 456 789",
    meetingPassword: "design",
    qrCode: "/placeholder.svg?height=180&width=180",
    // Cập nhật để hỗ trợ nhiều người tổ chức
    organizers: [
      {
        id: "design-buddies",
        name: "Design Buddies",
        role: "Cộng đồng",
        avatar: "/placeholder.svg?height=50&width=50",
      },
      {
        id: "grace-ling",
        name: "Grace Ling",
        role: "Người sáng lập",
        avatar: "/placeholder.svg?height=50&width=50",
      },
    ],
    attendeesList: [
      {
        initial: "A",
        name: "Anh Đức Nguyễn",
        email: "anhducvb2004@gmail.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        initial: "B",
        name: "Bella Nguyen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        initial: "K",
        name: "Khôi Trần",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      { initial: "M", name: "Minh Lê" },
      { initial: "T", name: "Thảo Phạm" },
      { initial: "H", name: "Hương Nguyễn" },
      { initial: "L", name: "Linh Đặng" },
      { initial: "D", name: "Duy Phạm" },
      { initial: "V", name: "Việt Hoàng" },
    ],
  },
  {
    id: 2,
    title: "Gặp gỡ Người sáng tạo nội dung TPHCM",
    date: new Date(2025, 2, 28),
    time: "18:30 - 21:00",
    hosts: ["Zak Aghbal"],
    type: "in-person",
    location: "The Hive Villa",
    city: "Thủ Đức, Hồ Chí Minh",
    image: "/placeholder.svg?height=400&width=400",
    posterImage: "/placeholder.svg?height=400&width=400",
    attendees: 90,
    description:
      "Tham gia cùng chúng tôi trong một buổi tối sáng tạo nội dung và hợp tác! Dù bạn là người sáng tạo nội dung dày dặn kinh nghiệm hay mới bắt đầu, sự kiện này được thiết kế cho bất kỳ ai đam mê xây dựng sự hiện diện trực tuyến và kết nối với những người có cùng chí hướng.",
    address: "29 Nguyễn Bá Lân, Thảo Điền, Quận 2, TP. Hồ Chí Minh 713385",
    fullAddress:
      "29 Nguyễn Bá Lân, Thảo Điền, Thủ Đức, Hồ Chí Minh 713385, Vietnam",
    placeId: "ChIJPU3V7U2vEmsRlAxI2kSwsns", // Example place ID for demonstration
    qrCode: "/placeholder.svg?height=180&width=180",
    featured: true,
    featuredLocation: "TP. Hồ Chí Minh",
    // Cập nhật để hỗ trợ nhiều người tổ chức
    organizers: [
      {
        id: "zak-aghbal",
        name: "Zak Aghbal",
        role: "Người tổ chức sự kiện",
        avatar: "/placeholder.svg?height=50&width=50",
      },
    ],
    attendeesList: [
      {
        initial: "A",
        name: "Anh Đức Nguyễn",
        email: "anhducvb2004@gmail.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        initial: "B",
        name: "Bella Nguyen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        initial: "K",
        name: "Khôi Trần",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      { initial: "M", name: "Minh Lê" },
      { initial: "T", name: "Thảo Phạm" },
      { initial: "H", name: "Hương Nguyễn" },
      { initial: "L", name: "Linh Đặng" },
      { initial: "D", name: "Duy Phạm" },
      { initial: "V", name: "Việt Hoàng" },
    ],
    parking: "Có chỗ đậu xe miễn phí",
  },
  {
    id: 3,
    title: "Workshop Hệ thống Thiết kế",
    date: new Date(2025, 2, 20),
    time: "19:00",
    hosts: ["Design Buddies"],
    type: "online",
    image: "/placeholder.svg?height=100&width=100",
    posterImage: "/placeholder.svg?height=400&width=400",
    attendees: 28,
    description:
      "Học cách tạo và triển khai hệ thống thiết kế hiệu quả có thể mở rộng. Workshop này hoàn hảo cho các nhà thiết kế muốn cải thiện quy trình làm việc và hợp tác với các nhà phát triển.",
    location: "Trực tuyến qua Zoom",
    zoomLink: "https://zoom.us/j/987654321",
    meetingId: "987 654 321",
    meetingPassword: "workshop",
    qrCode: "/placeholder.svg?height=180&width=180",
    // Cập nhật để hỗ trợ nhiều người tổ chức
    organizers: [
      {
        id: "sarah-johnson",
        name: "Sarah Johnson",
        role: "Chuyên gia Hệ thống Thiết kế",
        avatar: "/placeholder.svg?height=50&width=50",
      },
      {
        id: "deagent-ai",
        name: "DeAgentAI",
        role: "Đối tác AI",
        avatar: "/placeholder.svg?height=50&width=50",
      },
      {
        id: "movewiffrens",
        name: "Movewiffrens",
        role: "Đối tác Cộng đồng",
        avatar: "/placeholder.svg?height=50&width=50",
      },
    ],
    attendeesList: [
      {
        initial: "A",
        name: "Alex Nguyen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        initial: "J",
        name: "Jessica Pham",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        initial: "R",
        name: "Ryan Tran",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      { initial: "M", name: "Mai Hoang" },
      { initial: "T", name: "Tuan Le" },
    ],
  },
  {
    id: 4,
    title: "Badminton Tournament",
    date: new Date(2025, 2, 16),
    time: "10:00 - 16:00",
    hosts: ["Sports Community"],
    type: "in-person",
    location: "Sports Center",
    city: "Hồ Chí Minh",
    image: "/images/badminton-event.png",
    posterImage: "/images/badminton-event.png",
    attendees: 64,
    description:
      "Join us for an exciting day of badminton! Whether you're a seasoned player or a beginner, come and enjoy friendly matches and meet fellow badminton enthusiasts.",
    address: "123 Nguyen Van Troi, Phu Nhuan District, Ho Chi Minh City",
    fullAddress:
      "123 Nguyen Van Troi, Phu Nhuan District, Ho Chi Minh City, Vietnam",
    placeId: "ChIJN1t_RyWVEmsRk6FOdz2mHBk",
    qrCode: "/placeholder.svg?height=180&width=180",
    featured: false,
    featuredLocation: "TP. Hồ Chí Minh",
    organizers: [
      {
        id: "sports-community",
        name: "Sports Community",
        role: "Organizer",
        avatar: "/placeholder.svg?height=50&width=50",
      },
    ],
    attendeesList: [
      {
        initial: "A",
        name: "Alice Smith",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        initial: "B",
        name: "Bob Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        initial: "C",
        name: "Charlie Brown",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      { initial: "D", name: "David Lee" },
      { initial: "E", name: "Emily Davis" },
    ],
    parking: "Available",
  },
  {
    id: 5,
    title: "AI and the Future of Design",
    date: new Date(2025, 3, 5),
    time: "19:00",
    hosts: ["Design Forward"],
    type: "online",
    image: "/placeholder.svg?height=100&width=100",
    posterImage: "/placeholder.svg?height=400&width=400",
    attendees: 120,
    description:
      "Explore the intersection of artificial intelligence and design. Learn how AI tools are transforming the design process and what the future holds for designers.",
    location: "Online via Webinar",
    zoomLink: "https://zoom.us/j/555555555",
    meetingId: "555 555 555",
    meetingPassword: "aiDesign",
    qrCode: "/placeholder.svg?height=180&width=180",
    organizers: [
      {
        id: "design-forward",
        name: "Design Forward",
        role: "Organizer",
        avatar: "/placeholder.svg?height=50&width=50",
      },
    ],
    attendeesList: [
      {
        initial: "F",
        name: "Frank White",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        initial: "G",
        name: "Grace Taylor",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        initial: "H",
        name: "Henry Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      { initial: "I", name: "Ivy Moore" },
      { initial: "J", name: "Jack Green" },
    ],
  },
  {
    id: 6,
    title: "Community Meetup",
    date: new Date(2025, 2, 16),
    time: "18:00 - 21:00",
    hosts: ["Local Community"],
    type: "in-person",
    location: "Community Center",
    city: "Hồ Chí Minh",
    image: "/placeholder.svg?height=400&width=400",
    posterImage: "/placeholder.svg?height=400&width=400",
    attendees: 75,
    description:
      "Join us for a fun evening of networking and community building. Meet new people, share ideas, and enjoy a relaxed atmosphere.",
    address: "456 Tran Hung Dao, District 1, Ho Chi Minh City",
    fullAddress: "456 Tran Hung Dao, District 1, Ho Chi Minh City, Vietnam",
    placeId: "ChIJN1t_RyWVEmsRk6FOdz2mHBk",
    qrCode: "/placeholder.svg?height=180&width=180",
    featured: false,
    featuredLocation: "TP. Hồ Chí Minh",
    organizers: [
      {
        id: "local-community",
        name: "Local Community",
        role: "Organizer",
        avatar: "/placeholder.svg?height=50&width=50",
      },
    ],
    attendeesList: [
      {
        initial: "K",
        name: "Kevin Hall",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        initial: "L",
        name: "Laura King",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        initial: "M",
        name: "Mike Adams",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      { initial: "N", name: "Nancy Hill" },
      { initial: "O", name: "Oliver Gray" },
    ],
    parking: "Limited",
  },
  {
    id: 7,
    title: "Design Thinking Workshop",
    date: new Date(2025, 3, 12),
    time: "14:00 - 17:00",
    hosts: ["Creative Minds"],
    type: "in-person",
    location: "Innovation Hub",
    city: "Hồ Chí Minh",
    image: "/placeholder.svg?height=400&width=400",
    posterImage: "/placeholder.svg?height=400&width=400",
    attendees: 40,
    description:
      "Learn the fundamentals of design thinking and apply them to real-world problems. This workshop is perfect for designers, entrepreneurs, and anyone interested in creative problem-solving.",
    address: "789 Le Loi, District 3, Ho Chi Minh City",
    fullAddress: "789 Le Loi, District 3, Ho Chi Minh City, Vietnam",
    placeId: "ChIJN1t_RyWVEmsRk6FOdz2mHBk",
    qrCode: "/placeholder.svg?height=180&width=180",
    featured: false,
    featuredLocation: "TP. Hồ Chí Minh",
    organizers: [
      {
        id: "creative-minds",
        name: "Creative Minds",
        role: "Organizer",
        avatar: "/placeholder.svg?height=50&width=50",
      },
    ],
    attendeesList: [
      {
        initial: "P",
        name: "Peter Clark",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        initial: "Q",
        name: "Quinn Young",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        initial: "R",
        name: "Rachel King",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      { initial: "S", name: "Sam Wright" },
      { initial: "T", name: "Tina Hall" },
    ],
    parking: "Available",
  },
  {
    id: 8,
    title: "UI/UX Design Seminar",
    date: new Date(2025, 3, 19),
    time: "10:00 - 12:00",
    hosts: ["Design Experts"],
    type: "online",
    image: "/placeholder.svg?height=100&width=100",
    posterImage: "/placeholder.svg?height=400&width=400",
    attendees: 95,
    description:
      "Enhance your UI/UX design skills with insights from industry experts. Learn about the latest trends and best practices in user interface and user experience design.",
    location: "Online via Webinar",
    zoomLink: "https://zoom.us/j/777777777",
    meetingId: "777 777 777",
    meetingPassword: "uiuxDesign",
    qrCode: "/placeholder.svg?height=180&width=180",
    organizers: [
      {
        id: "design-experts",
        name: "Design Experts",
        role: "Organizer",
        avatar: "/placeholder.svg?height=50&width=50",
      },
    ],
    attendeesList: [
      {
        initial: "U",
        name: "Uma Patel",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        initial: "V",
        name: "Victor Lee",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        initial: "W",
        name: "Wendy Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      { initial: "X", name: "Xander Kim" },
      { initial: "Y", name: "Yara Silva" },
    ],
  },
  {
    id: 9,
    title: "Product Management Workshop",
    date: new Date(2025, 3, 26),
    time: "13:00 - 16:00",
    hosts: ["Product Leaders"],
    type: "online",
    image: "/placeholder.svg?height=100&width=100",
    posterImage: "/placeholder.svg?height=400&width=400",
    attendees: 60,
    description:
      "Master the art of product management with practical exercises and expert guidance. Learn how to define product strategy, prioritize features, and launch successful products.",
    location: "Online via Webinar",
    zoomLink: "https://zoom.us/j/888888888",
    meetingId: "888 888 888",
    meetingPassword: "productMgmt",
    qrCode: "/placeholder.svg?height=180&width=180",
    organizers: [
      {
        id: "product-leaders",
        name: "Product Leaders",
        role: "Organizer",
        avatar: "/placeholder.svg?height=50&width=50",
      },
    ],
    attendeesList: [
      {
        initial: "Z",
        name: "Zack Brown",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        initial: "A",
        name: "Amy Davis",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        initial: "B",
        name: "Ben White",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      { initial: "C", name: "Cathy Green" },
      { initial: "D", name: "Dan Black" },
    ],
  },
  {
    id: 10,
    title: "Mobile App Development Seminar",
    date: new Date(2025, 4, 3),
    time: "11:00 - 13:00",
    hosts: ["Tech Innovators"],
    type: "online",
    image: "/placeholder.svg?height=100&width=100",
    posterImage: "/placeholder.svg?height=400&width=400",
    attendees: 80,
    description:
      "Discover the latest trends and technologies in mobile app development. Learn how to build high-quality mobile apps for iOS and Android platforms.",
    location: "Online via Webinar",
    zoomLink: "https://zoom.us/j/999999999",
    meetingId: "999 999 999",
    meetingPassword: "mobileDev",
    qrCode: "/placeholder.svg?height=180&width=180",
    organizers: [
      {
        id: "tech-innovators",
        name: "Tech Innovators",
        role: "Organizer",
        avatar: "/placeholder.svg?height=50&width=50",
      },
    ],
    attendeesList: [
      {
        initial: "E",
        name: "Eve Smith",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        initial: "F",
        name: "Fred Jones",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        initial: "G",
        name: "Gina Clark",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      { initial: "H", name: "Harry Hill" },
      { initial: "I", name: "Ivy Green" },
    ],
  },
  {
    id: 11,
    title: "Special Event Poster",
    date: new Date(2025, 4, 10),
    time: "18:00 - 22:00",
    hosts: ["Special Events"],
    type: "in-person",
    location: "Grand Ballroom",
    city: "Hồ Chí Minh",
    image: "/images/event-poster.png",
    posterImage: "/images/event-poster.png",
    posterType: "special",
    attendees: 200,
    description:
      "A night of celebration and entertainment. Join us for a memorable evening with music, dance, and special performances.",
    address: "123 Main Street, District 1, Ho Chi Minh City",
    fullAddress: "123 Main Street, District 1, Ho Chi Minh City, Vietnam",
    placeId: "ChIJN1t_RyWVEmsRk6FOdz2mHBk",
    qrCode: "/placeholder.svg?height=180&width=180",
    featured: true,
    featuredLocation: "TP. Hồ Chí Minh",
    organizers: [
      {
        id: "special-events",
        name: "Special Events",
        role: "Organizer",
        avatar: "/placeholder.svg?height=50&width=50",
      },
    ],
    attendeesList: [
      {
        initial: "J",
        name: "Jack Smith",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        initial: "K",
        name: "Kelly Jones",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        initial: "L",
        name: "Leo Brown",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      { initial: "M", name: "Mia White" },
      { initial: "N", name: "Noah Black" },
    ],
    parking: "Available",
  },
];

export const highlightedDays = [
  new Date(2025, 2, 16), // March 16, 2025
  new Date(2025, 2, 20), // March 20, 2025
  new Date(2025, 2, 27), // March 27, 2025
  new Date(2025, 2, 28), // March 28, 2025
  new Date(2025, 3, 5), // April 5, 2025
  new Date(2025, 3, 12), // April 12, 2025
  new Date(2025, 3, 19), // April 19, 2025
  new Date(2025, 3, 26), // April 26, 2025
  new Date(2025, 4, 3), // May 3, 2025
  new Date(2025, 4, 10), // May 10, 2025
];

export const collageImages = ["/placeholder.svg?height=150&width=250"];
