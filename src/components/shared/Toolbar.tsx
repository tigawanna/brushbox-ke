import Link from "next/link";
import { ThemeToggle } from "../themes/ThemeToggle";
import { MdOutlineDashboard } from "react-icons/md";
import { ClientOnly } from "@/lib/nextjs/ClientOnly";
import { Hexagon } from "lucide-react";


interface ToolbarProps {}

export function Toolbar({}: ToolbarProps) {
  return (
    <div className="w-full bg-base-200 p-2 flex  items-center justify-between">
      <Link href={"/"} className="hover:text-primary">
        <MdOutlineDashboard className="size-6" />
      </Link>
      <ClientOnly fallback={<Hexagon className="animate-spin" />}>
        <ThemeToggle />
      </ClientOnly>
    </div>
  );
}
