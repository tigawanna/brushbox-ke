"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UsersResponse } from "@/lib/pb/pb-types";
import { CreditCard, Gift, Loader, User, Users } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTransition } from "react";
import { logoutUser } from "@/lib/pb/client";
import { usePathname, useRouter } from "next/navigation";
import { useCustomMutation } from "@/hooks/use-cutom-mutation";
import { Icons } from "../icons/icons";

interface CurrentUserProps {
  user?: UsersResponse;
}

export function BookAppointment({ user }: CurrentUserProps) {
if (!user) {
    const authUrl = `/auth?returnTo=/customer`;
    return (
      <Link
        href={authUrl}
        className="flex gap-2 z-20 btn btn-primary btn-outline justify-center items-center">
        <Icons.scissors className="size-6" />
        Proceed to booking
    
      </Link>
    );
  }
  return (
    <Link
      href={"/customer"}
      className="flex gap-2 z-20 btn btn-primary btn-outline justify-center items-center">
      <Icons.scissors className="size-7" />
      Proceed to booking

    </Link>
  );
}
export function CurrentUser({ user }: CurrentUserProps) {
  // console.log(user);
  if (!user) {
    return (
      <Link href={"/auth"} className="flex gap-2 btn btn-primary justify-center items-center">
        login
        <User className="size-" />
      </Link>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full border border-primary data-[state=open]:border-none outline-none">
        <Avatar>
          <AvatarImage src={user.avatar} alt={user?.name?.slice(0, 2)} />
          <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit border-primary text-primary">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        {/* <DropdownMenuSeparator className="border-primary bg-primary" /> */}
        <DropdownMenuGroup className="flex gap-5 p-2">
          <Avatar>
            <AvatarImage src={user.avatar} alt={user?.name?.slice(0, 2)} />
            <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium">{user?.name}</span>
            <span className="text-xs text-muted-foreground">{user?.email}</span>
          </div>
        </DropdownMenuGroup>
        {/* <DropdownMenuSeparator className="border-primary bg-primary" /> */}

        {/* <DropdownMenuItem>
        </DropdownMenuItem> */}
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function LogoutButton() {
  const { isPending, mutate } = useCustomMutation({
    mutationFn: async () => {
      const res = await logoutUser();
      return res;
    },
  });
  const router = useRouter();
  return (
    <button
      disabled={isPending}
      onClick={() => {
        mutate()
          .then(() => {
            router.refresh();
          })
          .catch((err) => {
            console.error(err);
          });
      }}
      className="btn btn-wide btn-accent btn-outline ">
      Logout {isPending && <Loader className="animate-spin" />}
    </button>
  );
}
