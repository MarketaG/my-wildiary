"use client";

import { createContext, useContext, useState } from "react";

type SidebarContextType = {
  actions: React.ReactNode | null;
  setActions: (actions: React.ReactNode | null) => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [actions, setActions] = useState<React.ReactNode | null>(null);

  return (
    <SidebarContext.Provider value={{ actions, setActions }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("useSidebar must be within SidebarProvider");
  return context;
}
