import { TypedPocketBase } from "@tigawanna/typed-pocketbase";
import { Schema } from "./pb-types";
import { cookies } from "next/headers";

export async function serverPBClient() {
  const authCookie = (await cookies()).get("pb_auth");
  if (!process.env.NEXT_PUBLIC_PB_URL) {
    throw new Error("NEXT_PUBLIC_PB_URL environment variable is not set");
  }
  const serverPB = new TypedPocketBase<Schema>(process.env.NEXT_PUBLIC_PB_URL);
  serverPB.authStore.loadFromCookie(authCookie?.value || "");
  return serverPB;
}
