// components/observations/ObservationActionsDropdown.tsx
"use client";

import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Props = {
  onEdit: () => void;
  onDelete: () => void;
};

export default function ObservationActionsDropdown({
  onEdit,
  onDelete,
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Observation actions"
        className="cursor-pointer
          inline-flex h-9 w-9 items-center justify-center
          rounded-lg
          text-text-subtitle
          hover:bg-background
          hover:text-text-primary
          transition
        "
      >
        <MoreVertical className="h-5 w-5" />
      </button>

      {open && (
        <div
          className="
            absolute right-0 mt-2 w-44
            rounded-xl
            bg-background
            shadow-lg
            z-50
            overflow-hidden
          "
        >
          <button
            onClick={() => {
              onEdit();
              setOpen(false);
            }}
            className="cursor-pointer
            flex w-full items-center gap-2
            px-3 py-2 text-sm
            text-text-subtitle
            hover:bg-blue-50 dark:hover:bg-blue-400/30
            transition
            "
          >
            <Pencil className="h-4 w-4 opacity-80" />
            Edit observation
          </button>

          <button
            onClick={() => {
              onDelete();
              setOpen(false);
            }}
            className="cursor-pointer
              flex w-full items-center gap-2
              px-3 py-2 text-sm
              text-red-600
              hover:bg-red-50
              dark:hover:bg-red-900/20
              transition
            "
          >
            <Trash2 className="h-4 w-4" />
            Delete observation
          </button>
        </div>
      )}
    </div>
  );
}
