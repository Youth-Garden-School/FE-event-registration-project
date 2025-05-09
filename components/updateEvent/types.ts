import { z } from "zod";

export interface Event {
  id: string;
  title: string;
  description?: string;
  coverImage?: string;
  startTime: string;
  endTime: string;
  location?: string;
  isOnline: boolean;
  eventColor?: string;
  fontStyle?: string;
  themeMode?: string;
  style?: string;
  seasonalTheme?: string;
  requiresApproval: boolean;
  attendees?: string[];
  category?: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

export const formSchema = z.object({
  title: z.string().min(1, "Vui lòng nhập tên sự kiện"),
  startDate: z.date(),
  endDate: z.date(),
  location: z.string().optional(),
  description: z.string().optional(),
  requireApproval: z.boolean().default(false),
  capacity: z.string().default("Không giới hạn"),
});

export type FormValues = z.infer<typeof formSchema>;
