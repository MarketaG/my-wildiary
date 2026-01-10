"use client";

import { useEffect } from "react";
import { useObservations } from "../../contexts/ObservationsContext";
import { useAppRouting } from "@/hooks/useAppRouting";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

function MapResizeHandler() {
  const map = useMap();
  const { pageType } = useAppRouting();

  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 300);
    return () => clearTimeout(timer);
  }, [map, pageType]);

  return null;
}

function MapZoomHandler() {
  const map = useMap();
  const { selectedId, observations } = useObservations();

  useEffect(() => {
    if (selectedId) {
      const selected = observations.find((o) => o._id === selectedId);
      if (selected)
        map.setView([selected.latitude, selected.longitude], 10, {
          animate: true,
        });
    }
  }, [selectedId, observations, map]);

  return null;
}

function MapClickHandler() {
  const { pageType } = useAppRouting();
  const { setSelectedCoords } = useObservations();

  useMapEvents({
    click(e) {
      if (pageType === "observation-new") {
        setSelectedCoords([e.latlng.lat, e.latlng.lng]);
      }
    },
  });

  return null;
}

export default function MapComponent() {
  const { observations, selectedId, selectedCoords } = useObservations();
  const center: [number, number] = [49.8175, 15.473];

  const greenIcon = L.icon({
    iconUrl: "/leaf-green.png",
    shadowUrl: "/leaf-shadow.png",
    iconSize: [38, 95],
    shadowSize: [50, 64],
    iconAnchor: [22, 94],
    shadowAnchor: [4, 62],
    popupAnchor: [-3, -76],
  });

  const visibleObservations = selectedId
    ? observations.filter((o) => o._id === selectedId)
    : observations;

  return (
    <div className="absolute inset-0 z-0">
      <MapContainer center={center} zoom={8} className="h-full w-full">
        <MapResizeHandler />
        <MapZoomHandler />
        <MapClickHandler />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {visibleObservations.map((o) => (
          <Marker
            key={o._id}
            position={[o.latitude, o.longitude]}
            icon={greenIcon}
          >
            <Popup>
              <div style={{ maxWidth: 200, lineHeight: 1.4 }}>
                <h3 style={{ fontSize: 16, marginBottom: 4, fontWeight: 600 }}>
                  {o.title}
                </h3>
                <p style={{ fontSize: 14, margin: "0 0 6px 0", color: "#666" }}>
                  {o.animal?.commonName}
                </p>
                {o.description && (
                  <p style={{ fontSize: 13, margin: 0 }}>
                    {o.description.length > 120
                      ? o.description.slice(0, 120) + "…"
                      : o.description}
                  </p>
                )}
                <p className="pt-2">
                  <Link href={`/observations/${o._id}`}>
                    <span className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-accent font-medium hover:bg-accent/10 hover:text-accent-hover transition">
                      View Details
                      <ArrowRightIcon className="w-3 h-3" />
                    </span>
                  </Link>
                </p>
              </div>
            </Popup>
          </Marker>
        ))}

        {selectedCoords && (
          <Marker position={selectedCoords} icon={greenIcon}>
            <Popup>
              <div style={{ fontSize: 13 }}>
                <strong>New observation location</strong>
                <p style={{ margin: "4px 0 0 0" }}>
                  {selectedCoords[0].toFixed(4)}, {selectedCoords[1].toFixed(4)}
                </p>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
