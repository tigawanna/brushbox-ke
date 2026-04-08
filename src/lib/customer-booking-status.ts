import type { LocalCustomerBookingStatus } from "@/types/local-booking";

export function customerStatusLabel(status: LocalCustomerBookingStatus): string {
  if (status === "canceled") return "Canceled";
  if (status === "rescheduled") return "Rescheduled";
  return "Active";
}

export function customerStatusBadgeClass(status: LocalCustomerBookingStatus): string {
  if (status === "canceled") return "border-error/40 bg-error/10 text-error";
  if (status === "rescheduled") return "border-warning/45 bg-warning/10 text-warning";
  return "border-primary/40 bg-primary/10 text-primary";
}
