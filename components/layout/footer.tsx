"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const pathname = usePathname();
  const isHomePage = pathname === "/"; // page.tsx là trang chủ

  return (
    <footer
      className={`w-full py-4 px-6 border-t my-0 mx-auto ${
        isHomePage ? "bg-black text-white" : "bg-white text-gray-600"
      }`}
    >
      <div className="container mx-auto flex flex-col items-center justify-center text-center gap-2">
        <div className="flex items-center gap-1">
          <span className="text-lg font-semibold">Regista</span>
          <Image
            src="/images/REGISTA.svg"
            alt="Logo"
            width={30}
            height={30}
            className="rounded-md"
          />
          <div className="flex flex-wrap gap-4 text-sm">
            <Link href="/whats-new" className="hover:text-black">
              Có gì mới
            </Link>
            <Link href="/explore" className="hover:text-black">
              Khám phá
            </Link>
            <Link href="/pricing" className="hover:text-black">
              Bằng giá
            </Link>
            <Link href="/help" className="hover:text-black">
              Trợ giúp
            </Link>
            <Link href="mailto:support@luma.com" aria-label="Email">
              <Mail className="w-5 h-5 hover:text-gray-800" />
            </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex flex-col items-center justify-center text-center gap-2">
        <div className="flex gap-4 text-sm">
          <Link href="/terms" className="hover:text-black">
            Điều khoản
          </Link>
          <Link href="/privacy" className="hover:text-black">
            Quyền riêng tư
          </Link>
          <Link href="/security" className="hover:text-black">
            Báo mật
          </Link>
        </div>
      </div>
    </footer>
  );
}
