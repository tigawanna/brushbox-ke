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
    const bookings = await pb.from("bookings").getFirstListItem("")
    return bookings;
  } catch (error) {
    console.log("Error fetching bookings:", error);
    return [];
  }
}

