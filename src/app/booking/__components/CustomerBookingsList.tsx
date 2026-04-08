"use client";

import type { LocalBookingRecord } from "@/types/local-booking";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { customerStatusBadgeClass, customerStatusLabel } from "@/lib/customer-booking-status";
import { BookingsDialog, DeleteBookingsDialog } from "./BookingsDialog";
import { Pencil, PenOff } from "lucide-react";

interface CustomerBookingsListProps {
  bookings: LocalBookingRecord[];
  onSaved: () => void;
}

export function CustomerBookingsList({ bookings, onSaved }: CustomerBookingsListProps) {
  const sorted = [...bookings].sort(
    (a, b) => new Date(a.preferred_date).getTime() - new Date(b.preferred_date).getTime(),
  );

  return (
    <div className="rounded-2xl border border-primary/15 bg-base-200/40 p-1 shadow-inner backdrop-blur-sm">
      <Table>
        <TableHeader>
          <TableRow className="border-primary/10 hover:bg-transparent">
            <TableHead className="font-sans text-[10px] uppercase tracking-wider text-base-content/50">
              Name
            </TableHead>
            <TableHead className="font-sans text-[10px] uppercase tracking-wider text-base-content/50">
              Appointment
            </TableHead>
            <TableHead className="font-sans text-[10px] uppercase tracking-wider text-base-content/50">
              Status
            </TableHead>
            <TableHead className="hidden font-sans text-[10px] uppercase tracking-wider text-base-content/50 md:table-cell">
              Services
            </TableHead>
            <TableHead className="w-[1%] text-right font-sans text-[10px] uppercase tracking-wider text-base-content/50">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map((b) => {
            const when = new Date(b.preferred_date).toLocaleString(undefined, {
              weekday: "short",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            });
            return (
              <TableRow key={b.id} className="border-primary/10 font-sans">
                <TableCell className="max-w-[8rem] truncate font-medium capitalize text-primary sm:max-w-none">
                  {b.preferred_name}
                </TableCell>
                <TableCell className="whitespace-nowrap text-sm text-base-content/90">{when}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      "border px-2 py-0.5 text-[10px] font-medium capitalize",
                      customerStatusBadgeClass(b.status),
                    )}
                  >
                    {customerStatusLabel(b.status)}
                  </Badge>
                </TableCell>
                <TableCell className="hidden max-w-[14rem] truncate text-xs text-base-content/75 md:table-cell">
                  {b.services.join(", ")}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex flex-wrap items-center justify-end gap-1">
                    <BookingsDialog
                      booking={b}
                      onSaved={onSaved}
                      trigger={
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 shrink-0 text-primary hover:bg-primary/10"
                          aria-label="Update appointment"
                        >
                          <Pencil className="h-4 w-4" aria-hidden />
                        </Button>
                      }
                    />
                    <DeleteBookingsDialog
                      booking={b}
                      onDone={onSaved}
                      trigger={
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 shrink-0 text-warning hover:bg-warning/10"
                          aria-label="Reschedule or cancel appointment"
                        >
                          <PenOff className="h-4 w-4" aria-hidden />
                        </Button>
                      }
                    />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
