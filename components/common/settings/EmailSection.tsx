"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Pencil } from "lucide-react";

export function EmailSection() {
  return (
    <section className="mb-8">
      {/* Hàng trên: Tiêu đề + Button */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium">Email</h3>
        <Button
          variant="outline"
          className="text-gray-500 border border-gray-300 hover:bg-gray-50"
        >
          + Thêm email
        </Button>
      </div>

      {/* Mô tả */}
      <p className="text-gray-500 text-sm mb-4">
        Thêm email để nhận lời mời sự kiện được gửi đến các địa chỉ đó.
      </p>

      {/* Khung trắng */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <p className="font-medium m-0">baobui055@gmail.com</p>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                Chính
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Email này sẽ được chia sẻ với người tổ chức khi bạn đăng kí tham
              gia sự kiện của họ
            </p>
          </div>

          {/* Dropdown menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <span className="text-xl">…</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="flex items-center gap-2">
                <Pencil className="w-4 h-4" />
                Thay đổi Email
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </section>
  );
}
