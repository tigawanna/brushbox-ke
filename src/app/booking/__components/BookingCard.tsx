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
import { Clock, Phone, Calendar } from "lucide-react";

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
    <Card className="w-full overflow-hidden border-base-300 hover:border-primary/20 transition-all duration-300">
      <CardHeader className="bg-primary/5 pb-4">
        <div className="flex gap-3  flex-col justify-between">
          <div className="flex justify-between gap-3">
            <CardTitle className="capitalize text-3xl">{booking.preferred_name}</CardTitle>
            <div className="badge bagde-primary badge-outline">
              {formatDistance(new Date(), new Date(booking.preferred_date), { addSuffix: true })}
            </div>
          </div>
          <CardDescription className="text-xl">{formattedDate}</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <div className="grid gap-3">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-base-content/70" />
              <span className="text-sm text-base-content/70">Phone</span>
              <span className="font-semibold">{booking.phone}</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Calendar className="w-4 h-4 text-base-content/70" />
              <span className="text-sm text-base-content/70">Services</span>
              <span className="font-semibold capitalize">{booking.services.join(", ")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-base-content/70" />
              <span className="text-sm text-base-content/70">Appointment Date</span>
              <span className="font-semibold">{formattedDate}</span>
            </div>
          </div>

          {booking.special_requests ? (
            <div className="mt-2">
              <h3 className="text-sm font-semibold mb-1">Special Requests</h3>
              <p className="bg-base-200 p-3 rounded-md text-sm">{booking.special_requests}</p>
            </div>
          ) : null}

          {refs.length > 0 ? (
            <div className="mt-4">
              <h3 className="text-sm font-semibold mb-2">Style Inspiration</h3>
              <div className="flex flex-wrap  gap-2">
                {refs.map((src, index) => (
                  <div
                    key={`${booking.id}-ref-${index}`}
                    className="relative w-full  md:w-[200px] max-h-[200px] aspect-square rounded-md overflow-hidden"
                  >
                    <img
                      src={src}
                      alt={`${booking.preferred_name} inspiration ${index + 1}`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </CardContent>

      <CardFooter className="justify-between items-center mt-4 text-xs text-base-content/60 pt-2 border-t border-base-200">
        <div>
          <Clock className="w-4 h-4 inline-block mr-1" />
          <span>Created: {timeAgo}</span>
        </div>
        <div>
          <Clock className="w-4 h-4 inline-block mr-1" />
          <span>Updated: {lastUpdated}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
