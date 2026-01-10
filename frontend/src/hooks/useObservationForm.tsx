"use client";

import { useState, useEffect } from "react";
import { fetchAnimals } from "@/lib/api";
import type { Animal, Observation } from "@/types/observation";

export function useObservationForm(observation?: Observation) {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: observation?.title || "",
    description: observation?.description || "",
    habitat: observation?.habitat || "",
    weather: observation?.weather || "",
    latitude: observation?.latitude || 49.8209,
    longitude: observation?.longitude || 18.2625,
    animalId: observation?.animalId || "",
    imageUrl: observation?.imageUrl || "",
  });

  useEffect(() => {
    fetchAnimals().then(setAnimals);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name.includes("tude") ? parseFloat(value) : value,
    }));
  };

  return { animals, loading, setLoading, formData, setFormData, handleChange };
}
