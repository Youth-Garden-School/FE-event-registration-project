"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function PhoneSection() {
  return (
    <section className="mb-8">
      <h3 className="text-lg font-medium mb-2">Số điện thoại</h3>
      <p className="text-gray-500 text-sm mb-4">
        Quản lý số điện thoại bạn dùng để đăng nhập vào Luma và nhận cập nhật
        qua SMS.
      </p>

      <div className="flex items-center mb-4">
        <Input type="tel" placeholder="+84 912 345 678" className="max-w-xs" />
        <Button
          variant="outline"
          className="ml-2 text-gray-500 border border-gray-300 hover:bg-gray-50"
        >
          Cập nhật
        </Button>
      </div>

      <p className="text-xs text-gray-500">
        Để bảo mật, chúng tôi sẽ gửi cho bạn một mã để xác minh bất kỳ thay đổi
        nào đối với số điện thoại của bạn.
      </p>
    </section>
  );
}
