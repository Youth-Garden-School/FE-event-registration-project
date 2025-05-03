"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Calendar, Users } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full py-16 px-6 bg-background">
      <div className="max-w-4xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between">
        <div className="w-full md:w-3/5 space-y-5 mt-8 md:mt-0 text-center md:text-left">
          {/* Tiêu đề nhỏ hơn */}
          <h1 className="text-4xl font-bold">AI</h1>

          {/* Thông tin sự kiện */}
          <div className="flex items-center justify-center md:justify-start gap-3 border-b border-gray-300 pb-2 w-[300px] md:w-[400px]">
            <div className="flex items-center gap-2 font-medium text-primary">
              <Calendar size={18} className="text-gray-500" /> 1N
            </div>
            <div className="font-medium text-gray-500 text-sm">sự kiện</div>
            <div className="flex items-center gap-2 font-medium text-primary">
              <Users size={18} className="text-gray-500" /> 9N
            </div>
            <div className="font-medium text-gray-500 text-sm">
              người theo dõi
            </div>
          </div>

          {/* Mô tả nhỏ hơn */}
          <p className="text-secondary-alpha max-w-sm text-base mx-auto md:mx-0">
            Tham gia hackathon, tìm hiểu về LLM và kỹ thuật prompt, hoặc kết nối
            với những người làm AI khác.
          </p>

          <Button className="h-11 rounded-full px-8 font-medium">
            Theo dõi
          </Button>
        </div>

        {/* Ảnh */}
        <div className="w-full md:w-2/5 flex justify-center md:justify-end">
          <div className="relative w-72 h-72 md:w-96 md:h-96 bg-secondary rounded-xl overflow-hidden">
            <Image
              src="https://ext.same-assets.com/2185237885/1932650201.png"
              alt="AI"
              width={384}
              height={384}
              className="h-full w-full object-cover"
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  );
}
