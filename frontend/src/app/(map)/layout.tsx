"use client";

import { useAppRouting } from "@/hooks/useAppRouting";
import Sidebar from "@/components/layout/Sidebar";
import Map from "@/components/map/Map";

export default function MapLayout({ children }: { children: React.ReactNode }) {
  const { showSidebar } = useAppRouting();

  return (
    <div className="h-full w-full p-4 md:p-8 layout-pattern">
      <div
        className="relative flex h-full w-full rounded-2xl overflow-hidden bg-background"
        style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}
      >
        {showSidebar && <Sidebar>{children}</Sidebar>}
        <div className="relative flex-1">
          <Map />
        </div>
      </div>
    </div>
  );
}
