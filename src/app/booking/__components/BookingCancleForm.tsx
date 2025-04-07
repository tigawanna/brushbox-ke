import { useState } from "react";
import { motion } from "motion/react";
import { clientPB } from "@/lib/pb/client";
import { unbookAppointment } from "@/data/api/bookings";
import { useCustomMutation } from "@/hooks/use-cutom-mutation";
import { makeHotToast } from "@/components/shared/toasters";
import { ChevronRight, Loader, Trash,History, Save, CheckCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { formatPBDate } from "@/lib/pb/utils";

interface BookingCancelFormProps {
  bookingId: string;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export function BookingCancelForm({ bookingId, onSuccess }: BookingCancelFormProps) {
  const pb = clientPB;
  const [action, setAction] = useState<"cancel" | "reschedule" | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState<string>(new Date().toISOString());
  const isRescheduleDatGraeterThanRightNow = rescheduleDate
    ? new Date(rescheduleDate) > new Date()
    : false;

  const { mutate, isPending } = useCustomMutation({
    mutationFn: async ({
      variables,
    }: {
      variables: { action: "cancel" | "reschedule"; rescheduleTo?: string };
    }) => {
      return await unbookAppointment(pb, bookingId, variables.action, variables.rescheduleTo);
    },
    onSuccess: () => {
      makeHotToast({
        title: "Success",
        description: "Your booking has been successfully updated.",
        variant: "success",
      });
      onSuccess?.();
      setAction(null);
    },
    onError: (error) => {
      makeHotToast({
        title: "Error",
        description: "There was an error updating your booking.",
        variant: "error",
      });
      console.log("Error:", error);
    },
  });
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card w-full max-w-md bg-base-100 shadow-xl p-2">
      {!action ? (
        <div className="flex flex gap-3 justify-evenly">
          <button
            onClick={() => setAction("cancel")}
            className="btn btn-error text-error bg-error/10  border-[1px]"
            disabled={isPending}>
            Cancel Booking
            <Trash className="" />
          </button>
          <button
            onClick={() => setAction("reschedule")}
            className="btn btn-info bg-info/30  border-[1px]"
            disabled={isPending}>
            Reschedule Booking <History />
          </button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col gap-4">
          <p className="text-sm">
            {action === "cancel"
              ? "Are you sure you want to cancel this booking?"
              : "Are you sure you want to reschedule this booking?"}
          </p>
          <div className="flex flex-wrap gap-3 justify-between">
            {action === "reschedule" ? (
              <div className="flex flex-wrap justify-between gap-6 w-full">
                <Input
                  type="datetime-local"
                  className="bg-base-200 border-primary/30 focus:border-primary"
                  value={rescheduleDate}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                />
                {isRescheduleDatGraeterThanRightNow && (
                  <button
                    onClick={() => {
                      mutate({
                        variables: { action, rescheduleTo: formatPBDate(rescheduleDate) },
                      });
                    }}
                    className={`btn btn-warning border-[1px] btn-outline `}
                    disabled={isPending}>
                    {`Confirm ${action}`}
                    <Save />
                    {isPending && <Loader className="animate-spin" />}
                  </button>
                )}
                <button
                  onClick={() => setAction(null)}
                  className="btn btn-info btn-outline border-[1px]"
                  disabled={isPending}>
                  Back <ChevronRight />
                </button>
              </div>
            ) : (
              <div className="flex flex-wrap justify-between gap-6 w-full">
                <button
                  onClick={() => {
                    mutate({
                      variables: { action },
                    });
                  }}
                  className={`btn btn-warning btn-outline border-[1px]`}
                  disabled={isPending}>
                  {`Confirm ${action}`}
                  <CheckCheck />
                  {isPending && <Loader className="animate-spin" />}
                </button>
                <button
                  onClick={() => setAction(null)}
                  className="btn btn-info btn-outline border-[1px]"
                  disabled={isPending}>
                  Back <ChevronRight />
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

