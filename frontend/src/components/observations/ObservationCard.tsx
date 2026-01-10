import Image from "next/image";

import type { Observation } from "@/types/observation";
import { timeAgo } from "@/utils/date";

type Props = {
  observation: Observation;
};

export default function ObservationCard({ observation }: Props) {
  const { title, imageUrl, description, createdAt, habitat, animal } =
    observation;

  return (
    <div className="group h-full overflow-hidden rounded-xl bg-background shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      {/* image */}
      {imageUrl && (
        <div className="relative h-32 overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="
              object-cover
              transition-transform duration-300
              group-hover:scale-105
            "
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      )}

      {/* content */}
      <div className="p-3 space-y-2">
        {/* Title */}
        <h3
          className="
            line-clamp-1 text-base font-bold text-text-primary
            transition-colors
            group-hover:text-text-primary
          "
        >
          {title}
        </h3>

        {/* animal */}
        {animal && (
          <p
            className="
              text-sm font-medium text-text-subtitle
              transition-colors
              group-hover:text-text-primary
            "
          >
            {animal.commonName}
          </p>
        )}

        {/* description */}
        <p
          className="
            line-clamp-2 text-xs text-text-subtitle
            transition-colors
            group-hover:text-text-tertiary
          "
        >
          {description}
        </p>

        {/* footer */}
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-text-muted">{timeAgo(createdAt)}</span>

          <span
            className="
              rounded-md bg-muted px-2 py-0.5
              text-text-subtitle
              transition-colors
              group-hover:bg-muted/70
            "
          >
            {habitat}
          </span>
        </div>
      </div>
    </div>
  );
}
