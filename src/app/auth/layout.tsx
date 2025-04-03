import { Toolbar } from "@/components/shared/Toolbar";

interface layoutProps {
  children: React.ReactNode;
}

export default function layout({ children }: layoutProps) {
  return (
    <div className="w-full h-full flex flex-col items-center ">
      {children}
    </div>
  );
}
