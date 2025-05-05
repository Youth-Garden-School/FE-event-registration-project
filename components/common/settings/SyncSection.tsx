"use client";

import { Button } from "@/components/ui/button";

export function SyncSection() {
  return (
    <section className="mb-8">
      <h3 className="text-lg font-medium mb-2">Đồng bộ tài khoản</h3>

      <div className="space-y-4">
        {/* Div trắng xung quanh Đồng bộ lịch và Đồng bộ Google */}
        <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200 space-y-4">
          {/* Đồng bộ lịch */}
          <div className="flex items-start justify-between">
            <div className="flex items-start">
              <div className="mr-3 mt-1">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg"
                  alt="Calendar"
                  className="w-5 h-5"
                />
              </div>
              <div>
                <p className="font-medium">Đồng bộ lịch</p>
                <p className="text-sm text-gray-500">
                  Đồng bộ sự kiện Luma của bạn với lịch Google, Outlook, hoặc
                  Apple.
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              className="text-gray-500 border border-gray-300 hover:bg-gray-50 text-xs h-8"
            >
              Thêm đăng kí iCal
            </Button>
          </div>

          {/* Border ngăn cách giữa Đồng bộ lịch và Đồng bộ Google */}
          <div className="border-t border-gray-200 my-4"></div>

          {/* Đồng bộ danh bạ Google */}
          <div className="flex items-start justify-between">
            <div className="flex items-start">
              <div className="mr-3 mt-1">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
              </div>
              <div>
                <p className="font-medium">Đồng bộ danh bạ với Google</p>
                <p className="text-sm text-gray-500">
                  Đồng bộ danh bạ Gmail của bạn để dễ dàng mời họ tham gia sự
                  kiện của bạn.
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              className="bg-gray-800 text-white hover:bg-gray-700 text-xs h-8 rounded-full"
            >
              Bật đồng bộ
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
