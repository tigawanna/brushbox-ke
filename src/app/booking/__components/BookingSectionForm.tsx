"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCustomMutation } from "@/hooks/use-cutom-mutation";
import { Loader, X } from "lucide-react";
import { makeHotToast } from "@/components/shared/toasters";
import { MultiSelect } from "@/components/ui/multi-select";
import { formatStoredBookingDate } from "@/lib/format-stored-booking-date";
import { MultiImagePicker } from "@/components/shared/MultiImagePicker";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import type { LocalBookingRecord } from "@/types/local-booking";
import {
  createLocalBooking,
  fileToDataUrl,
  updateLocalBooking,
} from "@/services/bookings/bookings.idb";
import { BookingDateTimeField } from "./BookingDateTimeField";
import {
  datetimeLocalFromStoredBooking,
  getNextAvailableSlot,
  isBookingDateTimeAllowed,
  parseDatetimeLocalInput,
  toDatetimeLocalInput,
} from "@/data/salon-hours";

const servicesList = [
  "hair",
  "nails",
  "facial",
  "massage",
  "waxing",
  "other",
] as const;

const bookingFormSchema = z.object({
  preferred_name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  services: z.array(z.enum(servicesList)),
  preferred_date: z
    .string()
    .min(1, { message: "Please select a date and time." })
    .refine((s) => isBookingDateTimeAllowed(parseDatetimeLocalInput(s)), {
      message: "Choose an available time during opening hours.",
    }),
  special_requests: z.string().optional(),
  references: z.array(z.instanceof(File)).optional(),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

interface BookingSectionFormProps {
  booking?: LocalBookingRecord;
  setOpen?: (open: boolean) => void;
  onSaved?: () => void;
}

export type ExistingReferenceSlot = {
  index: number;
  dataUrl: string;
  action: "keep" | "delete";
};

export function BookingSectionForm({ booking, setOpen, onSaved }: BookingSectionFormProps) {
  const initialSlots: ExistingReferenceSlot[] =
    booking?.reference_image_data_urls.map((dataUrl, index) => ({
      index,
      dataUrl,
      action: "keep" as const,
    })) ?? [];
  const [referenceSlots, setReferenceSlots] = useState<ExistingReferenceSlot[]>(initialSlots);

  useEffect(() => {
    setReferenceSlots(
      booking?.reference_image_data_urls.map((dataUrl, index) => ({
        index,
        dataUrl,
        action: "keep" as const,
      })) ?? [],
    );
  }, [booking?.id, booking?.reference_image_data_urls]);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      preferred_name: booking?.preferred_name ?? "",
      phone: booking?.phone ?? "",
      services: booking?.services ?? [],
      preferred_date: booking?.preferred_date
        ? datetimeLocalFromStoredBooking(booking.preferred_date)
        : toDatetimeLocalInput(getNextAvailableSlot()),
      special_requests: booking?.special_requests ?? "",
      references: [],
    },
  });

  const { isPending, mutate } = useCustomMutation({
    mutationFn: async ({ variables: values }: { variables: BookingFormValues }) => {
      const newUrls = await Promise.all((values.references ?? []).map((f) => fileToDataUrl(f)));
      const keptExisting = referenceSlots
        .filter((s) => s.action === "keep")
        .map((s) => s.dataUrl);
      const reference_image_data_urls = [...keptExisting, ...newUrls];
      const base = {
        preferred_name: values.preferred_name,
        phone: values.phone,
        services: values.services,
        preferred_date: formatStoredBookingDate(values.preferred_date),
        special_requests: values.special_requests ?? "",
        reference_image_data_urls,
        status: "" as const,
        staff_notes: booking?.staff_notes ?? "",
        staff_status: booking?.staff_status ?? "new",
      };
      if (booking?.id) {
        return updateLocalBooking(booking.id, base);
      }
      return createLocalBooking(base);
    },
    onSuccess() {
      makeHotToast({
        title: "Booking saved",
        description: "Your appointment details have been saved.",
        variant: "success",
      });
      form.reset({
        preferred_name: "",
        phone: "",
        services: [],
        preferred_date: toDatetimeLocalInput(getNextAvailableSlot()),
        special_requests: "",
        references: [],
      });
      setReferenceSlots([]);
      setOpen?.(false);
      onSaved?.();
    },
    onError(error) {
      makeHotToast({
        title: "Could not save booking",
        description: error.message,
        variant: "error",
        duration: 10000,
      });
    },
  });

  function onSubmit(data: BookingFormValues): void {
    if (!data.preferred_date) {
      throw new Error("Please select a date and time.");
    }
    mutate({ variables: data });
  }

  function toggleReferenceSlot(i: number): void {
    setReferenceSlots((prev) =>
      prev.map((slot) =>
        slot.index === i
          ? { ...slot, action: slot.action === "keep" ? "delete" : "keep" }
          : slot,
      ),
    );
  }

  return (
    <div className="p-2 h-full max-h-[80vh] overflow-auto rounded-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="preferred_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-base-content/70">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your name"
                      className="bg-base-200 border-primary/30 focus:border-primary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-base-content/70">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your phone number"
                      className="bg-base-200 border-primary/30 focus:border-primary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="services"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-base-content/70">
                  Service Requested
                </FormLabel>
                <MultiSelect
                  key={(booking?.id ?? "new") + field.value.join(",")}
                  options={servicesList.map((service) => ({ label: service, value: service }))}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  placeholder="Select services"
                  className="border-primary/50"
                  variant="outline"
                  animation={2}
                  maxCount={3}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="preferred_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-base-content/70">
                  Preferred Date & Time
                </FormLabel>
                <FormControl>
                  <BookingDateTimeField value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {referenceSlots.length > 0 ? (
            <div className="space-y-2">
              <p className="text-sm font-medium text-base-content/70">Reference images</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
                {referenceSlots.map((slot) => {
                  const isMarked = slot.action === "delete";
                  return (
                    <motion.div
                      key={slot.index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{
                        opacity: isMarked ? 0.5 : 1,
                        scale: isMarked ? 0.95 : 1,
                      }}
                      className="relative group aspect-square"
                    >
                      <button
                        type="button"
                        onClick={() => toggleReferenceSlot(slot.index)}
                        className="absolute top-1 right-1 z-10 btn btn-circle btn-xs btn-error opacity-80"
                        aria-label={isMarked ? "Restore image" : "Remove image"}
                      >
                        <X className="size-3" />
                      </button>
                      <img
                        src={slot.dataUrl}
                        alt=""
                        className="w-full h-full object-cover rounded-md border border-base-300"
                      />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ) : null}

          <FormField
            control={form.control}
            name="references"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-base-content/70">
                  New reference images
                </FormLabel>
                <FormControl>
                  <MultiImagePicker
                    images={field.value}
                    setImages={field.onChange}
                    accept="image/jpeg,image/png,image/webp,image/gif"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="special_requests"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-base-content/70">
                  Special Requests
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any special requests or questions?"
                    className="bg-base-200 border-primary/30 focus:border-primary resize-none"
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-primary text-base-100 hover:bg-primary-focus"
          >
            Book Appointment {isPending && <Loader className="animate-spin ml-2" />}
          </Button>
        </form>
      </Form>
    </div>
  );
}
