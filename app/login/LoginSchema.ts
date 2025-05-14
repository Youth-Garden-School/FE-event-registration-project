import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Vui lòng nhập email hợp lệ"),
});

export const otpSchema = z.object({
  otp: z.string().min(6, "OTP phải có ít nhất 6 ký tự"),
});
