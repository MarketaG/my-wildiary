"use client";

import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-foreground animate-pulse flex items-center justify-center">
      <div className="text-gray-400 flex items-center gap-2">
        <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
        Loading map...
      </div>
    </div>
  ),
});

export default function Map() {
  return <MapComponent />;
}
