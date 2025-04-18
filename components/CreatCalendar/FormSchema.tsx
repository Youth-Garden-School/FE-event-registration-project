import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, { message: "Tên lịch không được để trống" }),
  description: z.string().optional(),
  color: z.string(),
  publicUrl: z.string().optional(),
  location: z.string().optional(),
});
