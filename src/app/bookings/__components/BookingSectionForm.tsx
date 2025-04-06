"use client"

import { BookingsResponse, UsersResponse, BookingsCreate } from "@/lib/pb/pb-types";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const servicesList = [
  "hair",
  "nails",
  "facial",
  "massage",
  "waxing",
  "other",
] as const satisfies readonly BookingsCreate["service"][];

const bookingFormSchema: z.ZodType<BookingsCreate> = z.object({
  preferred_name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  service: z.enum(servicesList, { required_error: "Please select a service." }),
  preferred_date: z.coerce.string().min(1, { message: "Please select a date and time." }),
  special_requests: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

interface BookingSectionFormProps {
  user: UsersResponse;
}

export function BookingSectionForm({ user }: BookingSectionFormProps) {
  // Initialize the form with default values
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      preferred_name: user?.name || "",
      phone: "",
      service: "",
      preferred_date: "",
      special_requests: "",
    },
  });

  // Handle form submission
  function onSubmit(data: BookingFormValues) {
    console.log(data);
    // Here you would typically send the data to your Pocketbase backend
  }

  return (
    <div className="p-2 h-full  rounded-lg ">
      {/* <h3 className="text-2xl font-serif font-semibold mb-6">Request an Appointment</h3> */}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="preferred_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-base-content/70">Full Name</FormLabel>
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
                  <FormLabel className="text-sm font-medium text-base-content/70">Phone Number</FormLabel>
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
            name="service"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-base-content/70">Service Requested</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-base-200 border-primary/30 focus:border-primary">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="hair">Hair Styling</SelectItem>
                    <SelectItem value="nails">Nail Care</SelectItem>
                    <SelectItem value="facial">Facial Treatment</SelectItem>
                    <SelectItem value="massage">Massage Therapy</SelectItem>
                    <SelectItem value="waxing">Waxing</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="preferred_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-base-content/70">Preferred Date & Time</FormLabel>
                <FormControl>
                  {/* @ts-expect-error it's fine i know what am doing*/}
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
            name="special_requests"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-base-content/70">Special Requests</FormLabel>
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
            className="w-full bg-primary text-base-100 hover:bg-primary-focus"
          >
            Book Appointment
          </Button>
        </form>
      </Form>
    </div>
  );
}
