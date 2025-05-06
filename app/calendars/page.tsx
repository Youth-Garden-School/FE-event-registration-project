"use client";
import { useRouter } from "next/navigation";
import FollowedCalendars from "@/components/common/FollowedCalendars";
import CardSlider from "@/components/common/cardslider";
import { Button } from "@/components/ui/button";

const Calendars = () => {
  const router = useRouter();
  const handleCreate = () => {
    router.push("/create-calendar");
  };
  const cards = [
    {
      title: "Chào mừng đến với Lịch Luma",
      description:
        "Sự kiện Lịch Luma giúp bạn dễ dàng chia sẻ và quản lý sự kiện của mình. Mỗi sự kiện trên Luma đều là một phần của lịch. Hãy xem cách chúng hoạt động. dẫn sắp diễn ra.",
      imageUrl: "/calendar/calendar-days.svg",
    },
    {
      title: "Làm việc cùng nhóm của bạn",
      description:
        "Dễ dàng thêm đồng đội của bạn làm quản trị viên lịch. Họ sẽ có quyền quản lý các sự kiện được quản lý bởi lịch",
      imageUrl: "/calendar/contact-round.svg",
    },
    {
      title: "Chia sẻ trang lịch của bạn",
      description:
        "Tuỳ chỉnh và chia sẻ lịch đẹp của bạn để giới thiệu các sự kiện sắp tới. Người tham dự có thể duyệt lịch trình của bạn và theo dõi để nhận cập nhật.",
      imageUrl: "/calendar/calendar.svg",
    },
    {
      title: "Gửi bản tin",
      description:
        "Khi người tham dự theo dõi lịch của bạn, bạn có thể gửi bản tin để cập nhật thông tin cho họ.",
      imageUrl: "/calendar/mail.svg",
    },
    {
      title: "Sự kiện cộng đồng nổi bật",
      description:
        "Lịch của bạn có thể hiển thị sự kiện từ các lịch khác. Bạn thậm chí có thể bao gồm các sự kiện được tổ chức trên các trang web khác.",
      imageUrl: "/calendar/unnamed.png",
    },
  ];
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center space-y-8">
      {/* Nhóm "Lịch" */}
      <div className="w-full max-w-2xl">
        <h1 className="text-xl font-bold mb-10">Lịch</h1>
        <CardSlider cards={cards} />
        <div className="flex justify-end mt-4">
          <Button
            onClick={handleCreate}
            className="bg-gray-300 text-black px-4 py-2 rounded-lg shadow-md hover:bg-gray-400"
          >
            + Tạo
          </Button>
        </div>
      </div>

      {/* Nhóm "Lịch của tôi" */}
      <div className="w-full max-w-2xl">
        <h1 className="text-xl font-bold mb-2">Lịch của tôi</h1>
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-start max-w-xs">
          <h2 className="text-lg font-semibold">Không có lịch</h2>
          <p className="text-gray-500">
            Bạn không phải là quản trị viên của bất kỳ lịch nào.
          </p>
        </div>
      </div>
      {/* Nhóm lịch đã theo dõi */}

      <FollowedCalendars />
    </div>
  );
};

export default Calendars;
