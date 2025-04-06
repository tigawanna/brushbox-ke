import { ResponsiveGenericToolbar } from "@/components/nav/ResponsiveGenericToolbar";
import { serverPBClient, getServerCurrentUser } from "@/lib/pb/server-client";
import { BookingSectionForm } from "../bookings/__components/BookingSectionForm";

export default async function pagePage() {
  const pb = await serverPBClient();
  const cuccrentUser = await getServerCurrentUser(pb);
  const appointments = await (await serverPBClient()).from("users").getFullList();
  return (
    <ResponsiveGenericToolbar links={[]}>
      <div className="w-full mt-10 min-h-screen h-full flex  items-center justify-center">
        <BookingSectionForm user={cuccrentUser} />
        <div className="w-full h-full flex flex-col items-center justify-center">
          <h1 className="text-primary text-2xl max-w-xl lg:text-7xl font-bold mb-4 leading-tight">
            Shop
          </h1>
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
