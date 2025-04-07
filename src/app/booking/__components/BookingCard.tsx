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
import { Badge } from "@/components/ui/badge";
import { Clock, Phone, Calendar, MessageSquare } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";



// Define inspiration images for each service type
const fillerInspirationImages: Record<string, string[]> = {
  "": [],
  hair: [
    "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&auto=format",
    "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&h=300&auto=format",
  ],
  nails: [

    "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&auto=format",
  ],
  facial: [
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&auto=format",

  ],
  massage: [
    "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=400&h=300&auto=format",
    "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&h=300&auto=format",
  ],

  other: [
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=300&auto=format",
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&auto=format",
  ],
};

const dummyImages = Object.values(fillerInspirationImages).flatMap((images) => images);
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

  // console.log("preferred_date == ", new Date(booking.preferred_date));
  // Get inspiration images for this service
  const inspirationForService = booking.references

  return (
    <Card className="w-full overflow-hidden border-base-300 hover:border-primary/20 transition-all duration-300">
      <CardHeader className="bg-primary/5 pb-4">
        <div className="flex gap-3  flex-col justify-between">
          <div className="flex justify-between gap-3">
            <CardTitle className="capitalize text-3xl">{booking.preferred_name}</CardTitle>
            <Button variant="secondary">{timeAgo}</Button>
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
          {dummyImages.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-semibold mb-2">Style Inspiration</h3>
              <div className="flex flex-wrap  gap-2">
                {dummyImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative w-full flex-grow md:w-[300px] max-h-[300px] aspect-square rounded-md overflow-hidden">
                    <Image
                      src={image}
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
