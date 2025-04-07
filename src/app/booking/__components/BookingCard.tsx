import { BookingsResponse } from "@/lib/pb/pb-types";
import Image from "next/image";
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
import { getFileURL } from "@/lib/pb/utils";





interface BookingCardProps {
  booking: BookingsResponse;
}

export function BookingCard({ booking }: BookingCardProps) {
  // Format date for display
  const formattedDate = new Date(booking.preferred_date).toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Calculate time from now
  const timeAgo = formatDistance(new Date(booking.created), new Date(), { addSuffix: true });
  // Calculate time since last update
  const lastUpdated = formatDistance(new Date(booking.updated), new Date(), { addSuffix: true });
  const lookReferences = booking.references as string[] | undefined; 

  return (
    <Card className="w-full overflow-hidden border-base-300 hover:border-primary/20 transition-all duration-300">
      <CardHeader className="bg-primary/5 pb-4">
        <div className="flex gap-3  flex-col justify-between">
          <div className="flex justify-between gap-3">
            <CardTitle className="capitalize text-3xl">{booking.preferred_name}</CardTitle>
            {/* <Badge className="capitalize">{booking.status}</Badge> */}
            <div className="badge bagde-primary badge-outline">{formatDistance(new Date(),new Date(booking.preferred_date),  { addSuffix: true })}</div>
          </div>
          <CardDescription className="text-xl">{formattedDate}</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          {/* Customer details */}
          <div className="grid gap-3">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-base-content/70" />
              <span className="text-sm text-base-content/70">Phone</span>
              <span className="font-semibold">{booking.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-base-content/70" />
              <span className="text-sm text-base-content/70">Appointment Date</span>
              <span className="font-semibold">{formattedDate}</span>
            </div>
          </div>

          {/* Special requests */}
          {booking.special_requests && (
            <div className="mt-2">
              <h3 className="text-sm font-semibold mb-1">Special Requests</h3>
              <p className="bg-base-200 p-3 rounded-md text-sm">{booking.special_requests}</p>
            </div>
          )}

          {/* Inspiration section */}
          {lookReferences && lookReferences?.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-semibold mb-2">Style Inspiration</h3>
              <div className="flex flex-wrap  gap-2">
                {lookReferences?.map((image, index) => (
                  <div
                    key={index}
                    className="relative w-full  md:w-[200px] max-h-[200px] aspect-square rounded-md overflow-hidden">
                    <Image
                      src={getFileURL({
                        collection_id_or_name: "bookings",
                        record_id: booking.id,
                        file_name: image,
                      })}
                      alt={`${booking.preferred_name} inspiration ${index + 1}`}
                      // height={300}
                      // width={300}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 300px"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>

      {/* Metadata footer */}
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
