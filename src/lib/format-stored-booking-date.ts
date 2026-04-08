export function formatStoredBookingDate(date: string | Date): string {
  if (date instanceof Date) {
    return date.toISOString().replace("T", " ");
  }
  return new Date(date).toISOString().replace("T", " ");
}
