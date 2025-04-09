"use client";

const NoEventsComponent = ({
  message = "Không có sự kiện sắp tới",
  subMessage = "Theo dõi để cập nhật sự kiện mới.",
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {/* Icon lịch với số 0 */}
      <div className="relative mb-6">
        <div className="bg-gray-100 w-32 h-32 rounded-2xl flex items-center justify-center">
          <div className="relative">
            {/* Calendar base */}
            <div className="w-20 h-16 bg-gray-200 rounded-lg relative">
              {/* Calendar top bar */}
              <div className="absolute -top-3 left-0 w-full h-3 bg-gray-200 rounded-t-lg"></div>

              {/* Calendar squares */}
              <div className="absolute top-4 left-2 w-4 h-4 bg-gray-300 rounded-md"></div>
              <div className="absolute top-4 right-6 w-6 h-3 bg-gray-300 rounded-md"></div>
              <div className="absolute bottom-2 left-4 w-6 h-6 bg-gray-300 rounded-md"></div>
              <div className="absolute bottom-4 right-3 w-4 h-4 bg-gray-300 rounded-md"></div>
              <div className="absolute bottom-2 left-12 w-4 h-3 bg-gray-300 rounded-md"></div>
            </div>

            {/* Number 0 badge */}
            <div className="absolute -right-2 -top-4 w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-900 text-xl font-bold">
              0
            </div>
          </div>
        </div>
      </div>

      {/* Text content */}
      <h3 className="text-gray-900 text-2xl font-medium mb-2">{message}</h3>
      <p className="text-gray-500 text-base">{subMessage}</p>
    </div>
  );
};

export default NoEventsComponent;
