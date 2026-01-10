import Image from "next/image";
import { timeAgo } from "@/utils/date";
import type { Observation } from "@/types/observation";

type Props = {
  observation: Observation;
};

export default function ObservationDetailSection({ observation }: Props) {
  return (
    <div className="space-y-8">
      {/* dominant image header */}
      {observation.imageUrl && (
        <div className="relative aspect-video overflow-hidden rounded-xl">
          <Image
            src={observation.imageUrl}
            alt={observation.title}
            fill
            className="object-cover"
          />

          {/* gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

          {/* header content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h1 className="text-2xl font-bold leading-tight">
              {observation.title}
            </h1>

            {observation.animal && (
              <p className="mt-1 text-lg font-medium opacity-90">
                {observation.animal.commonName}
                <span className="ml-2 text-sm italic opacity-75">
                  {observation.animal.species}
                </span>
              </p>
            )}

            {/* meta inline */}
            <div className="mt-3 flex items-center gap-2 text-sm text-white/80">
              <span>{timeAgo(observation.createdAt)}</span>
              <span aria-hidden>•</span>
              <span className="truncate">{observation.habitat}</span>
            </div>
          </div>
        </div>
      )}

      {/* description */}
      <div className="max-w-3xl space-y-2">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-text-muted">
          Description
        </h3>
        <p className="leading-relaxed text-text-subtitle">
          {observation.description}
        </p>
      </div>

      {/* info */}
      <div className="max-w-3xl grid grid-cols-2 gap-4 rounded-xl text-sm">
        <div>
          <span className="text-text-muted">Weather</span>
          <p className="font-medium">{observation.weather}</p>
        </div>

        <div>
          <span className="text-text-muted">Location</span>
          <p className="font-medium text-xs">
            {observation.latitude?.toFixed(4)},{" "}
            {observation.longitude?.toFixed(4)}
          </p>
        </div>

        {observation.user && (
          <div className="col-span-2">
            <span className="text-text-muted">Observer</span>
            <p className="font-medium">{observation.user.name}</p>
          </div>
        )}
      </div>
    </div>
  );
}
