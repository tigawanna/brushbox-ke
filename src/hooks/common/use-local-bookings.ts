"use client";

import { useCallback, useEffect, useState } from "react";
import { listLocalBookings } from "@/services/bookings/bookings.idb";
import type { LocalBookingRecord } from "@/types/local-booking";

export function useLocalBookings() {
  const [bookings, setBookings] = useState<LocalBookingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const list = await listLocalBookings();
      setBookings(list);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { bookings, loading, error, refresh };
}
