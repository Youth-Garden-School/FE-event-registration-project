"use client";

const FollowedCalendars = () => {
  return (
    <div className="w-full max-w-2xl border-t border-gray-300 mt-6 pt-8">
      <h1 className="text-xl font-bold mb-2">Các lịch đã theo dõi</h1>
      <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-start max-w-xs">
        <img
          src="/calendar/calendar-xmark-regular.svg"
          alt="Lịch đã theo dõi"
          className="w-16 h-16 mb-4"
        />
        <h2 className="text-lg font-semibold">Không có theo dõi</h2>
        <p className="text-gray-500">Bạn chưa theo dõi bất kỳ lịch nào.</p>
      </div>
    </div>
  );
};

export default FollowedCalendars;
