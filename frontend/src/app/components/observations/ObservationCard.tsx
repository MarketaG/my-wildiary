import Image from "next/image";
import { formatDistance } from "date-fns";
import { cs } from "date-fns/locale";
import type { Observation } from "@/types/observation";

type Props = {
  observation: Observation;
  onDelete: (id: string) => void;
};

export default function ObservationCard({ observation, onDelete }: Props) {
  const timeAgo = formatDistance(new Date(observation.createdAt), new Date(), {
    addSuffix: true,
    locale: cs,
  });

  // Status color based on conservation
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Endangered":
        return "bg-red-100 text-red-800";
      case "Vulnerable":
        return "bg-orange-100 text-orange-800";
      case "Least Concern":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Diet emoji
  const getDietEmoji = (diet: string) => {
    switch (diet) {
      case "herbivore":
        return "🌿";
      case "carnivore":
        return "🥩";
      case "omnivore":
        return "🍎";
      default:
        return "🍽️";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      {/* Image */}
      {observation.imageUrl && (
        <div className="relative h-48 bg-gray-200 overflow-hidden">
          <Image
            src={observation.imageUrl}
            alt={observation.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {observation.title}
        </h3>

        {/* Animal Info */}
        {observation.animal && (
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg font-semibold text-green-700">
                {observation.animal.commonName}
              </span>
              <span className="text-sm text-gray-500">
                {getDietEmoji(observation.animal.diet)}
              </span>
            </div>
            <p className="text-sm text-gray-600 italic">
              {observation.animal.species}
            </p>
            <span
              className={`inline-block text-xs px-2 py-1 rounded-full mt-1 ${getStatusColor(
                observation.animal.conservationStatus
              )}`}
            >
              {observation.animal.conservationStatus}
            </span>
          </div>
        )}

        {/* Description */}
        <p className="text-gray-700 text-sm mb-4 line-clamp-3">
          {observation.description}
        </p>

        {/* Meta info */}
        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <span>🏞️</span>
            <span className="truncate">{observation.habitat}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🌤️</span>
            <span className="truncate">{observation.weather}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>📍</span>
            <span>
              {observation.latitude.toFixed(4)},{" "}
              {observation.longitude.toFixed(4)}
            </span>
          </div>
          {observation.user && (
            <div className="flex items-center gap-2">
              <span>👤</span>
              <span>{observation.user.name}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t">
          <span className="text-xs text-gray-500">{timeAgo.toString()}</span>
          <button
            onClick={() => onDelete(observation._id)}
            className="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            Smazat
          </button>
        </div>
      </div>
    </div>
  );
}
