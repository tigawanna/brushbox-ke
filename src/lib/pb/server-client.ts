import { TypedPocketBase } from "@tigawanna/typed-pocketbase";
import { Schema, UsersResponse } from "./pb-types";
import { cookies } from "next/headers";

export async function serverPBClient() {
  const authCookie = (await cookies()).get("pb_auth");
  if (!process.env.NEXT_PUBLIC_PB_URL) {
    throw new Error("NEXT_PUBLIC_PB_URL environment variable is not set");
  }

  const serverPB = new TypedPocketBase<Schema>(process.env.NEXT_PUBLIC_PB_URL);
  if (!authCookie) {
    return serverPB;
  }
  
  const cookiePayload = authCookie.value
  const cookieString = `pb_auth=${cookiePayload}`;
  serverPB.authStore.loadFromCookie(cookieString,"pb_auth");
  return serverPB;
}

export async function getServerCurrentUser( client?: TypedPocketBase<Schema>){
    const pb = client||await serverPBClient();
    const currentUser = await pb.authStore
    return currentUser.record as UsersResponse
}

