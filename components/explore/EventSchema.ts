import { z } from "zod";

export const eventSchema = z.object({
  id: z.string(), // Changed to string to match API
  title: z.string().min(1, "Tiêu đề là bắt buộc"),
  startTime: z.string().transform((val) => {
    // Transform API datetime (e.g., "2025-05-03 09:00:00") to ISO 8601
    try {
      return new Date(val).toISOString();
    } catch {
      throw new Error(`Invalid datetime format: ${val}`);
    }
  }),
  endTime: z.string().transform((val) => {
    try {
      return new Date(val).toISOString();
    } catch {
      throw new Error(`Invalid datetime format: ${val}`);
    }
  }),
  location: z.string().optional(),
  description: z.string().optional(),
  coverImage: z
    .string()
    .nullable()
    .transform((val) => val ?? "/images/events/vcs-mixer.jpg"),
  isOnline: z.boolean().default(false), // Default to false if not provided
  eventColor: z.string().optional(),
  fontStyle: z.string().optional(),
  themeMode: z.string().optional(),
  style: z.string().optional(),
  seasonalTheme: z.string().optional(),
  requiresApproval: z.boolean().optional(),
  // calendarId: z.number().optional(), // Uncomment if API includes calendarId
});

export type EventProps = z.infer<typeof eventSchema>;
