"use client";

import { useTheme } from "@/components/ThemeProvider";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="hidden cursor-pointer sm:inline-flex items-center rounded-md px-2 py-1 text-text-muted hover:bg-accent/10 hover:text-text-tertiary transition"
      title="Toggle theme"
    >
      {theme === "dark" ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
  );
}
