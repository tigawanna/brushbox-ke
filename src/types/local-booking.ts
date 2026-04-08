export type LocalBookingService = "hair" | "nails" | "facial" | "massage" | "waxing" | "other";

export type LocalCustomerBookingStatus = "" | "canceled" | "rescheduled";

export type LocalStaffWorkflowStatus = "new" | "in_progress" | "done";

export interface LocalBookingRecord {
  id: string;
  preferred_name: string;
  phone: string;
  services: LocalBookingService[];
  preferred_date: string;
  special_requests: string;
  reference_image_data_urls: string[];
  status: LocalCustomerBookingStatus;
  staff_notes: string;
  staff_status: LocalStaffWorkflowStatus;
  created: string;
  updated: string;
}
