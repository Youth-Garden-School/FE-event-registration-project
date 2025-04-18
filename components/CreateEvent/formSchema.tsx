import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(1, "Vui lòng nhập tên sự kiện"),
  startDate: z.date(),
  endDate: z.date(),
  location: z.string().optional(),
  description: z.string().optional(),
  requireApproval: z.boolean().default(false),
  capacity: z.string().default("Không giới hạn"),
});
