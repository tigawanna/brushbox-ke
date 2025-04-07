"use client";
import { DiaDrawer } from "@/components/shared/DiaDrawer";
import { Plus } from "lucide-react";
import { BookingSectionForm } from "./BookingSectionForm";
import { useState } from "react";
import { BookingsResponse, UsersResponse } from "@/lib/pb/pb-types";
import { ClientOnly } from "@/lib/nextjs/ClientOnly";

interface BookingsDialogProps {
  currentUser: UsersResponse;
  booking?:BookingsResponse
}

export function BookingsDialog({ currentUser,booking }: BookingsDialogProps) {
  const [open, setOpen] = useState(false);
  return (
    <ClientOnly
      fallback={
        <button className="btn btn-outline z-20 btn-primary flex items-center justify-center gap-2">
          <Plus className="" />
          Book an appointment
        </button>
      }>
      <DiaDrawer
        open={open}
        setOpen={setOpen}
        title="Book an appointment"
        description="schedule your appointment with us"
        trigger={
          <button className="btn btn-outline z-10 btn-primary flex items-center justify-center gap-2">
            <Plus className="" />
            Book an appointment
          </button>
        }>
        <BookingSectionForm user={currentUser} booking={booking} />
      </DiaDrawer>
    </ClientOnly>
  );
}
