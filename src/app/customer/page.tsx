import { ResponsiveGenericToolbar } from "@/components/nav/ResponsiveGenericToolbar";
import { getServerCurrentUser, serverPBClient } from "@/lib/pb/server-client";
import { BookingsDialog } from "./__components/BookingsDialog";
import { getBookings } from "@/data/api/bookings";
import { BookingCard } from "./__components/BookingCard";

interface pageProps {}

export default async function page({}: pageProps) {
  const pb = await serverPBClient();
  const currentUser = await getServerCurrentUser(pb);
  const appointments = await getBookings(pb);
  // console.log("currentUser",currentUser);
  return (
    <ResponsiveGenericToolbar links={[]} user={currentUser}>
      <div className="w-full mt-10 min-h-screen h-full flex flex-col  items-center ">
        <div className="w-full mt-10 h-full flex flex-col items-center ">
          <h3 className="text-primary w-full sticky text-center top-20 text-xl lg:text-3xl font-bold mb-4 leading-tight">
            bookings
          </h3>
          <BookingsDialog currentUser={currentUser} />
          {appointments.map((appointment) => <BookingCard key={appointment.id} booking={appointment} />)}
        </div>
      </div>
    </ResponsiveGenericToolbar>
  );
}
