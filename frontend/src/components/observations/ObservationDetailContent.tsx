"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useObservations } from "@/contexts/ObservationsContext";
import { useSidebar } from "@/contexts/SidebarContext";

import { deleteObservation } from "@/lib/api";
import ObservationDetailSection from "./ObservationDetailSection";
import ObservationActionsDropdown from "./ObservationActionsDropdown";

type Props = {
  id: string;
};

export default function ObservationDetailContent({ id }: Props) {
  const router = useRouter();
  const { observations, setSelectedId, refetch } = useObservations();
  const { setActions } = useSidebar();
  const observation = observations.find((o) => o._id === id);

  // set selected ID for map
  useEffect(() => {
    setSelectedId(id);
    return () => setSelectedId(null);
  }, [id, setSelectedId]);

  // handlers
  const handleEdit = useCallback(() => {
    router.push(`/observations/${id}/edit`);
  }, [router, id]);

  const handleDelete = useCallback(async () => {
    if (!confirm("Are you sure you want to delete this observation?")) return;

    try {
      await deleteObservation(id);
      refetch();
      router.push("/observations");
    } catch (error) {
      console.error("Failed to delete:", error);
      alert("Failed to delete observation");
    }
  }, [id, refetch, router]);

  // set actions in the sidebar header
  useEffect(() => {
    setActions(
      <ObservationActionsDropdown onEdit={handleEdit} onDelete={handleDelete} />
    );

    // cleanup when unmounting
    return () => setActions(null);
  }, [handleEdit, handleDelete, setActions]);

  if (!observation) {
    return (
      <div className="p-4 text-center">
        <p className="mb-4 text-text-subtitle">Observation not found</p>
        <button
          onClick={() => router.push("/observations")}
          className="text-accent hover:text-accent-hover"
        >
          Back to list
        </button>
      </div>
    );
  }

  return <ObservationDetailSection observation={observation} />;
}
