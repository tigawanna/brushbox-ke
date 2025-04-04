import {TypedPocketBase} from "@tigawanna/typed-pocketbase";
import { Schema } from "./pb-types";

if (!process.env.NEXT_PUBLIC_PB_URL) {
  throw new Error("NEXT_PUBLIC_PB_URL environment variable is not set");
}

export const clientPB = new TypedPocketBase<Schema>(process.env.NEXT_PUBLIC_PB_URL);


export async function logoutUser() {
  return await new Promise((resolve) => {
    setTimeout(() => {
      clientPB.authStore.clear();
      document.cookie = `pb_auth=; path=/; max-age=0; SameSite=None; Secure`;
      resolve(true);
    }, 3000);
  });
}

