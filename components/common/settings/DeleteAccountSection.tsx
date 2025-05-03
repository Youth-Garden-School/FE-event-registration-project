"use client";

import { Button } from "@/components/ui/button";

export function DeleteAccountSection() {
  return (
    <section className="mb-8">
      <h3 className="text-lg font-medium mb-2 text-red-500">Xoá tài khoản</h3>
      <p className="text-gray-500 text-sm mb-4">
        Nếu bạn không còn muốn sử dụng Luma nữa, bạn có thể xoá tài khoản của
        mình vĩnh viễn.
      </p>

      <Button
        variant="outline"
        className="bg-red-50 text-red-500 hover:bg-red-100 border-red-200 flex items-center gap-2"
      >
        <span>Xoá tài khoản của tôi</span>
      </Button>
    </section>
  );
}
