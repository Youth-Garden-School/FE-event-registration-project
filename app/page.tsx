"use client";

import { Button } from "@/components/ui/button";

export default function MainPage() {
  return (
    <div className="w-full overflow-hidden bg-foreground">
      <div className="min-h-[80vh] flex items-center relative gap-4 p-4 pt-12 justify-center">
        {/* Left Section: Text and Button */}
        <div className="shrink mt-[-2rem] w-[440px] h-[440px]">
          <div className="mb-6 ml-1.5">
            <span className="text-gray-400 text-4xl font-bold">Regista</span>
            <br />
          </div>
          <h1 className="text-5xl font-semibold">
            <div className="mb-2 text-background">SỰ KIỆN</div>
            <div className="mb-2">
              <span className="text-5xl font-semibold text-background">
                THÚ VỊ
              </span>
            </div>
            <div className="w-full bg-[radial-gradient(circle_at_top_left,#099ef1_0%,#6863f8_18.82%,#d84ffa_32.6%,#f058c5_52.83%,#ff4f90_68.03%,#ff6558_87.66%,#ff891f_100%)] inline-block text-[transparent] bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 font-medium text-6xl">
              bắt đầu từ đây.
            </div>
          </h1>
          <br />
          <p className="text-gray-600 mb-6 text-2xl">
            Tạo trang sự kiện, mời bạn bè và bán vé. Tổ chức một sự kiện đáng
            nhớ hôm nay.
          </p>
          <Button className="bg-background text-foreground px-6 py-3 hover:bg-gray-700 cursor-pointer">
            Tạo sự kiện đầu tiên của bạn
          </Button>
        </div>
        {/* Right Section: Video with Decorative Elements */}
        <div className="relative w-[620px] h-[663px] shrink-0">
          <video
            src="/phone-light.mp4"
            autoPlay
            loop
            muted
            playsInline
            className=""
          />
        </div>
      </div>
    </div>
  );
}
