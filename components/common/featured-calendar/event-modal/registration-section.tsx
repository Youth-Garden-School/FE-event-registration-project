"use client";

import { Button } from "@/components/ui/button";
import { Calendar, ChevronRight } from "lucide-react";

interface RegistrationSectionProps {
  isRegistered: boolean;
  onRegister: () => void;
  onCancelRegistration: () => void;
}

export function RegistrationSection({
  isRegistered,
  onRegister,
  onCancelRegistration,
}: RegistrationSectionProps) {
  return (
    <div className="p-5 border-t border-gray-100">
      {isRegistered ? (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
              <span className="text-pink-500">😊</span>
            </div>
            <div>
              <h3 className="font-bold text-xl">Bạn đã có chỗ</h3>
            </div>
          </div>

          <div className="flex gap-2 mt-4 mb-4">
            <Button variant="outline" className="flex-1 gap-2">
              <Calendar className="h-4 w-4" />
              <span>Thêm vào lịch</span>
            </Button>
            <Button
              variant="outline"
              className="w-10 h-10 p-0 flex items-center justify-center"
            >
              <span className="text-lg">🇻🇳</span>
            </Button>
          </div>

          <p className="text-gray-600 text-sm mt-2">
            Không thể tham dự? Hãy thông báo cho người tổ chức bằng cách{" "}
            <button
              onClick={onCancelRegistration}
              className="text-pink-500 font-medium hover:underline"
            >
              hủy đăng kí của bạn
            </button>
            .
          </p>

          <div className="mt-6 border-t border-gray-100 pt-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Chuẩn bị sẵn sàng cho sự kiện</h4>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm">
              Hoàn thành trang cá nhân · Nhắc nhở: Email
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="font-medium text-lg mb-4">Đăng kí</h3>
          <p className="text-gray-600 mb-4">
            Chào mừng! Để tham gia sự kiện, vui lòng đăng kí bên dưới.
          </p>

          <div className="flex items-center gap-3 mb-4 bg-gray-50 p-3 rounded-lg">
            <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-sm overflow-hidden">
              <span>A</span>
            </div>
            <div>
              <div className="font-medium">Anh Đức Nguyễn</div>
              <div className="text-sm text-gray-500">
                anhducvtr2004@gmail.com
              </div>
            </div>
          </div>

          <Button
            onClick={onRegister}
            className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-lg"
          >
            Đăng kí một chạm
          </Button>
        </div>
      )}
    </div>
  );
}
