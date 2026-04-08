"use client";

import type { LocalBookingRecord, LocalStaffWorkflowStatus } from "@/types/local-booking";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

function workflowLabel(s: LocalStaffWorkflowStatus): string {
  if (s === "in_progress") return "In progress";
  if (s === "new") return "New";
  return "Done";
}

function workflowBadgeClass(s: LocalStaffWorkflowStatus): string {
  if (s === "done") return "border-success/40 bg-success/10 text-success";
  if (s === "in_progress") return "border-accent/50 bg-accent/15 text-accent-content";
  return "border-primary/40 bg-primary/10 text-primary";
}

interface StaffBookingsListProps {
  bookings: LocalBookingRecord[];
}

export function StaffBookingsList({ bookings }: StaffBookingsListProps) {
  const router = useRouter();
  const sorted = [...bookings].sort(
    (a, b) => new Date(a.preferred_date).getTime() - new Date(b.preferred_date).getTime(),
  );

  return (
    <div className="rounded-2xl border border-primary/15 bg-base-200/40 p-1 shadow-inner backdrop-blur-sm">
      <Table>
        <TableHeader>
          <TableRow className="border-primary/10 hover:bg-transparent">
            <TableHead className="font-sans text-[10px] uppercase tracking-wider text-base-content/50">
              Client
            </TableHead>
            <TableHead className="font-sans text-[10px] uppercase tracking-wider text-base-content/50">
              Appointment
            </TableHead>
            <TableHead className="font-sans text-[10px] uppercase tracking-wider text-base-content/50">
              Workflow
            </TableHead>
            <TableHead className="hidden font-sans text-[10px] uppercase tracking-wider text-base-content/50 sm:table-cell">
              Services
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
              <TableRow
                key={b.id}
                className={cn(
                  "cursor-pointer border-primary/10 font-sans transition-colors hover:bg-base-100/30",
                )}
                onClick={() => router.push(`/staff/bookings/${b.id}`)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    router.push(`/staff/bookings/${b.id}`);
                  }
                }}
                tabIndex={0}
                role="link"
              >
                <TableCell className="font-medium capitalize text-primary">{b.preferred_name}</TableCell>
                <TableCell className="text-sm text-base-content/90">{when}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      "border px-2 py-0.5 text-[10px] font-medium capitalize",
                      workflowBadgeClass(b.staff_status),
                    )}
                  >
                    {workflowLabel(b.staff_status)}
                  </Badge>
                </TableCell>
                <TableCell className="hidden max-w-[12rem] truncate text-xs text-base-content/75 sm:table-cell">
                  {b.services.join(", ")}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
