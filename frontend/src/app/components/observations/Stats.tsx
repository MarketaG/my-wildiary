import type { Observation } from "@/types/observation";
import { List, Squirrel, PinIcon } from "lucide-react";

type Props = {
  observations: Observation[];
};

export default function Stats({ observations }: Props) {
  return (
    <div className="grid md:grid-cols-3 gap-4 mb-8 text-gray-800">
      <Stat
        icon={<List />}
        label="Total observations"
        value={observations.length}
      />
      <Stat
        icon={<Squirrel />}
        label="Various types"
        value={new Set(observations.map((o) => o.animalId)).size}
      />
      <Stat
        icon={<PinIcon />}
        label="Locations"
        value={new Set(observations.map((o) => o.habitat)).size}
      />
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6 flex items-center">
      <div className="bg-gray-100 rounded-lg p-3">{icon}</div>
      <div className="ml-4">
        <p className="text-sm">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}
