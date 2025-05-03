"use client";

import { Button } from "@/components/ui/button";
import { Lock, ShieldCheck } from "lucide-react";

export function SecuritySection() {
  return (
    <section className="mb-8">
      <h3 className="text-lg font-medium mb-2">Mật khẩu & Bảo mật</h3>
      <p className="text-gray-500 text-sm mb-4">
        Bảo mật tài khoản của bạn với mật khẩu và xác thực hai yếu tố.
      </p>

      <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
        {/* Mật khẩu tài khoản */}
        <div className="flex items-start p-4 gap-4">
          <Lock size={22} className="text-gray-700 mt-1" />
          <div className="flex-1">
            <h4 className="font-medium">Mật khẩu tài khoản</h4>
            <p className="text-sm text-gray-500">
              Vui lòng làm theo hướng dẫn trong email để hoàn tất việc đặt mật
              khẩu của bạn.
            </p>
          </div>
          <Button
            variant="outline"
            className="text-sm bg-gray-800 text-white hover:bg-gray-700 rounded-full"
          >
            Đặt mật khẩu
          </Button>
        </div>

        {/* Xác thực hai yếu tố */}
        <div className="flex items-start p-4 gap-4">
          <ShieldCheck size={22} className="text-gray-700 mt-1" />
          <div className="flex-1">
            <h4 className="font-medium">Xác thực hai yếu tố</h4>
            <p className="text-sm text-gray-500">
              Vui lòng đặt mật khẩu trước khi bật xác thực hai yếu tố.
            </p>
          </div>
          <Button
            variant="outline"
            className="text-sm bg-gray-200 text-gray-500 hover:bg-gray-200 cursor-not-allowed rounded-full"
          >
            Đặt 2FA
          </Button>
        </div>
      </div>
    </section>
  );
}
