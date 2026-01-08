import type { Observation } from "@/types/observation";
import ObservationCard from "./ObservationCard";
import { PlusIcon } from "lucide-react";

type Props = {
  observations: Observation[];
  onDelete: (id: string) => void;
  onAdd: () => void;
};

export default function ObservationsGrid({
  observations,
  onDelete,
  onAdd,
}: Props) {
  if (observations.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-2">No observations yet</h3>
        <button
          onClick={onAdd}
          className="bg-green-600 text-white px-6 py-3 rounded-lg inline-flex items-center gap-2"
        >
          <PlusIcon className="w-4 h-4" />
          Add first observation
        </button>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {observations.map((obs) => (
        <ObservationCard key={obs._id} observation={obs} onDelete={onDelete} />
      ))}
    </div>
  );
}
