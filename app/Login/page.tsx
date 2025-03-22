"use client";

import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Define the schema for email validation using Zod
const loginSchema = z.object({
  email: z.string().email("Vui lòng nhập email hợp lệ"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate the email using Zod
    const result = loginSchema.safeParse({ email });
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    // Proceed with login logic (e.g., API call)
    console.log("Email submitted:", email);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[400px] shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            Chào mừng đến với REGISTA
          </CardTitle>
          <p className="text-sm text-gray-500">
            Vui lòng đăng nhập hoặc đăng ký bằng email.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
            <Button
              type="submit"
              className="w-full bg-black text-white cursor-pointer "
            >
              Tiếp tục với Email
            </Button>
          </form>
          <div className="mt-4">
            <Button
              variant="outline"
              className="w-full flex items-center gap-2 cursor-pointer hover:bg-gray-600 hover:text-white"
              onClick={() => console.log("Sign in with Google")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
              </svg>
              Đăng nhập với Google
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
