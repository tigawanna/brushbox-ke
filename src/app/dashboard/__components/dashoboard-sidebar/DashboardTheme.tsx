import { Hexagon } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { ViewTransitionSelect } from "@/components/themes/ViewTransitionSelect";
import { AllDaisyUiThemes } from "@/components/themes/AllDaisyUiThemes";
import { ThemeToggle } from "@/components/themes/ThemeToggle";
import { ClientOnly } from "@/lib/nextjs/ClientOnly";
import { useEffect } from "react";

interface DashboardThemeProps {}

export function DashboardTheme({}: DashboardThemeProps) {
  const { state } = useSidebar();
    useEffect(() => {
      document.documentElement.dataset.style = "vertical";
    }, []);
  return (
    <div className="flex flex-wrap w-full items-center justify-between gap-4 px-2">
      <div className="flex w-full items-center justify-between gap-4">
        {process.env.NODE_ENV === "development" && state === "expanded" && (
          <ViewTransitionSelect compact={state !== "expanded"} />
        )}
        <ClientOnly fallback={<Hexagon className="animate-spin"/>}>
        <ThemeToggle compact={state !== "expanded"}/>
        </ClientOnly>
      </div>
      <AllDaisyUiThemes compact={state !== "expanded"} />
    </div>
  );
}
