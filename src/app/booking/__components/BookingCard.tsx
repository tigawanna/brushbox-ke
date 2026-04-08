import type { LocalBookingRecord } from "@/types/local-booking";
import { formatDistance } from "date-fns";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Phone, Sparkles, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { customerStatusLabel } from "@/lib/customer-booking-status";

interface BookingCardProps {
  booking: LocalBookingRecord;
}

export function BookingCard({ booking }: BookingCardProps) {
  const formattedDate = new Date(booking.preferred_date).toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  const timeAgo = formatDistance(new Date(booking.created), new Date(), { addSuffix: true });
  const lastUpdated = formatDistance(new Date(booking.updated), new Date(), { addSuffix: true });
  const refs = booking.reference_image_data_urls;
  const relativeToAppointment = formatDistance(
    new Date(),
    new Date(booking.preferred_date),
    { addSuffix: true },
  );

  return (
    <Card
      className={cn(
        "w-full overflow-hidden border-primary/20 bg-base-200/35 shadow-[0_0_0_1px_rgba(212,175,55,0.08),0_24px_48px_-24px_rgba(0,0,0,0.6)]",
        "backdrop-blur-md transition-shadow duration-300 hover:shadow-[0_0_0_1px_rgba(212,175,55,0.15),0_28px_56px_-20px_rgba(212,175,55,0.12)]",
      )}
    >
      <CardHeader className="gap-4 border-b border-primary/10 pb-5 pt-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/15 ring-1 ring-primary/25">
              <User className="h-5 w-5 text-primary" strokeWidth={1.75} />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-semibold capitalize tracking-tight text-primary md:text-3xl">
                {booking.preferred_name}
              </h2>
              <p className="mt-1 font-sans text-xs uppercase tracking-[0.2em] text-base-content/45">
                Booking
              </p>
            </div>
          </div>
          <Badge
            variant="outline"
            className="shrink-0 border-primary/40 bg-primary/10 px-3 py-1 font-sans text-xs font-medium text-primary"
          >
            {relativeToAppointment}
          </Badge>
        </div>

        <div className="grid gap-3 font-sans sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-lg border border-base-300/60 bg-base-100/40 px-3 py-2.5">
            <Phone className="h-4 w-4 shrink-0 text-primary/80" strokeWidth={1.75} />
            <div>
              <p className="text-[10px] uppercase tracking-wider text-base-content/45">Phone</p>
              <p className="text-sm font-medium text-base-content tabular-nums">{booking.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-base-300/60 bg-base-100/40 px-3 py-2.5">
            <Calendar className="h-4 w-4 shrink-0 text-primary/80" strokeWidth={1.75} />
            <div>
              <p className="text-[10px] uppercase tracking-wider text-base-content/45">
                Appointment
              </p>
              <p className="text-sm font-medium text-base-content">{formattedDate}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="font-sans text-[10px] uppercase tracking-wider text-base-content/45">
            Services
          </span>
          {booking.services.map((s) => (
            <Badge
              key={s}
              variant="outline"
              className="border-primary/30 bg-primary/5 font-sans text-xs font-normal capitalize text-primary"
            >
              <Sparkles className="mr-1 h-3 w-3 opacity-70" />
              {s}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="font-sans text-[10px] uppercase tracking-wider text-base-content/45">
            Customer status
          </span>
          <Badge
            variant="outline"
            className="border-base-content/20 font-sans text-xs capitalize text-base-content/90"
          >
            {customerStatusLabel(booking.status)}
          </Badge>
        </div>
      </CardHeader>

      {booking.special_requests || refs.length > 0 ? (
        <CardContent className="space-y-4 pt-6">
          <div className="h-px w-full gold-gradient opacity-40" aria-hidden />
          {booking.special_requests ? (
            <div className="space-y-2">
              <p className="font-sans text-xs font-medium uppercase tracking-wider text-base-content/50">
                Special requests
              </p>
              <p className="rounded-lg border border-primary/20 bg-base-100/50 px-3 py-3 font-sans text-sm leading-relaxed text-base-content">
                {booking.special_requests}
              </p>
            </div>
          ) : null}
          {refs.length > 0 ? (
            <div className="space-y-3">
              <p className="font-sans text-xs font-medium uppercase tracking-wider text-base-content/50">
                Style inspiration
              </p>
              <div className="flex flex-wrap gap-3">
                {refs.map((src, index) => (
                  <div
                    key={`${booking.id}-ref-${index}`}
                    className="group relative overflow-hidden rounded-xl border border-primary/20 bg-base-100/30 p-1 ring-1 ring-base-300/50 transition hover:border-primary/35"
                  >
                    <div className="relative aspect-square w-full max-w-[200px] overflow-hidden rounded-lg">
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
        </CardContent>
      ) : null}

      <CardFooter className="flex flex-col gap-3 border-t border-primary/10 bg-base-100/20 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 font-sans text-xs text-base-content/55">
          <Clock className="h-3.5 w-3.5 shrink-0 text-primary/60" strokeWidth={1.75} />
          <span>
            Created <span className="text-base-content/75">{timeAgo}</span>
          </span>
        </div>
        <div className="flex items-center gap-2 font-sans text-xs text-base-content/55">
          <Clock className="h-3.5 w-3.5 shrink-0 text-primary/60" strokeWidth={1.75} />
          <span>
            Updated <span className="text-base-content/75">{lastUpdated}</span>
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
