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
    <div className="flex items-center gap-2">
      <Link
        href="/staff"
        className="text-sm font-medium text-primary hover:text-accent underline-offset-4 hover:underline"
      >
        Staff
      </Link>
    </div>
  );
}
