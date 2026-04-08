"use client";
import Link from "next/link";
import { Icons } from "../icons/icons";

export function BookAppointment() {
  return (
    <Link
      href="/booking"
      className="flex gap-2 z-20 btn btn-primary  justify-center items-center"
    >
      <Icons.scissors className="size-7" />
      Book and appointment
    </Link>
  );
}

export function CurrentUser() {
  return (
    <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
      <span
        className="text-[10px] font-semibold uppercase tracking-[0.18em] text-warning/90 border border-warning/35 rounded-full px-2.5 py-1 bg-warning/5"
        title="Bookings and staff tools run in your browser for this demo."
      >
        Local demo
      </span>
      <Link
        href="/staff"
        className="text-sm font-medium text-primary hover:text-accent underline-offset-4 hover:underline"
      >
        Preview staff
      </Link>
    </div>
  );
}
