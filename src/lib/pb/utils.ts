import { Schema } from "./pb-types";


const PB_URL = process.env.NEXT_PUBLIC_PB_URL;

export function formatPBDate(date: string|Date) {
  // Convert the date to a string if it's a Date object
  if (date instanceof Date) {
    return date.toISOString().replace("T", " ");
  }
  return new Date(date).toISOString().replace("T", " ")
}


export type CollectionName = keyof Schema;

export function getFileURL({
  collection_id_or_name,
  file_name,
  record_id,
  fallback = "",
}: {
  collection_id_or_name?: CollectionName;
  record_id?: string;
  file_name?: string;
  fallback?: string;
}) {
  if(!PB_URL) {
    throw new Error("PocketBase URL is not defined");
  }
  if (!collection_id_or_name || !file_name || !record_id) {
    return fallback;
  }
  // http://127.0.0.1:8090/api/files/COLLECTION_ID_OR_NAME/RECORD_ID/FILENAME?thumb=100x300

  return `${PB_URL}/api/files/${collection_id_or_name}/${record_id}/${file_name}`;
}
