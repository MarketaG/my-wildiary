export async function fetchObservations() {
  const res = await fetch("http://localhost:4000/api/observations");
  if (!res.ok) throw new Error("Failed to fetch observations");
  return res.json();
}

export async function createObservation(data: any) {
  const res = await fetch("http://localhost:4000/api/observations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create observation");
  return res.json();
}

export async function deleteObservation(id: string) {
  const res = await fetch(`http://localhost:4000/api/observations/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete observation");
  return;
}
