"use client";

import { ResponsiveGenericToolbar } from "@/components/nav/ResponsiveGenericToolbar";
import { useLocalBookings } from "@/hooks/common/use-local-bookings";
import { useCustomMutation } from "@/hooks/use-cutom-mutation";
import { makeHotToast } from "@/components/shared/toasters";
import { updateLocalBooking } from "@/services/bookings/bookings.idb";
import type { LocalBookingRecord, LocalStaffWorkflowStatus } from "@/types/local-booking";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

const staffStatuses: LocalStaffWorkflowStatus[] = ["new", "in_progress", "done"];

function StaffBookingRow({
  row,
  onSaved,
}: {
  row: LocalBookingRecord;
  onSaved: () => void;
}) {
  const [notes, setNotes] = useState(row.staff_notes);
  const [staffStatus, setStaffStatus] = useState<LocalStaffWorkflowStatus>(row.staff_status);

  useEffect(() => {
    setNotes(row.staff_notes);
    setStaffStatus(row.staff_status);
  }, [row.staff_notes, row.staff_status]);

  const { isPending, mutate } = useCustomMutation({
    mutationFn: async ({
      variables,
    }: {
      variables: { id: string; staff_notes: string; staff_status: LocalStaffWorkflowStatus };
    }) => {
      return updateLocalBooking(variables.id, {
        staff_notes: variables.staff_notes,
        staff_status: variables.staff_status,
      });
    },
    onSuccess: () => {
      makeHotToast({ title: "Saved", description: "Staff fields updated.", variant: "success" });
      onSaved();
    },
    onError: (e) => {
      makeHotToast({
        title: "Save failed",
        description: e.message,
        variant: "error",
      });
    },
  });

  const formattedDate = new Date(row.preferred_date).toLocaleString();

  return (
    <TableRow>
      <TableCell className="font-medium align-top">{row.preferred_name}</TableCell>
      <TableCell className="align-top">{row.phone}</TableCell>
      <TableCell className="align-top text-xs whitespace-nowrap">{formattedDate}</TableCell>
      <TableCell className="align-top capitalize text-xs">{row.services.join(", ")}</TableCell>
      <TableCell className="align-top text-xs capitalize">{row.status || "—"}</TableCell>
      <TableCell className="align-top min-w-[200px]">
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="bg-base-200 text-sm"
        />
      </TableCell>
      <TableCell className="align-top">
        <Select
          value={staffStatus}
          onValueChange={(v) => setStaffStatus(v as LocalStaffWorkflowStatus)}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {staffStatuses.map((s) => (
              <SelectItem key={s} value={s}>
                {s.replace("_", " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell className="align-top">
        <Button
          size="sm"
          disabled={isPending}
          onClick={() =>
            mutate({
              variables: {
                id: row.id,
                staff_notes: notes,
                staff_status: staffStatus,
              },
            })
          }
        >
          Save {isPending && <Loader className="animate-spin size-4 ml-1" />}
        </Button>
      </TableCell>
    </TableRow>
  );
}

export function StaffPageClient() {
  const { bookings, loading, refresh } = useLocalBookings();

  if (loading) {
    return (
      <ResponsiveGenericToolbar links={[]}>
        <div className="w-full mt-20 min-h-screen flex items-center justify-center">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      </ResponsiveGenericToolbar>
    );
  }

  return (
    <ResponsiveGenericToolbar links={[]}>
      <div className="w-full max-w-[1400px] mx-auto px-4 py-8 md:py-12 mt-16 md:mt-8">
        <h1 className="text-2xl font-bold text-primary mb-2">Staff</h1>
        <p className="text-base-content/70 mb-6 text-sm">
          Incoming requests and internal notes for each booking.
        </p>
        {bookings.length === 0 ? (
          <p className="text-base-content/60">No bookings yet.</p>
        ) : (
          <div className="rounded-md border border-base-300 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Appointment</TableHead>
                  <TableHead>Services</TableHead>
                  <TableHead>Customer status</TableHead>
                  <TableHead>Staff notes</TableHead>
                  <TableHead>Workflow</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((b) => (
                  <StaffBookingRow key={b.id} row={b} onSaved={refresh} />
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </ResponsiveGenericToolbar>
  );
}
