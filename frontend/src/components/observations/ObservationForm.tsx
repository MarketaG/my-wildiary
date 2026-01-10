"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useObservations } from "@/contexts/ObservationsContext";

import { createObservation, fetchAnimals } from "@/lib/api";

import { FormField } from "@/components/forms/FormField";
import type { Animal } from "@/types/observation";
import { MapPin } from "lucide-react";

export default function ObservationForm() {
  const router = useRouter();
  const { selectedCoords, setSelectedCoords, refetch } = useObservations();
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    habitat: "",
    weather: "",
    latitude: 49.8209,
    longitude: 18.2625,
    animalId: "",
    imageUrl: "",
  });

  // fetch animals
  useEffect(() => {
    fetchAnimals().then(setAnimals);
  }, []);

  // sync coordinates from map
  useEffect(() => {
    if (selectedCoords) {
      setFormData((prev) => ({
        ...prev,
        latitude: selectedCoords[0],
        longitude: selectedCoords[1],
      }));
    }
  }, [selectedCoords]);

  // cleanup on unmount
  useEffect(() => {
    return () => setSelectedCoords(null);
  }, [setSelectedCoords]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await createObservation({
        ...formData,
        userId: "000000000000000000000001", // first user > demo
      });
      setSelectedCoords(null);
      refetch();
      router.push(`/observations/${result.insertedId}`);
    } catch (error) {
      console.error("Error creating observation:", error);
      alert("Failed to create observation");
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      {/* title */}
      <FormField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      {/* animal */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-text-muted">Species *</label>
        <select
          name="animalId"
          value={formData.animalId}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
        >
          <option value="">Select species…</option>
          {animals.map((animal) => (
            <option key={animal._id} value={animal._id}>
              {animal.commonName} ({animal.species})
            </option>
          ))}
        </select>
      </div>

      {/* description */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-text-muted">
          Description *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={2}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
        />
      </div>

      {/* habitat / weather */}
      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Habitat"
          name="habitat"
          value={formData.habitat}
          onChange={handleChange}
          required
        />

        <FormField
          label="Weather"
          name="weather"
          value={formData.weather}
          onChange={handleChange}
          required
        />
      </div>

      {/* GPS */}
      <div className="space-y-1">
        <label className="flex items-center gap-2 text-sm font-medium text-text-muted">
          <MapPin className="w-4 h-4 text-accent" />
          Location (click on map to select) *
        </label>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Latitude"
            name="latitude"
            type="number"
            value={formData.latitude}
            onChange={handleChange}
            step="0.0001"
            required
          />

          <FormField
            label="Longitude"
            name="longitude"
            type="number"
            value={formData.longitude}
            onChange={handleChange}
            step="0.0001"
            required
          />
        </div>

        <p className="text-xs text-text-muted">
          Click anywhere on the map to set coordinates
        </p>
      </div>

      {/* image URL */}
      <FormField
        label="Image URL"
        name="imageUrl"
        type="url"
        value={formData.imageUrl}
        onChange={handleChange}
        placeholder="https://images.unsplash.com/..."
        helpText="Only links from unsplash.com are supported."
      />

      {/* buttons */}
      <div className="flex gap-3 pt-6">
        <button
          type="button"
          onClick={() => {
            setSelectedCoords(null);
            router.push("/observations");
          }}
          className="flex-1 cursor-pointer rounded-lg border border-border px-4 py-2 text-sm hover:bg-text-muted/30 transition"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="flex-1 cursor-pointer rounded-lg px-4 py-2 text-sm font-medium bg-accent text-white hover:bg-accent-hover disabled:opacity-50 transition"
        >
          {loading ? "Creating…" : "Create observation"}
        </button>
      </div>
    </form>
  );
}
