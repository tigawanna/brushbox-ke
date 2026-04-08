import type { LocalBookingRecord } from "@/types/local-booking";
import { formatDistance } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Clock, Phone, Sparkles } from "lucide-react";

interface BookingCardProps {
  booking: LocalBookingRecord;
}

export function BookingCard({ booking }: BookingCardProps) {
  const formattedDate = new Date(booking.preferred_date).toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const timeAgo = formatDistance(new Date(booking.created), new Date(), { addSuffix: true });
  const lastUpdated = formatDistance(new Date(booking.updated), new Date(), { addSuffix: true });
  const refs = booking.reference_image_data_urls;

  return (
    <Card className="w-full overflow-hidden border-base-300/90 bg-gradient-to-b from-base-100 to-base-200/30 shadow-lg shadow-black/20 ring-1 ring-primary/5 transition-all duration-300 hover:border-primary/25 hover:ring-primary/10">
      <CardHeader className="relative border-b border-base-300/60 bg-gradient-to-br from-primary/[0.07] via-transparent to-transparent pb-6 pt-7 px-6 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2 min-w-0">
            <CardTitle className="font-serif capitalize text-2xl sm:text-3xl tracking-tight text-base-content">
              {booking.preferred_name}
            </CardTitle>
            <CardDescription className="text-sm sm:text-base text-base-content/65 font-normal leading-snug">
              {formattedDate}
            </CardDescription>
          </div>
          <div className="badge badge-outline border-primary/35 bg-primary/5 text-primary whitespace-nowrap shrink-0 px-3 py-2 h-auto min-h-0 font-medium">
            {formatDistance(new Date(), new Date(booking.preferred_date), { addSuffix: true })}
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-6 sm:px-8 pb-2 pt-6">
        <div className="flex flex-col gap-6">
          <div className="grid gap-3">
            <div className="flex items-start gap-3 rounded-xl border border-base-300/50 bg-base-200/25 px-4 py-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Phone className="h-4 w-4" />
              </span>
              <div className="min-w-0 pt-0.5">
                <span className="text-xs font-medium uppercase tracking-wider text-base-content/45">
                  Phone
                </span>
                <p className="font-medium text-base-content tabular-nums">{booking.phone}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-base-300/50 bg-base-200/25 px-4 py-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Sparkles className="h-4 w-4" />
              </span>
              <div className="min-w-0 pt-0.5">
                <span className="text-xs font-medium uppercase tracking-wider text-base-content/45">
                  Services
                </span>
                <p className="font-medium capitalize text-base-content">{booking.services.join(", ")}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-base-300/50 bg-base-200/25 px-4 py-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Calendar className="h-4 w-4" />
              </span>
              <div className="min-w-0 pt-0.5">
                <span className="text-xs font-medium uppercase tracking-wider text-base-content/45">
                  Scheduled for
                </span>
                <p className="font-medium text-base-content leading-snug">{formattedDate}</p>
              </div>
            </div>
          </div>

          {booking.special_requests ? (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-base-content/50 mb-2">
                Special requests
              </h3>
              <p className="rounded-xl border border-base-300/50 bg-base-200/30 px-4 py-3 text-sm leading-relaxed text-base-content/90">
                {booking.special_requests}
              </p>
            </div>
          ) : null}

          {refs.length > 0 ? (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-base-content/50 mb-3">
                Style inspiration
              </h3>
              <div className="flex flex-wrap gap-4">
                {refs.map((src, index) => (
                  <div
                    key={`${booking.id}-ref-${index}`}
                    className="group relative w-full max-w-[220px] overflow-hidden rounded-xl border-2 border-primary/20 bg-base-200/40 p-1.5 shadow-inner shadow-black/20 ring-1 ring-base-300/60 transition hover:border-primary/35"
                  >
                    <div className="relative aspect-square overflow-hidden rounded-lg">
                      <img
                        src={src}
                        alt={`${booking.preferred_name} inspiration ${index + 1}`}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-3 border-t border-base-300/50 bg-base-200/20 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-center gap-2 text-xs text-base-content/55">
          <Clock className="h-3.5 w-3.5 shrink-0 text-primary/60" />
          <span>
            Created <span className="text-base-content/75">{timeAgo}</span>
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-base-content/55">
          <Clock className="h-3.5 w-3.5 shrink-0 text-primary/60" />
          <span>
            Updated <span className="text-base-content/75">{lastUpdated}</span>
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
