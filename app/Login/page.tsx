"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiClient, API_BASE_URL } from "@/components/common/apiClient";
import { loginSchema, otpSchema } from "./LoginSchema";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isOtpStep, setIsOtpStep] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Base URL from Postman collection
  const PROD_URL =
    "https://be-event-registration-project-jpv3.onrender.com/api";
  // Nhánh Đức

  // Handle email submission
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Validate email
    const result = loginSchema.safeParse({ email });
    if (!result.success) {
      setError(result.error.errors[0].message);
      toast.error(result.error.errors[0].message);
      setIsLoading(false);
      return;
    }

    try {
      await apiClient.post(`${API_BASE_URL}/auths/login/email`, { email });
      setIsOtpStep(true);
      toast.success("OTP đã được gửi đến email của bạn!");
    } catch (err: any) {
      const message = err.message || "Đã xảy ra lỗi khi gửi OTP";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OTP submission
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Validate OTP
    const result = otpSchema.safeParse({ otp });
    if (!result.success) {
      setError(result.error.errors[0].message);
      toast.error(result.error.errors[0].message);
      setIsLoading(false);
      return;
    }

    try {
      const response = await apiClient.post(
        `${API_BASE_URL}/auths/login/verify`,
        {
          email,
          otp,
        },
      );

      const accessToken = response.result?.accessToken;
      if (accessToken) {
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", response.result.refreshToken);
        localStorage.setItem("user_id", response.result.user.id);
        toast.success("Đăng nhập thành công!");
        window.location.assign("/event");
      } else {
        setError("Không nhận được accessToken từ server");
        toast.error("Không nhận được accessToken từ server");
      }
    } catch (err: any) {
      const message = err.message || "OTP không hợp lệ";
      setError(message);
      toast.error(message);
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
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="w-1/2 cursor-pointer"
                  onClick={handleBack}
                  disabled={isLoading}
                >
                  Quay lại
                </Button>
                <Button
                  type="submit"
                  className="w-1/2 bg-black text-white cursor-pointer"
                  disabled={isLoading}
                >
                  {isLoading ? "Đang xác minh..." : "Xác minh OTP"}
                </Button>
              </div>
            </form>
          )}
          {!isOtpStep && (
            <div className="mt-4">
              <Button
                variant="outline"
                className="w-full flex items-center gap-2 cursor-pointer hover:bg-gray-600 hover:text-white"
                onClick={() => console.log("TODO: Implement Password")}
                disabled={isLoading}
              >
                Đăng nhập mật khẩu
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
