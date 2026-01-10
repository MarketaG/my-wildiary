"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { fetchObservations, searchObservations } from "@/lib/api";
import type { Observation } from "@/types/observation";

type ObservationsContextType = {
  observations: Observation[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredObservations: Observation[];
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  isSearching: boolean;
  selectedCoords: [number, number] | null;
  setSelectedCoords: (coords: [number, number] | null) => void;
};

const ObservationsContext = createContext<ObservationsContextType | undefined>(
  undefined
);

export function ObservationsProvider({ children }: { children: ReactNode }) {
  const [observations, setObservations] = useState<Observation[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filteredObservations, setFilteredObservations] = useState<
    Observation[]
  >([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCoords, setSelectedCoords] = useState<[number, number] | null>(
    null
  );

  // load all observations on mount
  useEffect(() => {
    fetchObservations().then(setObservations);
  }, []);

  // debounced search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredObservations(observations);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    const timer = setTimeout(async () => {
      try {
        const results = await searchObservations(searchQuery);
        setFilteredObservations(results);
      } catch (error) {
        console.error("Search failed:", error);
        // fallback to client-side filter
        const clientFiltered = observations.filter(
          (obs) =>
            obs.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            obs.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredObservations(clientFiltered);
      } finally {
        setIsSearching(false);
      }
    }, 500); // debounce

    return () => clearTimeout(timer);
  }, [searchQuery, observations]);

  return (
    <ObservationsContext.Provider
      value={{
        observations,
        searchQuery,
        setSearchQuery,
        filteredObservations,
        selectedId,
        setSelectedId,
        isSearching,
        selectedCoords,
        setSelectedCoords,
      }}
    >
      {children}
    </ObservationsContext.Provider>
  );
}

export function useObservations() {
  const context = useContext(ObservationsContext);
  if (!context) {
    throw new Error("useObservations must be used within ObservationsProvider");
  }
  return context;
}
