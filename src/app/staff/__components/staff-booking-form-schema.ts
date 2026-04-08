import { z } from "zod";

export const staffBookingFormSchema = z.object({
  staff_notes: z.string(),
  staff_status: z.enum(["new", "in_progress", "done"]),
});

export type StaffBookingFormValues = z.infer<typeof staffBookingFormSchema>;
