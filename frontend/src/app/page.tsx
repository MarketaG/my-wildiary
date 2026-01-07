"use client";

import { useEffect, useState } from "react";
import {
  fetchObservations,
  createObservation,
  deleteObservation,
} from "@/lib/api";

export default function Home() {
  const [observations, setObservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // loading data when the page starts
  useEffect(() => {
    fetchObservations()
      .then(setObservations)
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = async () => {
    await createObservation({
      species: "Sparrow",
      count: 3,
      location: "Park",
    });
    // add > update list
    const updated = await fetchObservations();
    setObservations(updated);
  };

  const handleDelete = async (id: string) => {
    await deleteObservation(id);
    // instant status update
    setObservations(observations.filter((obs) => obs._id !== id));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Widiary Observations</h1>
      <button
        onClick={handleAdd}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Add Observation
      </button>
      <ul>
        {observations.map((obs) => (
          <li key={obs._id} className="mb-2">
            {obs.species} – {obs.count} – {obs.location}
            <button
              onClick={() => handleDelete(obs._id)}
              className="ml-2 text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
