"use client";

import { useEffect, useState } from "react";
import { fetchObservations, deleteObservation } from "@/lib/api";
import type { Observation } from "@/types/observation";

import Header from "../Header";
import Stats from "./Stats";
import ObservationsGrid from "./ObservationsGrid";
import AddObservationModal from "../AddObservationModal";

export default function ObservationSection() {
  const [observations, setObservations] = useState<Observation[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadObservations = async () => {
    try {
      const data = await fetchObservations();
      setObservations(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadObservations();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this observation?")) return;

    await deleteObservation(id);
    setObservations((prev) => prev.filter((o) => o._id !== id));
  };

  const handleObservationAdded = () => {
    setIsModalOpen(false);
    loadObservations();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-blue-50">
      <Header onAdd={() => setIsModalOpen(true)} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Stats observations={observations} />

        <ObservationsGrid
          observations={observations}
          onDelete={handleDelete}
          onAdd={() => setIsModalOpen(true)}
        />
      </main>

      {isModalOpen && (
        <AddObservationModal
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleObservationAdded}
        />
      )}
    </div>
  );
}
