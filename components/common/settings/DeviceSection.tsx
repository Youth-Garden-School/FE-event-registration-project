"use client";

export function DeviceSection() {
  return (
    <section className="mb-8">
      <h3 className="text-lg font-medium mb-2">Thiết bị đang hoạt động</h3>
      <p className="text-gray-500 text-sm mb-4">
        Xem danh sách các thiết bị mà bạn đang đăng nhập vào Luma.
      </p>

      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="mr-3">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Chrome_icon_%28February_2022%29.svg"
                alt="Chrome"
                className="w-6 h-6"
              />
            </div>
            <div>
              <p className="font-medium">Chrome trên Windows</p>
              <p className="text-sm text-gray-500">Ho Chi Minh City, VN</p>
            </div>
          </div>
          <button className="text-green-600 hover:text-green-700 h-auto p-0">
            Thiết bị này
          </button>
        </div>
      </div>
    </section>
  );
}
