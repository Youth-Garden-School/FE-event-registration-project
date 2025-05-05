"use client";

import { Check } from "lucide-react";

export function ThirdPartySection() {
  return (
    <section className="mb-8">
      <h3 className="text-base font-semibold mb-2">Tài khoản bên thứ ba</h3>
      <p className="text-gray-500 text-xs mb-4">
        Liên kết tài khoản của bạn để đăng nhập vào Luma và tự động hóa quy
        trình làm việc của bạn.
      </p>

      <div className="flex flex-wrap gap-3">
        {/* Item Template */}
        {[
          {
            name: "Google",
            email: "baobui055@gmail.com",
            icon: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",
            linked: true,
          },
          {
            name: "Apple",
            email: "Chưa liên kết",
            icon: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
            linked: false,
          },
          {
            name: "Zoom",
            email: "Chưa liên kết",
            icon: "https://download.logo.wine/logo/Zoom_Video_Communications/Zoom_Video_Communications-Logo.wine.png",
            linked: false,
            logoClass: "w-8 h-5 object-contain",
          },
          {
            name: "Solana",
            email: "Chưa liên kết",
            icon: "https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png",
            linked: false,
          },
          {
            name: "Ethereum",
            email: "Chưa liên kết",
            icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/1257px-Ethereum_logo_2014.svg.png",
            linked: false,
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white max-w-[240px] w-full rounded-md border border-gray-200 px-3 py-2 flex items-center justify-between text-sm"
          >
            <div className="flex items-center space-x-2">
              <img
                src={item.icon}
                alt={item.name}
                className={`w-5 h-5 ${item.logoClass ?? ""}`}
              />
              <div className="leading-tight">
                <p className="font-medium">{item.name}</p>
                <p className="text-xs text-gray-500">{item.email}</p>
              </div>
            </div>

            {item.linked ? (
              <div className="bg-green-100 rounded-full p-1">
                <Check className="h-3 w-3 text-green-600" />
              </div>
            ) : (
              <button className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center text-sm">
                <span className="leading-none">+</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
