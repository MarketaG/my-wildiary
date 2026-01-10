"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";

export function ResizeHandler() {
  const map = useMap();

  useEffect(() => {
    const timer = setTimeout(() => map.invalidateSize(), 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // an empty dependency array is correct (we only want it after mount)

  return null;
}
