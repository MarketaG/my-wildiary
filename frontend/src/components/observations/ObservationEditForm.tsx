"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useObservations } from "@/contexts/ObservationsContext";

import { fetchAnimals, updateObservation } from "@/lib/api";

import { FormField } from "@/components/forms/FormField";
import type { Animal } from "@/types/observation";

type Props = {
  id: string;
};

export default function ObservationEditForm({ id }: Props) {
  const router = useRouter();
  const { observations, refetch } = useObservations();
  const observation = observations.find((o) => o._id === id);

  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState(() => ({
    title: observation?.title || "",
    description: observation?.description || "",
    habitat: observation?.habitat || "",
    weather: observation?.weather || "",
    latitude: observation?.latitude || 49.8209,
    longitude: observation?.longitude || 18.2625,
    animalId: observation?.animalId || "",
    imageUrl: observation?.imageUrl || "",
  }));

  // fetch animals once
  useEffect(() => {
    fetchAnimals().then(setAnimals);
  }, []);

  if (!observation) {
    return (
      <div className="p-8 text-center">
        <p className="text-text-muted mb-4">Observation not found</p>
        <button
          onClick={() => router.push("/observations")}
          className="text-sm text-text-subtitle hover:text-text-primary transition"
        >
          Back to list
        </button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateObservation(id, formData);
      await refetch(); // refresh page
      router.push(`/observations/${id}`);
    } catch (error) {
      console.error("Failed to update:", error);
      alert("Failed to update observation");
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
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-3xl"
      style={
        {
          "--accent": "217 91% 60%",
          "--accent-hover": "217 91% 52%",
        } as React.CSSProperties
      }
    >
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
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/40"
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
          rows={4}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/40"
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
          onClick={() => router.back()}
          className="flex-1 cursor-pointer rounded-lg border border-border px-4 py-2 text-sm
                     hover:bg-text-muted/30 transition"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="flex-1 cursor-pointer rounded-lg px-4 py-2 text-sm font-medium
                     bg-blue-600 text-white
                     hover:bg-blue-700
                     disabled:opacity-50
                     transition"
        >
          {loading ? "Saving…" : "Save changes"}
        </button>
      </div>
    </form>
  );
}
