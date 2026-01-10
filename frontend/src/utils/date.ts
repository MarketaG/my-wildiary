import { formatDistance } from "date-fns";
import { cs } from "date-fns/locale";

export function timeAgo(createdAt: string): string {
  return createdAt
    ? formatDistance(new Date(createdAt), new Date(), {
        addSuffix: true,
        locale: cs,
      })
    : "recently";
}
