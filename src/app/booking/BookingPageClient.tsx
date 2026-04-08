"use client";

import { ResponsiveGenericToolbar } from "@/components/nav/ResponsiveGenericToolbar";
import { BookingCard } from "./__components/BookingCard";
import { BookingsDialog, DeleteBookingsDialog } from "./__components/BookingsDialog";
import { useLocalBookings } from "@/hooks/common/use-local-bookings";
import Link from "next/link";

export function BookingPageClient() {
  const { bookings, loading, refresh } = useLocalBookings();

  if (loading) {
    return (
      <ResponsiveGenericToolbar links={[]}>
        <div className="w-full mt-20 min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,oklch(26%_0.007_34.298/0.5),transparent)]">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      </ResponsiveGenericToolbar>
    );
  }

  if (bookings.length === 0) {
    return (
      <ResponsiveGenericToolbar links={[]}>
        <div className="w-full mt-20 min-h-screen h-full flex flex-col items-center px-4 sm:px-6 pb-16 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,oklch(26%_0.007_34.298/0.45),transparent)]">
          <div className="w-full max-w-3xl rounded-2xl border border-base-300/80 bg-base-200/40 shadow-xl shadow-black/20 backdrop-blur-sm overflow-hidden ring-1 ring-primary/10">
            <div className="bg-base-100/90 p-8 sm:p-10">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 ring-1 ring-primary/25 flex items-center justify-center mb-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-base-content">
                  No bookings yet
                </h3>
                <p className="text-base-content/65 mt-3 mb-8 max-w-md text-sm leading-relaxed">
                  You haven&apos;t made any bookings with us yet. Schedule your first appointment to
                  experience our top-quality services.
                </p>

                <BookingsDialog onSaved={refresh} />
              </div>
              <div className="mt-2 border-t border-base-300/80 pt-8">
                <h4 className="text-xs font-semibold uppercase tracking-widest text-base-content/50 mb-4">
                  What to expect
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-success mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
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
                      stroke="currentColor"
                    >
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
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-base-content/80">Clear summary of your request</span>
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
    <ResponsiveGenericToolbar links={[]}>
      <div className="w-full md:mt-10 min-h-screen flex flex-col items-center bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,oklch(26%_0.007_34.298/0.45),transparent)]">
        <div className="w-full md:mt-8 flex flex-col items-center px-4 sm:px-6 pb-20 gap-10 max-w-5xl mx-auto">
          <div className="w-full rounded-2xl border border-primary/15 bg-gradient-to-br from-base-200/50 via-base-100/80 to-base-100/90 p-6 sm:p-8 md:p-10 shadow-xl shadow-black/25 backdrop-blur-sm ring-1 ring-base-300/60 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-3 min-w-0">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-primary/70">
                Your visits
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-primary">
                Booking dashboard
              </h2>
              <p className="text-sm sm:text-base text-base-content/70 max-w-xl leading-relaxed">
                Manage upcoming appointments, review details, and add new bookings when you need
                them.
              </p>
              <Link
                href="/staff"
                className="inline-flex items-center gap-2 mt-1 text-sm font-medium text-primary hover:text-primary/90 rounded-full px-3 py-1.5 -ml-3 transition-colors hover:bg-primary/10"
              >
                Open staff view
                <span aria-hidden className="text-primary/80">
                  →
                </span>
              </Link>
            </div>
            <div className="w-full md:w-auto shrink-0 flex md:justify-end">
              <BookingsDialog onSaved={refresh} />
            </div>
          </div>
          <div className="w-full flex flex-col gap-12">
            {bookings.map((booking) => (
              <div key={booking.id} className="w-full flex flex-col gap-4">
                <div className="flex flex-wrap justify-end gap-3">
                  <DeleteBookingsDialog booking={booking} onDone={refresh} />
                  <BookingsDialog booking={booking} onSaved={refresh} />
                </div>
                <BookingCard booking={booking} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </ResponsiveGenericToolbar>
  );
}
