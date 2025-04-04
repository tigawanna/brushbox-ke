import { User } from "lucide-react";
import Link from "next/link";

interface CurrentUserProps {}

export function CurrentUser({}: CurrentUserProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Link href={"/auth"} className="flex gap-2 justify-center items-center">
        login
        <User className="size-" />
      </Link>
    </div>
  );
}
