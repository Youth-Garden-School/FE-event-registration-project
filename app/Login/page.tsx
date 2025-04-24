"use client";

import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";

// Define schemas for validation using Zod
const loginSchema = z.object({
  email: z.string().email("Vui lòng nhập email hợp lệ"),
});

const otpSchema = z.object({
  otp: z.string().min(6, "OTP phải có ít nhất 6 ký tự"),
});

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isOtpStep, setIsOtpStep] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Base URL from Postman collection
  const PROD_URL =
    "https://be-event-registration-project-production.up.railway.app/api";

  // Handle email submission
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Validate email
    const result = loginSchema.safeParse({ email });
    if (!result.success) {
      setError(result.error.errors[0].message);
      setIsLoading(false);
      return;
    }

    try {
      // Call API to send OTP
      await axios.post(`${PROD_URL}/auths/login/email`, { email });
      setIsOtpStep(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "Đã xảy ra lỗi khi gửi OTP");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OTP submission
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    //Validate OTP
    const result = otpSchema.safeParse({ otp });
    if (!result.success) {
      setError(result.error.errors[0].message);
      setIsLoading(false);
      return;
    }

    try {
      // Call API to verify OTP
      const response = await axios.post(`${PROD_URL}/auths/login/verify`, {
        email,
        otp,
      });

      const accessToken = response.data?.result?.accessToken;
      if (accessToken) {
        // Store accessToken
        localStorage.setItem("ACCESS_TOKEN", accessToken);
        console.log("Đăng nhập thành công, ACCESS_TOKEN:", accessToken);
        // Redirect and reload homepage
        window.location.assign("/event");
      } else {
        setError("Không nhận được accessToken từ server");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "OTP không hợp lệ");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle going back to email input
  const handleBack = () => {
    setIsOtpStep(false);
    setOtp("");
    setError(null);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-accent-foreground">
      <Card className="w-[400px] shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            Chào mừng đến với REGISTA
          </CardTitle>
          <p className="text-sm text-gray-500">
            {isOtpStep
              ? "Nhập mã OTP được gửi đến email của bạn"
              : "Vui lòng đăng nhập hoặc đăng ký bằng email"}
          </p>
        </CardHeader>
        <CardContent>
          {!isOtpStep ? (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                  disabled={isLoading}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
              <Button
                type="submit"
                className="w-full bg-black text-white cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? "Đang gửi..." : "Tiếp tục với Email"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="otp" className="text-sm font-medium">
                  Mã OTP
                </label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Nhập mã OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full"
                  disabled={isLoading}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
              <div className="flex">
                <div className="">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full cursor-pointer"
                    onClick={handleBack}
                    disabled={isLoading}
                  >
                    Quay lại
                  </Button>
                </div>
                <div className="absolute right-[580px]">
                  <Button
                    type="submit"
                    className="w-full bg-black text-white cursor-pointer"
                    disabled={isLoading}
                  >
                    {isLoading ? "Đang xác minh..." : "Xác minh OTP"}
                  </Button>
                </div>
              </div>
            </form>
          )}
          {!isOtpStep && (
            <div className="mt-4">
              <Button
                variant="outline"
                className="w-full flex items-center gap-2 cursor-pointer hover:bg-gray-600 hover:text-white"
                onClick={() => console.log("Sign in with Google")}
                disabled={isLoading}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                  <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                </svg>
                Đăng nhập với Google
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
