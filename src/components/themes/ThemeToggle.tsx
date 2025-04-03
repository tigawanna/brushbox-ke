"use client";
import { Moon, Sun } from "lucide-react";
import { ViewTransitionSelect } from "./ViewTransitionSelect";
import { useState } from "react";
import { getDocumentCookie, setDocumentCookie } from "@/utils/document-cookie";

interface ThemeToggleProps {
  compact?: boolean;
}

const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

const themeNames = {
  light: "cupcake",
  dark: "forest",
} as const;
type ThemeNames = (typeof themeNames)[keyof typeof themeNames];

function updatedThemeCookie(theme: ThemeNames) {
  if (typeof window !== "undefined") {
  setDocumentCookie("theme", theme, THEME_COOKIE_MAX_AGE);
  }
}



export function ThemeToggle({ compact }: ThemeToggleProps) {
  const [theme, setTheme] = useState<ThemeNames>(getDocumentCookie("theme") as any || themeNames.light);
  function transitionColors() {
    if (typeof window !== "undefined") {
      try {
        document.startViewTransition(() => {
          const newTheme = theme === themeNames.light ? themeNames.dark : themeNames.light;
          document.documentElement.dataset.theme = newTheme;
          setTheme(newTheme);
          updatedThemeCookie(newTheme);
        });
      } catch (error) {
        const newTheme = theme === themeNames.light ? themeNames.dark : themeNames.light;
        document.documentElement.dataset.theme = newTheme;
        setTheme(newTheme);
        updatedThemeCookie(newTheme);
      }
    }
  }

  return (
    <div data-test="theme-toggle" className="flex   items-center justify-between gap-5 ">
      <ViewTransitionSelect compact={compact} />
      <button onClick={() => transitionColors()} data-test="theme-toggle-button" className="">
        {theme === themeNames.light ? <Moon /> : <Sun />}
      </button>
    </div>
  );
}
