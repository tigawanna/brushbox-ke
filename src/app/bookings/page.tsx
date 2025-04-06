import { ResponsiveGenericToolbar } from "@/components/nav/ResponsiveGenericToolbar";

import { getServerCurrentUser, serverPBClient } from "@/lib/pb/server-client";
import { BookingSectionForm } from "./__components/BookingSectionForm";
import { DiaDrawer } from "@/components/shared/DiaDrawer";
import { Plus } from "lucide-react";
import { BookingsDialog } from "./__components/BookingsDialog";

interface pageProps {}

export default async function page({}: pageProps) {
  const pb = await serverPBClient();
  const currentUser = await getServerCurrentUser(pb);
  const appointments = await (await serverPBClient()).from("users").getFullList();
  // console.log("currentUser",currentUser);
  return (
    <ResponsiveGenericToolbar links={[]}>
      <div className="w-full mt-10 min-h-screen h-full flex flex-col  items-center ">
      <BookingsDialog currentUser={currentUser} />
        <div className="w-full h-full flex flex-col items-center justify-center">
          <h3 className="text-primary text-xl max-w-xl lg:text-3xl font-bold mb-4 leading-tight">
            bookings
          </h3>
          {appointments.map((appointment) => (
            <div key={appointment.id} className="p-4 border border-base-300 rounded-lg mb-4">
              <p>{appointment.name}</p>
              <p>{appointment.email}</p>
            </div>
          ))}
        </div>
      </div>
    </ResponsiveGenericToolbar>
  );
}
