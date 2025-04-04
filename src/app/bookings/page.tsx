import { ResponsiveGenericToolbar } from "@/components/nav/ResponsiveGenericToolbar";

import { getServerCurrentUser, serverPBClient } from "@/lib/pb/server-client";
import { BookingSectionForm } from "./__components/BookingSectionForm";

interface pageProps {}

export default async function page({}: pageProps) {
  const pb = await serverPBClient();
  const cuccrentUser = await getServerCurrentUser(pb);
  const appointments = await(await serverPBClient()).from("users").getFullList();
  console.log("cuccrentUser",cuccrentUser);
  return (
    <ResponsiveGenericToolbar links={[]}>
      <div className="w-full mt-10 min-h-screen h-full flex  items-center justify-center">
      <BookingSectionForm user={cuccrentUser} />
      <div className="w-full h-full flex flex-col items-center justify-center">
        booking
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
