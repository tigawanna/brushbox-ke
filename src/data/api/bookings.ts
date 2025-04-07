import { Schema } from "@/lib/pb/pb-types";
import { TypedPocketBase } from "@tigawanna/typed-pocketbase";

export async function getBookings(pb: TypedPocketBase<Schema>) {
  try {
    const bookings = await pb.from("bookings").getFullList();
    return bookings;
  } catch (error) {
    console.log("Error fetching bookings:", error);
    return [];
  }
}
export async function getLatestBookings(pb: TypedPocketBase<Schema>) {
  try {
    const booking = await pb.from("bookings").getFirstListItem("");
    return booking;
  } catch (error) {
    console.log("Error fetching bookings:", error);
    return;
  }
}

export async function unbookAppointment(
  pb: TypedPocketBase<Schema>,
  bookingId: string,
  type: "cancel" | "reschedule",
  postponedTo?: string
) {
  try {
    if (type === "cancel") {
      await pb.from("bookings").update(bookingId, { id: bookingId, status: "canceled" });
    } else {
      await pb
        .from("bookings")
        .update(bookingId, { id: bookingId, preferred_date: postponedTo, status: "rescheduled" });
    }
    return true;
  } catch (error) {
    console.log("Error unbooking appointment:", error);
    return false;
  }
}
