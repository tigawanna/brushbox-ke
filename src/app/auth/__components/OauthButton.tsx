"use client";
import { clientPB } from "@/lib/pb/client";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";

import { useTransition } from "react";
import { FaGoogle } from "react-icons/fa";

interface OauthButtonProps {
  returnTo: string;
}

export function OauthButton({ returnTo }: OauthButtonProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const signInuser = async () => {
    await clientPB
      .from("users")
      .authWithOAuth2({
        provider: "google",
      })
      .then((res) => {
        if (res) {
          document.cookie = `pb_auth=${JSON.stringify(res)}; path=/; max-age=31536000; SameSite=None; Secure`;
        }
        router.push(returnTo);
      });
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-5">
      <button
        disabled={pending}
        className="btn btn-wide btn-accent btn-outline w-full h-12"
        onClick={() => startTransition(() => signInuser())}>
        <FaGoogle className="size-7" />
        Sign in with Google
        {pending && <Loader className="animate-spin size-7" />}
      </button>
    </div>
  );
}
