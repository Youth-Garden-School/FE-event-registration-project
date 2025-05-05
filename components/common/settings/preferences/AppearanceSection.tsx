import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function AppearancePage() {
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("vi");
  const [showQR, setShowQR] = useState(false);

  const themes = [
    { id: "system", label: "Hệ thống" },
    { id: "light", label: "Giao diện sáng" },
    { id: "dark", label: "Giao diện tối" },
  ];

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else if (theme === "light") {
      root.classList.remove("dark");
    } else if (theme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.toggle("dark", isDark);
    }
  }, [theme]);

  return (
    <div className="min-h-screen p-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors relative">
      {/* Hiển thị */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-2">Hiển thị</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Chọn giao diện Luma mà bạn mong muốn.
        </p>
        <div className="flex gap-4">
          {themes.map((t) => (
            <div
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`cursor-pointer rounded-xl border-2 p-4 w-48 text-center shadow-sm transition-all duration-200 ${
                theme === t.id
                  ? "border-black dark:border-white"
                  : "border-transparent"
              } bg-white dark:bg-gray-800`}
            >
              <div className="h-24 bg-gray-200 dark:bg-gray-600 mb-2 rounded" />
              <span className="text-sm font-medium dark:text-white">
                {t.label}
              </span>
            </div>
          ))}
        </div>

        {/* Ngôn ngữ */}
        <div className="mt-6">
          <label
            htmlFor="language"
            className="block text-gray-700 dark:text-gray-300 font-medium mb-1"
          >
            Ngôn ngữ
          </label>
          <select
            id="language"
            className="rounded border px-3 py-2 text-sm shadow-sm text-black dark:text-white dark:bg-gray-800"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="vi">Tiếng Việt</option>
            <option value="en">English</option>
          </select>
        </div>
      </section>

      {/* Thông báo */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Thông báo</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Chọn cách bạn muốn nhận thông báo về cập nhật, lời mời và theo dõi.
        </p>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 max-w-md">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold dark:text-white mb-1">
                Tải Luma cho iOS
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Cập nhật thông tin và nhận thông báo qua ứng dụng Luma.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowQR(true)}
            className="mt-4 bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-md text-sm transition-colors duration-200"
          >
            ⬇ Tải ứng dụng
          </button>
        </div>
      </section>

      {/* Modal QR Code */}
      {showQR && (
        <div className="fixed inset-0  bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl text-center shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black dark:hover:text-white text-xl"
              onClick={() => setShowQR(false)}
            >
              &times;
            </button>
            <QRCodeCanvas value="https://example.com/app-download" size={200} />
            <p className="mt-4 text-gray-800 dark:text-gray-300 text-sm">
              Quét mã QR để tải ứng dụng
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
