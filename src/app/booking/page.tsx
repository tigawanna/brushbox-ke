import { ResponsiveGenericToolbar } from "@/components/nav/ResponsiveGenericToolbar";
import { getServerCurrentUser, serverPBClient } from "@/lib/pb/server-client";
import { getBookings, getLatestBookings } from "@/data/api/bookings";
import { BookingCard } from "./__components/BookingCard";
import { BookingSectionForm } from "./__components/BookingSectionForm";
import { BookingsDialog } from "./__components/BookingsDialog";
import { BookingsResponse } from "@/lib/pb/pb-types";

interface pageProps {}

export default async function page({}: pageProps) {
  const pb = await serverPBClient();
  const currentUser = await getServerCurrentUser(pb);
  const appointments = await getBookings(pb);
  const booking = await getLatestBookings(pb)
  console.log("= booking ====", booking);
  return (
    <ResponsiveGenericToolbar links={[]} user={currentUser}>
      <div className="w-full mt-10 min-h-screen h-full flex flex-col  items-center">
        <div className="w-full mt-10 h-full flex  flex-col items-center p-5">
          <div className="w-full bg-base-100 z-30 flex  sticky  top-20   items-center justify-evenly">
            <h3 className="w-full lg:px-6 text-xl lg:text-3xl font-bold mb-4 leading-tight">
              bookings
            </h3>
            <BookingsDialog currentUser={currentUser} booking={booking as BookingsResponse | undefined}/>
          </div>
          {/* <BookingSectionForm user={currentUser}/> */}
          {appointments.map((appointment) => (
            <BookingCard key={appointment.id} booking={appointment} />
          ))}
        </div>
      </div>
    </ResponsiveGenericToolbar>
  );
}
