"use client";

import { UsersResponse, BookingsCreate, BookingsResponse, BookingsUpdate } from "@/lib/pb/pb-types";
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
import { clientPB } from "@/lib/pb/client";
import { Loader } from "lucide-react";
import { makeHotToast } from "@/components/shared/toasters";
import { MultiSelect } from "@/components/ui/multi-select";
import { formatPBDate, getFileURL } from "@/lib/pb/utils";
import { MultiImagePicker } from "@/components/shared/MultiImagePicker";
import { PocketbaseImages } from "@/lib/pb/components/PocketbaseImages";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Define available services based on the BookingsCreate type
const servicesList = [
  "hair",
  "nails",
  "facial",
  "massage",
  "waxing",
  "other",
] as const satisfies readonly ("hair" | "nails" | "facial" | "massage" | "waxing" | "other")[];

// Updated schema to match the new BookingsCreate interface

const bookingFormSchema: z.ZodType<Omit<BookingsUpdate, "id">> = z.object({
  preferred_name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  services: z.array(z.enum(servicesList)),
  preferred_date: z.coerce.string().min(1, { message: "Please select a date and time." }),
  special_requests: z.string().optional(),
  references: z.array(z.any()).optional(),

  // File uploads would need to be handled separately
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

interface BookingSectionFormProps {
  user: UsersResponse;
  booking?: BookingsResponse;
  setOpen?: (open: boolean) => void;
}

export type CurrentImage = {
  name: string;
  action: "keep" | "delete";
};
export function BookingSectionForm({ user, booking,setOpen }: BookingSectionFormProps) {
  // Initialize the form with default values
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      preferred_name: booking?.preferred_name || user?.name || "",
      phone: booking?.phone || "",
      services: booking?.services || [],
      preferred_date: booking?.preferred_date || formatPBDate(new Date()),
      special_requests: booking?.special_requests || "",
      references: (booking?.references as File[] | undefined) || [],
      // "references-":[""]
    },
  });
  const currentImages = booking?.references as string[] | undefined;
  const currSavedImages = currentImages?.map((i) => {
    return { name: i, action: "keep" } as const;
  });
  const [savedImages, setSavedImages] = useState<CurrentImage[] | undefined>(currSavedImages);
  const router = useRouter();
  const { isPending, mutate } = useCustomMutation({
    mutationFn: async ({ variables }: { variables: BookingsCreate }) => {
      return clientPB.from("bookings").create(variables);
    },
    onSuccess(data) {
      makeHotToast({
        title: "Booking Successful",
        description:
          "Your appointment has been booked successfully. Confirmation will be sent to your email.",
        variant: "success",
      });
      form.reset();
      router.refresh();
      setOpen?.(false);
    },
    onError(error) {
      makeHotToast({
        title: "Booking Failed",
        description: error.message,
        variant: "error",
        duration: 10000,
      });
    },
  });
  const { isPending: updateMutationIspending, mutate: updateMutation } = useCustomMutation({
    mutationFn: async ({ variables }: { variables: BookingsUpdate }) => {
      return clientPB.from("bookings").update(variables.id, variables);
    },
    onSuccess(data) {
      makeHotToast({
        title: "Booking Update Successful",
        description:
        "Your appointment has been updated successfully. Confirmation will be sent to your email.",
        variant: "success",
      });
      form.reset();
      router.refresh();
      setOpen?.(false);
    },
    onError(error) {
      console.log("Error updating booking:", error);
      makeHotToast({
        title: "Booking Update Failed",
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
    if (booking?.id) {
      const imagesToBeDeleted = savedImages
        ?.filter((image) => image.action === "delete")
        .map((image) => image.name);
      updateMutation({
        variables: {
          id: booking.id,
          by: user.id,
          preferred_name: data.preferred_name,
          phone: data.phone,
          services: data.services,
          preferred_date: formatPBDate(data.preferred_date),
          special_requests: data.special_requests,
          "references+": data.references,
          // @ts-expect-error : this is supposed to take in an array insted of string
          "references-": imagesToBeDeleted,
        },
      });
    } else {
      mutate({
        variables: {
          by: user.id,
          preferred_name: data.preferred_name,
          phone: data.phone,
          services: data.services,
          preferred_date: formatPBDate(data.preferred_date),
          special_requests: data.special_requests,
          references: data.references,
        },
      });
    }
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
                  options={servicesList.map((service) => ({ label: service, value: service }))}
                  onValueChange={field.onChange}
                  // defaultValue={selectedFrameworks}
                  placeholder="Select frameworks"
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
                  {/* @ts-expect-error:field.value will always be a string  */}
                  <Input
                    type="datetime-local"
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
            name="references-"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-base-content/70">
                    Reference images
                  </FormLabel>
                  <FormControl>
                    <PocketbaseImages
                      imageNames={savedImages}
                      setImageNames={setSavedImages}
                      // setImagesToBeDeleted={setSavedImages}
                      recordId={booking?.id || ""}
                      collectionName="bookings"
                      fieldName="references"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="references"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-base-content/70">
                    New Reference images
                  </FormLabel>
                  <FormControl>
                    <MultiImagePicker
                      images={field.value as File[] | undefined}
                      setImages={field.onChange}
                      accept="image/jpeg,image/png,image/webp,image/gif"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
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
            disabled={isPending || updateMutationIspending}
            className="w-full bg-primary text-base-100 hover:bg-primary-focus">
            Book Appointment{" "}
            {(isPending || updateMutationIspending) && <Loader className="animate-spin ml-2" />}
          </Button>
        </form>
      </Form>
    </div>
  );
}
