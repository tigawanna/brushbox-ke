import type { LocalBookingRecord } from "@/types/local-booking";

const DB_NAME = "brushbox-bookings";
const DB_VERSION = 1;
const STORE = "bookings";

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onerror = () => {
      reject(req.error ?? new Error("IndexedDB open failed"));
    };
    req.onsuccess = () => {
      resolve(req.result);
    };
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: "id" });
      }
    };
  });
}

function txDone(tx: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error ?? new Error("Transaction failed"));
    tx.onabort = () => reject(tx.error ?? new Error("Transaction aborted"));
  });
}

export async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = () => {
      reject(reader.error ?? new Error("File read failed"));
    };
    reader.readAsDataURL(file);
  });
}

export async function listLocalBookings(): Promise<LocalBookingRecord[]> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const store = tx.objectStore(STORE);
    const req = store.getAll();
    req.onerror = () => reject(req.error ?? new Error("getAll failed"));
    req.onsuccess = () => {
      const rows = (req.result as LocalBookingRecord[]) ?? [];
      rows.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
      resolve(rows);
    };
  });
}

export async function getLatestLocalBooking(): Promise<LocalBookingRecord | undefined> {
  const all = await listLocalBookings();
  return all[0];
}

export async function getLocalBookingById(id: string): Promise<LocalBookingRecord | undefined> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const store = tx.objectStore(STORE);
    const req = store.get(id);
    req.onerror = () => reject(req.error ?? new Error("get failed"));
    req.onsuccess = () => resolve(req.result as LocalBookingRecord | undefined);
  });
}

type CreateLocalBookingInput = Omit<LocalBookingRecord, "id" | "created" | "updated">;

export async function createLocalBooking(input: CreateLocalBookingInput): Promise<LocalBookingRecord> {
  const now = new Date().toISOString();
  const record: LocalBookingRecord = {
    ...input,
    id: crypto.randomUUID(),
    created: now,
    updated: now,
  };
  const db = await openDb();
  const tx = db.transaction(STORE, "readwrite");
  tx.objectStore(STORE).put(record);
  await txDone(tx);
  return record;
}

export async function updateLocalBooking(
  id: string,
  patch: Partial<Omit<LocalBookingRecord, "id" | "created">>,
): Promise<LocalBookingRecord> {
  const existing = await getLocalBookingById(id);
  if (!existing) {
    throw new Error("Booking not found");
  }
  const now = new Date().toISOString();
  const next: LocalBookingRecord = {
    ...existing,
    ...patch,
    id: existing.id,
    created: existing.created,
    updated: now,
  };
  const db = await openDb();
  const tx = db.transaction(STORE, "readwrite");
  tx.objectStore(STORE).put(next);
  await txDone(tx);
  return next;
}

export async function deleteLocalBooking(id: string): Promise<void> {
  const db = await openDb();
  const tx = db.transaction(STORE, "readwrite");
  tx.objectStore(STORE).delete(id);
  await txDone(tx);
}
