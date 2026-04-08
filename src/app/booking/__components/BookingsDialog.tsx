"use client";
import { DiaDrawer } from "@/components/shared/DiaDrawer";
import { PenOff, Plus } from "lucide-react";
import { BookingSectionForm } from "./BookingSectionForm";
import { useState } from "react";
import type { LocalBookingRecord } from "@/types/local-booking";
import { ClientOnly } from "@/lib/nextjs/ClientOnly";
import { BookingCancelForm } from "./BookingCancleForm";
import { Button } from "@/components/ui/button";

interface BookingsDialogProps {
  booking?: LocalBookingRecord;
  onSaved?: () => void;
}

export function BookingsDialog({ booking, onSaved }: BookingsDialogProps) {
  const [open, setOpen] = useState(false);
  const title = booking ? "Update Appointment" : "Book an appointment";
  return (
    <ClientOnly
      fallback={
        <Button
          type="button"
          className="rounded-full border border-primary/40 bg-primary/15 px-6 font-sans font-semibold text-primary shadow-none hover:bg-primary/25"
        >
          <Plus className="h-4 w-4" aria-hidden />
          {title}
        </Button>
      }
    >
      <DiaDrawer
        open={open}
        setOpen={setOpen}
        title={title}
        description="schedule your appointment with us"
        trigger={
          <Button
            type="button"
            className="rounded-full border border-primary/40 bg-primary/15 px-6 font-sans font-semibold text-primary shadow-none hover:bg-primary/25"
          >
            <Plus className="h-4 w-4" aria-hidden />
            {title}
          </Button>
        }
      >
        <BookingSectionForm
          key={booking?.id ?? "create"}
          booking={booking}
          setOpen={setOpen}
          onSaved={onSaved}
        />
      </DiaDrawer>
    </ClientOnly>
  );
}
interface DeleteBookingsDialogProps {
  booking?: LocalBookingRecord;
  onDone?: () => void;
}

export function DeleteBookingsDialog({ booking, onDone }: DeleteBookingsDialogProps) {
  const [open, setOpen] = useState(false);
  const title = booking ? "Move Appointment" : "Book an appointment";
  if (!booking) return null;
  return (
    <ClientOnly
      fallback={
        <Button
          type="button"
          variant="outline"
          className="rounded-full border-warning/45 bg-transparent px-6 font-sans font-semibold text-warning shadow-none hover:bg-warning/10 hover:text-warning"
        >
          <PenOff className="h-4 w-4" aria-hidden />
          {title}
        </Button>
      }
    >
      <DiaDrawer
        open={open}
        setOpen={setOpen}
        title={title}
        description="schedule your appointment with us"
        trigger={
          <Button
            type="button"
            variant="outline"
            className="rounded-full border-warning/45 bg-transparent px-6 font-sans font-semibold text-warning shadow-none hover:bg-warning/10 hover:text-warning"
          >
            <PenOff className="h-4 w-4" aria-hidden />
            {title}
          </Button>
        }
      >
        <BookingCancelForm
          bookingId={booking.id}
          onSuccess={() => {
            setOpen(false);
            onDone?.();
          }}
        />
      </DiaDrawer>
    </ClientOnly>
  );
}
