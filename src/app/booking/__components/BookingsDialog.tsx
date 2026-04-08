"use client";
import { DiaDrawer } from "@/components/shared/DiaDrawer";
import { PenOff, Plus } from "lucide-react";
import { BookingSectionForm } from "./BookingSectionForm";
import { useState } from "react";
import type { LocalBookingRecord } from "@/types/local-booking";
import { ClientOnly } from "@/lib/nextjs/ClientOnly";
import { BookingCancelForm } from "./BookingCancleForm";

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
        <button
          type="button"
          className="btn z-20 btn-primary shadow-md shadow-primary/15 flex items-center justify-center gap-2 min-w-[12rem]"
        >
          <Plus className="h-4 w-4" aria-hidden />
          {title}
        </button>
      }
    >
      <DiaDrawer
        open={open}
        setOpen={setOpen}
        title={title}
        description="schedule your appointment with us"
        trigger={
          <button
            type="button"
            className="btn z-10 btn-primary shadow-md shadow-primary/15 flex items-center justify-center gap-2 min-w-[12rem]"
          >
            <Plus className="h-4 w-4" aria-hidden />
            {title}
          </button>
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
        <button
          type="button"
          className="btn z-20 btn-outline border-warning/45 text-warning hover:bg-warning/10 hover:border-warning/60 flex items-center justify-center gap-2"
        >
          <PenOff className="h-4 w-4" aria-hidden />
          {title}
        </button>
      }
    >
      <DiaDrawer
        open={open}
        setOpen={setOpen}
        title={title}
        description="schedule your appointment with us"
        trigger={
          <button
            type="button"
            className="btn z-10 btn-outline border-warning/45 text-warning hover:bg-warning/10 hover:border-warning/60 flex items-center justify-center gap-2"
          >
            <PenOff className="h-4 w-4" aria-hidden />
            {title}
          </button>
        }
      >
        <BookingCancelForm bookingId={booking.id} onSuccess={() => {
          setOpen(false);
          onDone?.();
        }} />
      </DiaDrawer>
    </ClientOnly>
  );
}
