import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UsersResponse } from "@/lib/pb/pb-types";
import { User } from "lucide-react";
import Link from "next/link";

interface CurrentUserProps {
    user?: UsersResponse;
}

export function CurrentUser({user}: CurrentUserProps) {
  // console.log(user);
  if (!user) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <Link href={"/auth"} className="flex gap-2 justify-center items-center">
          login
          <User className="size-" />
        </Link>
      </div>
    );
  }
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Avatar>
        <AvatarImage src={user.avatar} alt={user?.username?.slice(0, 2)} />
        <AvatarFallback>{user?.username?.charAt(0)}</AvatarFallback>
      </Avatar>
    </div>
  );
}
