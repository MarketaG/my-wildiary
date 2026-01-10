"use client";

import { useObservations } from "@/contexts/ObservationsContext";

import { PawPrint, Pin, ClipboardList } from "lucide-react";

export default function StatsBar() {
  const { observations } = useObservations();

  const stats = {
    totalObservations: observations.length,
    uniqueSpecies: new Set(observations.map((o) => o.animalId)).size,
    uniqueLocations: new Set(observations.map((o) => o.habitat)).size,
  };

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-background backdrop-blur-sm rounded-2xl shadow-lg px-6 py-3">
      <div className="flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-lg">
            <ClipboardList className="w-5 h-5" />
          </span>
          <span className="font-semibold">{stats.totalObservations}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg">
            <PawPrint className="w-5 h-5" />
          </span>
          <span className="font-semibold">{stats.uniqueSpecies}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg">
            <Pin className="w-5 h-5" />
          </span>
          <span className="font-semibold">{stats.uniqueLocations}</span>
        </div>
      </div>
    </div>
  );
}
