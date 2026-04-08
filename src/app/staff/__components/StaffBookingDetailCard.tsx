"use client";

import { useEffect } from "react";
import { useForm, useFormState } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCustomMutation } from "@/hooks/use-cutom-mutation";
import { makeHotToast } from "@/components/shared/toasters";
import { updateLocalBooking } from "@/services/bookings/bookings.idb";
import type { LocalBookingRecord, LocalStaffWorkflowStatus } from "@/types/local-booking";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Calendar,
  ClipboardPen,
  GitBranch,
  Loader,
  Phone,
  Sparkles,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  staffBookingFormSchema,
  type StaffBookingFormValues,
} from "./staff-booking-form-schema";

const staffStatuses: LocalStaffWorkflowStatus[] = ["new", "in_progress", "done"];

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

function customerStatusDisplay(row: LocalBookingRecord): string {
  if (row.status === "canceled") return "Canceled";
  if (row.status === "rescheduled") return "Rescheduled";
  return "Active";
}

interface StaffBookingDetailCardProps {
  row: LocalBookingRecord;
  onSaved: () => void;
}

export function StaffBookingDetailCard({ row, onSaved }: StaffBookingDetailCardProps) {
  const form = useForm<StaffBookingFormValues>({
    resolver: zodResolver(staffBookingFormSchema),
    defaultValues: {
      staff_notes: row.staff_notes,
      staff_status: row.staff_status,
    },
  });

  const { isDirty } = useFormState({ control: form.control });

  useEffect(() => {
    form.reset({
      staff_notes: row.staff_notes,
      staff_status: row.staff_status,
    });
  }, [row.id, row.staff_notes, row.staff_status, form]);

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

  const formattedDate = new Date(row.preferred_date).toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <Card
      className={cn(
        "overflow-hidden border-primary/20 bg-base-200/35 shadow-[0_0_0_1px_rgba(212,175,55,0.08),0_24px_48px_-24px_rgba(0,0,0,0.6)]",
        "backdrop-blur-md transition-shadow duration-300 hover:shadow-[0_0_0_1px_rgba(212,175,55,0.15),0_28px_56px_-20px_rgba(212,175,55,0.12)]",
      )}
    >
      <CardHeader className="gap-4 border-b border-primary/10 pb-5 pt-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/15 ring-1 ring-primary/25">
              <User className="h-5 w-5 text-primary" strokeWidth={1.75} />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-semibold tracking-tight text-primary md:text-3xl">
                {row.preferred_name}
              </h2>
              <p className="mt-1 font-sans text-xs uppercase tracking-[0.2em] text-base-content/45">
                Booking
              </p>
            </div>
          </div>
          <Badge
            variant="outline"
            className={cn(
              "shrink-0 border px-3 py-1 font-sans text-xs font-medium capitalize",
              workflowBadgeClass(row.staff_status),
            )}
          >
            {workflowLabel(row.staff_status)}
          </Badge>
        </div>

        <div className="grid gap-3 font-sans sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-lg border border-base-300/60 bg-base-100/40 px-3 py-2.5">
            <Phone className="h-4 w-4 shrink-0 text-primary/80" strokeWidth={1.75} />
            <div>
              <p className="text-[10px] uppercase tracking-wider text-base-content/45">Phone</p>
              <p className="text-sm font-medium text-base-content">{row.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-base-300/60 bg-base-100/40 px-3 py-2.5">
            <Calendar className="h-4 w-4 shrink-0 text-primary/80" strokeWidth={1.75} />
            <div>
              <p className="text-[10px] uppercase tracking-wider text-base-content/45">
                Appointment
              </p>
              <p className="text-sm font-medium text-base-content">{formattedDate}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="font-sans text-[10px] uppercase tracking-wider text-base-content/45">
            Services
          </span>
          {row.services.map((s) => (
            <Badge
              key={s}
              variant="outline"
              className="border-primary/30 bg-primary/5 font-sans text-xs font-normal capitalize text-primary"
            >
              <Sparkles className="mr-1 h-3 w-3 opacity-70" />
              {s}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="font-sans text-[10px] uppercase tracking-wider text-base-content/45">
            Customer status
          </span>
          <Badge
            variant="outline"
            className="border-base-content/20 font-sans text-xs capitalize text-base-content/90"
          >
            {customerStatusDisplay(row)}
          </Badge>
        </div>
      </CardHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) =>
            mutate({
              variables: {
                id: row.id,
                staff_notes: values.staff_notes,
                staff_status: values.staff_status,
              },
            }),
          )}
        >
          <CardContent className="space-y-4 pt-6">
            <div className="h-px w-full gold-gradient opacity-40" aria-hidden />
            <FormField
              control={form.control}
              name="staff_notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 font-sans text-xs font-medium text-base-content/80">
                    <ClipboardPen className="h-4 w-4 text-primary/90" strokeWidth={1.75} />
                    Staff notes
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder="Internal notes for this appointment…"
                      className="resize-none border-primary/20 bg-base-100/50 font-sans text-sm leading-relaxed text-base-content placeholder:text-base-content/35 focus-visible:border-primary/45 focus-visible:ring-primary/20"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="staff_status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 font-sans text-xs font-medium text-base-content/80">
                    <GitBranch className="h-4 w-4 text-primary/90" strokeWidth={1.75} />
                    Workflow
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full max-w-xs border-primary/25 bg-base-100/50 font-sans focus:ring-primary/25">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {staffStatuses.map((s) => (
                        <SelectItem key={s} value={s} className="font-sans capitalize">
                          {workflowLabel(s)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="flex flex-col gap-3 border-t border-primary/10 bg-base-100/20 px-6 py-5 sm:flex-row sm:justify-end">
            <Button
              type="submit"
              disabled={isPending || !isDirty}
              className="w-full rounded-full bg-primary px-8 font-sans font-semibold text-primary-content shadow-[0_4px_24px_-4px_rgba(212,175,55,0.45)] transition hover:bg-primary/90 hover:shadow-[0_6px_28px_-4px_rgba(212,175,55,0.55)] enabled:hover:bg-primary/90 disabled:opacity-40 sm:w-auto"
            >
              {isPending ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Saving
                </>
              ) : (
                "Save changes"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
