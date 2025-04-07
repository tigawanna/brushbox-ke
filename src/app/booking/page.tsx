import { ResponsiveGenericToolbar } from "@/components/nav/ResponsiveGenericToolbar";
import { getServerCurrentUser, serverPBClient } from "@/lib/pb/server-client";
import { getBookings, getLatestBookings } from "@/data/api/bookings";
import { BookingCard } from "./__components/BookingCard";
import { BookingSectionForm } from "./__components/BookingSectionForm";
import { BookingsDialog, DeleteBookingsDialog } from "./__components/BookingsDialog";
import { BookingsResponse } from "@/lib/pb/pb-types";

interface pageProps {}

export default async function page({}: pageProps) {
  const pb = await serverPBClient();
  const currentUser = await getServerCurrentUser(pb);
  const appointments = await getBookings(pb);
  const booking = await getLatestBookings(pb)

  if(!booking){
      return (
        <ResponsiveGenericToolbar links={[]} user={currentUser}>
          <div className="w-full mt-20 min-h-screen h-full flex flex-col items-center">
            <div className="w-full max-w-3xl bg-base-200/60 rounded-lg shadow-lg overflow-hidden">
 
              <div className="bg-base-100 p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-base-content">No Bookings Yet</h3>
                  <p className="text-base-content/70 mt-2 mb-6 max-w-md">
                    You haven&apos;t made any bookings with us yet. Schedule your first appointment to
                    experience our top-quality services.
                  </p>
              
                  <BookingsDialog
                    currentUser={currentUser}
                    booking={undefined}
                    // buttonText="Book Your First Appointment"
                    // buttonClassName="btn btn-primary btn-lg"
                  />
                </div>
                <div className="mt-8 border-t border-base-300 pt-6">
                  <h4 className="font-medium text-base-content mb-3">What to expect:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-success mr-2 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-base-content/80">
                        Easy booking process with your preferred date and time
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-success mr-2 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-base-content/80">
                        Professional service from our expert team
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-success mr-2 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-base-content/80">Email confirmation and reminders</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </ResponsiveGenericToolbar>
      );
  }

  return (
    <ResponsiveGenericToolbar links={[]} user={currentUser}>
      <div className="w-full md:mt-10 min-h-screen h-full flex flex-col  items-center">
        <div className="w-full md:mt-10 h-full flex  flex-col items-center p-5">
          <div className="w-full bg-base-100 z-30 p-2 flex flex-col md:flex-row  sticky top-2  md:top-20   items-center justify-between">
            <div className=" py-6 px-4 sm:px-6">
              <h2 className="text-2xl font-bold text-primary">Welcome to Your Booking Dashboard</h2>
              <p className="mt-1 text-primary/80 max-w-2xl">
                Here you can manage your appointments, view your booking history, and schedule new
                appointments with ease.
              </p>
            </div>
            <div className="w-full  flex flex-wrap gap-6 md:gap-2  justify-center md:justify-end">

            <DeleteBookingsDialog booking={booking} />
            <BookingsDialog
              currentUser={currentUser}
              booking={booking as BookingsResponse | undefined}
            />
          </div>
          </div>
          <BookingCard key={booking.id} booking={booking} />
        </div>
      </div>
    </ResponsiveGenericToolbar>
  );
}
