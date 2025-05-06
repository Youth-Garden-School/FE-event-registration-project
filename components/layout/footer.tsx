"use client";

import Link from "next/link";
import { Mail, Instagram } from "lucide-react";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className="max-w-[1050px] bg-white py-4 px-6 border-t my-0 mx-auto">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          <span className="text-gray-600 text-lg font-semibold">Regista</span>
          <Image
            src="/images/logo.svg"
            alt="Logo"
            width={30}
            height={30}
            className="rounded-md"
          />
          <div className="flex flex-wrap gap-4 text-gray-600 text-sm">
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
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="mailto:support@luma.com" aria-label="Email">
            <Mail className="w-5 h-5 text-gray-600 hover:text-gray-800" />
          </Link>
          <Link
            href="https://apps.apple.com/us/app/luma-delightful-events/id1546150895"
            aria-label="Custom Link"
          >
            <svg
              className="w-5 h-5 text-gray-600 hover:text-gray-800"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512 "
            >
              <path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM127 384.5c-5.5 9.6-17.8 12.8-27.3 7.3-9.6-5.5-12.8-17.8-7.3-27.3l14.3-24.7c16.1-4.9 29.3-1.1 39.6 11.4L127 384.5zm138.9-53.9H84c-11 0-20-9-20-20s9-20 20-20h51l65.4-113.2-20.5-35.4c-5.5-9.6-2.2-21.8 7.3-27.3 9.6-5.5 21.8-2.2 27.3 7.3l8.9 15.4 8.9-15.4c5.5-9.6 17.8-12.8 27.3-7.3 9.6 5.5 12.8 17.8 7.3 27.3l-85.8 148.6h62.1c20.2 0 31.5 23.7 22.7 40zm98.1 0h-29l19.6 33.9c5.5 9.6 2.2 21.8-7.3 27.3-9.6 5.5-21.8 2.2-27.3-7.3-32.9-56.9-57.5-99.7-74-128.1-16.7-29-4.8-58 7.1-67.8 13.1 22.7 32.7 56.7 58.9 102h52c11 0 20 9 20 20 0 11.1-9 20-20 20z" />
            </svg>
          </Link>
          <Link href="https://x.com/luma" aria-label="X">
            <svg
              className="w-5 h-5 text-gray-600 hover:text-gray-800"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </Link>
          <Link href="https://instagram.com/luma" aria-label="Instagram">
            <Instagram className="w-5 h-5 text-gray-600 hover:text-gray-800" />
          </Link>
        </div>
      </div>
      <div className="mt-4">
        <div className="">
          <div className="flex gap-4 text-gray-600 text-sm">
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
      </div>
    </footer>
  );
}
