import { Animal, Observation } from "@/types/observation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

// Observations
export async function fetchObservations(): Promise<Observation[]> {
  const res = await fetch(`${API_URL}/api/observations`);
  if (!res.ok) throw new Error("Failed to fetch observations");
  return res.json();
}

export async function fetchObservation(id: string): Promise<Observation> {
  const res = await fetch(`${API_URL}/api/observations/${id}`);
  if (!res.ok) throw new Error("Failed to fetch observation");
  return res.json();
}

export async function createObservation(data: Partial<Observation>) {
  const res = await fetch(`${API_URL}/api/observations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create observation");
  return res.json();
}

export async function deleteObservation(id: string) {
  const res = await fetch(`${API_URL}/api/observations/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete observation");
}

// Animals
export async function fetchAnimals(): Promise<Animal[]> {
  const res = await fetch(`${API_URL}/api/animals`);
  if (!res.ok) throw new Error("Failed to fetch animals");
  return res.json();
}
