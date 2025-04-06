"use client";
import { DiaDrawer } from "@/components/shared/DiaDrawer";
import { Plus } from "lucide-react";
import { BookingSectionForm } from "./BookingSectionForm";
import { useState } from "react";
import { UsersResponse } from "@/lib/pb/pb-types";

interface BookingsDialogProps {
  currentUser: UsersResponse;
}

export function BookingsDialog({ currentUser }: BookingsDialogProps) {
  const [open, setOpen] = useState(false);
  return (
    <DiaDrawer
      open={open}
      setOpen={setOpen}
      title="Book an appointment"
      description="schedule your appointment with us"
      trigger={
        <button className="btn btn-outline z-50 btn-sm flex items-center justify-center gap-2">
          <Plus className="" />
          Add new
        </button>
      }>
      <BookingSectionForm user={currentUser} />
    </DiaDrawer>
  );
}
