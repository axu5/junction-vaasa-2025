"use client";

import MapControls from "@/components/map/map-controls";
import MapProvider from "@/lib/mapbox/provider";
import { Factory, Zap } from "lucide-react";
import { useRef, useState } from "react";
import { LocationMarker } from "./location-marker";
import { LocationPopup, SiteType } from "./location-popup";

export function Map() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className='w-screen h-screen'>
      <div
        id='map-container'
        ref={mapContainerRef}
        className='absolute inset-0 h-full w-full'
      />

      <MapProvider
        mapContainerRef={mapContainerRef}
        initialViewState={{
          longitude: 21.605864464089656,
          latitude: 63.09132710757758,
          zoom: 10,
        }}>
        <MapMarkers />
        <MapControls />
      </MapProvider>
    </div>
  );
}

const assets = [
  {
    id: "JC185D",
    status: "operational",
    type: "Powerplant",
    coordinates: [21.55433892982509, 63.091932730557964],
    icon: <Factory className='stroke-[2.5px] size-4.5' />,
  },
  {
    id: "JC186D",
    status: "critical",
    type: "Substation",
    coordinates: [21.647036073530735, 63.1020303021584],
    icon: <Zap className='stroke-[2.5px] size-4.5' />,
  },
  {
    id: "JC187D",
    status: "maintenance",
    type: "Substation",
    coordinates: [21.695101258348863, 63.085717096934026],
    icon: <Zap className='stroke-[2.5px] size-4.5' />,
  },
  {
    id: "JC188D",
    status: "safe",
    type: "Powerplant",
    coordinates: [21.602573097623928, 63.10133256493498],
    icon: <Factory className='stroke-[2.5px] size-4.5' />,
  },
] as SiteType[];

export default function MapMarkers() {
  const [selectedLocation, setSelectedLocation] =
    useState<SiteType | null>(null);

  return (
    <>
      {assets.map(site => (
        <LocationMarker
          key={site.id}
          status={site.status}
          location={site}
          onHover={data => setSelectedLocation(data)}>
          {site.icon}
        </LocationMarker>
      ))}

      {selectedLocation && (
        <LocationPopup
          location={selectedLocation}
          onClose={() => setSelectedLocation(null)}
        />
      )}
    </>
  );
}
