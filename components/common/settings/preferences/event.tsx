import React, { useState } from "react";
import { CheckCircle } from "lucide-react"; // Import icon CheckCircle từ Lucide

export function PreferenceEvents() {
  const [isOpen, setIsOpen] = useState<number | null>(null); // Theo dõi phần tử nào đang mở
  const [toggledStates, setToggledStates] = useState<boolean[]>(
    new Array(10).fill(false),
  ); // Mảng trạng thái tắt cho từng phần tử
  const [toastVisible, setToastVisible] = useState<boolean>(false); // Kiểm tra xem Toast có hiển thị hay không
  const [toastMessage, setToastMessage] = useState<string>(""); // Trạng thái thông báo Toast

  const toggleDropdown = (index: number) => {
    if (isOpen === index) {
      setIsOpen(null); // Đóng nếu nhấn vào phần tử đang mở
    } else {
      setIsOpen(index); // Mở phần tử được nhấn
    }
  };

  const handleToggle = (index: number) => {
    const newToggledStates = [...toggledStates];
    newToggledStates[index] = !newToggledStates[index]; // Lật trạng thái giữa Tắt và Email
    setToggledStates(newToggledStates); // Cập nhật trạng thái tắt cho mục đó
    setToastMessage(
      newToggledStates[index]
        ? "Đã tắt thông báo thành công!"
        : "Đã bật thông báo thành công!",
    ); // Thông điệp tùy theo trạng thái
    setToastVisible(true); // Hiển thị Toast

    // Đóng dropdown sau khi bấm
    setIsOpen(null);

    // Tự động ẩn Toast sau 3 giây
    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  };

  const handleEmailUpdate = () => {
    setToastMessage("Đã cập nhật tùy chọn thành công!"); // Set thông điệp Toast khi cập nhật Email
    setToastVisible(true); // Hiển thị Toast

    // Đóng dropdown sau khi bấm
    setIsOpen(null);

    // Tự động ẩn Toast sau 3 giây
    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Sự kiện bạn tham dự</h1>
      <div className="bg-white p-4 rounded shadow mb-6 relative">
        <ul>
          {[
            "Lời mời sự kiện",
            "Nhắc nhở sự kiện",
            "Thông báo sự kiện",
            "Cập nhật sự kiện",
            "Yêu cầu phản hồi",
          ].map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-between py-2 border-b"
            >
              <span>{item}</span>
              <div className="relative flex items-center">
                <button
                  className="text-black flex items-center"
                  onClick={() => toggleDropdown(index)}
                >
                  <span>{toggledStates[index] ? "Tắt" : "Email"}</span>
                  <span className="ml-2 text-black">&#9660;</span>
                </button>
                {/* Dropdown */}
                {isOpen === index && (
                  <div className="absolute right-0 mt-30 w-40 bg-white border rounded shadow-md z-20 opacity-100">
                    <button
                      className="block w-full text-left py-2 px-4 hover:bg-gray-100"
                      onClick={() => handleToggle(index)} // Lật trạng thái khi bấm Tắt
                    >
                      Tắt
                    </button>
                    <div className="border-t"></div>{" "}
                    {/* Thêm border giữa Tắt và Email */}
                    <button
                      className="block w-full text-left py-2 px-4 hover:bg-gray-100"
                      onClick={handleEmailUpdate} // Hàm xử lý khi bấm Email
                    >
                      Email
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <h1 className="text-2xl font-bold mb-4">Sự kiện bạn tổ chức</h1>
      <div className="bg-white p-4 rounded shadow relative">
        <ul>
          {["Đăng ký người tham dự", "Phản hồi khảo sát"].map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-between py-2 border-b"
            >
              <span>{item}</span>
              <div className="relative flex items-center">
                <button
                  className="text-black flex items-center"
                  onClick={() => toggleDropdown(index + 5)}
                >
                  <span>{toggledStates[index + 5] ? "Tắt" : "Email"}</span>
                  <span className="ml-2 text-black">&#9660;</span>
                </button>
                {/* Dropdown */}
                {isOpen === index + 5 && (
                  <div className="absolute right-0 mt-30 w-40 bg-white border rounded shadow-md z-20 opacity-100">
                    <button
                      className="block w-full text-left py-2 px-4 hover:bg-gray-100"
                      onClick={() => handleToggle(index + 5)} // Lật trạng thái khi bấm Tắt
                    >
                      Tắt
                    </button>
                    <div className="border-t"></div>{" "}
                    {/* Thêm border giữa Tắt và Email */}
                    <button
                      className="block w-full text-left py-2 px-4 hover:bg-gray-100"
                      onClick={handleEmailUpdate} // Hàm xử lý khi bấm Email
                    >
                      Email
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <h1 className="text-2xl font-bold mb-4">Các lịch bạn quản lý</h1>
      <div className="bg-white p-4 rounded shadow relative">
        <ul>
          {["Thành viên mới", "Sự kiện được gửi"].map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-between py-2 border-b"
            >
              <span>{item}</span>
              <div className="relative flex items-center">
                <button
                  className="text-black flex items-center"
                  onClick={() => toggleDropdown(index + 10)}
                >
                  <span>{toggledStates[index + 10] ? "Tắt" : "Email"}</span>
                  <span className="ml-2 text-black">&#9660;</span>
                </button>
                {/* Dropdown */}
                {isOpen === index + 10 && (
                  <div className="absolute right-0 mt-30 w-40 bg-white border rounded shadow-md z-20 opacity-100">
                    <button
                      className="block w-full text-left py-2 px-4 hover:bg-gray-100"
                      onClick={() => handleToggle(index + 15)} // Lật trạng thái khi bấm Tắt
                    >
                      Tắt
                    </button>
                    <div className="border-t"></div>{" "}
                    {/* Thêm border giữa Tắt và Email */}
                    <button
                      className="block w-full text-left py-2 px-4 hover:bg-gray-100"
                      onClick={handleEmailUpdate} // Hàm xử lý khi bấm Email
                    >
                      Email
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <h1 className="text-2xl font-bold mb-4">Luma</h1>
      <div className="bg-white p-4 rounded shadow relative">
        <ul>
          {["Cập nhật sản phẩm"].map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-between py-2 border-b"
            >
              <span>{item}</span>
              <div className="relative flex items-center">
                <button
                  className="text-black flex items-center"
                  onClick={() => toggleDropdown(index + 15)}
                >
                  <span>{toggledStates[index + 15] ? "Tắt" : "Email"}</span>
                  <span className="ml-2 text-black">&#9660;</span>
                </button>
                {/* Dropdown */}
                {isOpen === index + 15 && (
                  <div className="absolute right-0 mt-30 w-40 bg-white border rounded shadow-md z-20 opacity-100">
                    <button
                      className="block w-full text-left py-2 px-4 hover:bg-gray-100"
                      onClick={() => handleToggle(index + 15)} // Lật trạng thái khi bấm Tắt
                    >
                      Tắt
                    </button>
                    <div className="border-t"></div>{" "}
                    {/* Thêm border giữa Tắt và Email */}
                    <button
                      className="block w-full text-left py-2 px-4 hover:bg-gray-100"
                      onClick={handleEmailUpdate} // Hàm xử lý khi bấm Email
                    >
                      Email
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Toast notification */}
      {toastVisible && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-4 rounded shadow-md flex items-center">
          <span className="mr-2">
            <CheckCircle className="w-5 h-5 animate-ping" />
          </span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
