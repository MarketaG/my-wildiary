"use client";

import { useObservations } from "@/contexts/ObservationsContext";

import Link from "next/link";
import ObservationCard from "./ObservationCard";
import { Loader2 } from "lucide-react";

export default function ObservationsSection() {
  const { filteredObservations, isSearching, searchQuery } = useObservations();

  if (isSearching) {
    return (
      <div className="p-8 flex flex-col items-center gap-4">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
        <p className="text-text-muted">Searching...</p>
      </div>
    );
  }

  if (filteredObservations.length === 0) {
    return (
      <div className="p-8 text-center text-text-muted">
        {searchQuery ? (
          <>
            <p className="mb-4">
              No observations found for &quot;{searchQuery}&quot;
            </p>
            <button
              onClick={() => (window.location.href = "/observations")}
              className="text-accent hover:text-accent-hover font-medium"
            >
              Clear search
            </button>
          </>
        ) : (
          <>
            <p className="mb-4">No observations yet.</p>
            <Link
              href="/observations/new"
              className="text-accent flex hover:text-accent-hover font-medium"
            >
              Create your first observation
            </Link>
          </>
        )}
      </div>
    );
  }

  return (
    <div>
      {searchQuery && (
        <div className="mb-4 text-sm text-text-muted">
          Found {filteredObservations.length} result
          {filteredObservations.length !== 1 ? "s" : ""}
        </div>
      )}

      {/* OBSERVATIONS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {filteredObservations.map((observation) => (
          <Link
            key={observation._id}
            href={`/observations/${observation._id}`}
            className="block"
          >
            <ObservationCard observation={observation} />
          </Link>
        ))}
      </div>
    </div>
  );
}
