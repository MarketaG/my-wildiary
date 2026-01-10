"use client";

import { ThemeProvider } from "@/components/ThemeProvider";
import { ObservationsProvider } from "@/contexts/ObservationsContext";
import { SidebarProvider } from "@/contexts/SidebarContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ObservationsProvider>
        <SidebarProvider>{children}</SidebarProvider>
      </ObservationsProvider>
    </ThemeProvider>
  );
}
