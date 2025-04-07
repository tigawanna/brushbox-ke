"use client";
import { DiaDrawer } from "@/components/shared/DiaDrawer";
import { PenOff, Plus } from "lucide-react";
import { BookingSectionForm } from "./BookingSectionForm";
import { useState } from "react";
import { BookingsResponse, UsersResponse } from "@/lib/pb/pb-types";
import { ClientOnly } from "@/lib/nextjs/ClientOnly";
import { BookingCancelForm } from "./BookingCancleForm";

interface BookingsDialogProps {
  currentUser: UsersResponse;
  booking?:BookingsResponse
}

export function BookingsDialog({ currentUser,booking }: BookingsDialogProps) {
  const [open, setOpen] = useState(false);
  const title = booking? "Update Appointment" : "Book an appointment";
  return (
    <ClientOnly
      fallback={
        <button className="btn btn-outline z-20 btn-primary flex items-center justify-center gap-2">
          <Plus className="" />
          {title}
        </button>
      }>
      <DiaDrawer
        open={open}
        setOpen={setOpen}
        title="{title"
        description="schedule your appointment with us"
        trigger={
          <button className="btn btn-outline z-10 btn-primary flex items-center justify-center gap-2">
            <Plus className="" />
            {title}
          </button>
        }>
        <BookingSectionForm user={currentUser} booking={booking} setOpen={setOpen} />
      </DiaDrawer>
    </ClientOnly>
  );
}
interface DeleteBookingsDialogProps {
  booking?:BookingsResponse
}

export function DeleteBookingsDialog({ booking }: DeleteBookingsDialogProps) {
  const [open, setOpen] = useState(false);
  const title = booking? "Move Appointment" : "Book an appointment";
  if(!booking) return null;
  return (
    <ClientOnly
      fallback={
        <button className="btn btn-outline border-[1px] z-20 btn-error flex items-center justify-center gap-2">
        <PenOff />
          {title}
        </button>
      }>
      <DiaDrawer
        open={open}
        setOpen={setOpen}
        title={title}
        description="schedule your appointment with us"
        trigger={
          <button className="btn btn-outline border-[1px] z-10 btn-error flex items-center justify-center gap-2">
          <PenOff />
            {title}
          </button>
        }>
        <BookingCancelForm bookingId={booking.id} onSuccess={()=>setOpen(false)} />
      </DiaDrawer>
    </ClientOnly>
  );
}
