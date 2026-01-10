"use client";

import { useAppRouting } from "@/hooks/useAppRouting";
import { useSidebar } from "@/contexts/SidebarContext";
import { useRouter } from "next/navigation";

import { ChevronLeft } from "lucide-react";

type SidebarProps = {
  children?: React.ReactNode;
};

export default function Sidebar({ children }: SidebarProps) {
  const router = useRouter();
  const { getSidebarWidth, getSidebarTitle, isForm, isDetail } =
    useAppRouting();
  const { actions } = useSidebar();

  // sidebar title according to page type
  const shouldShowBack = isDetail || isForm;
  const hasHeaderControls = shouldShowBack || actions;

  return (
    <aside
      className={`h-full bg-foreground flex flex-col transition-all duration-300 ${getSidebarWidth()}`}
    >
      {/* header */}
      <div className="relative flex items-center justify-between p-6 min-h-21">
        {/* back button */}
        {shouldShowBack ? (
          <button
            onClick={() => router.back()}
            className="cursor-pointer group flex items-center gap-1 text-sm text-text-subtitle hover:text-text-primary transition"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="hidden sm:inline opacity-80 group-hover:opacity-100">
              Back
            </span>
          </button>
        ) : hasHeaderControls ? (
          <div className="min-w-9" />
        ) : null}

        {/* title */}
        {hasHeaderControls ? (
          <h2 className="absolute left-1/2 -translate-x-1/2 text-lg font-bold truncate pointer-events-none">
            {getSidebarTitle()}
          </h2>
        ) : (
          <h2 className="text-lg font-bold truncate">{getSidebarTitle()}</h2>
        )}

        {/* right actions / close */}
        {hasHeaderControls && (
          <div className="flex items-center min-w-9 justify-end">
            {actions && actions}
          </div>
        )}
      </div>

      {/* content */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">{children}</div>
    </aside>
  );
}
