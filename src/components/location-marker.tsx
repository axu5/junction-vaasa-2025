import { LocationFeature } from "@/lib/mapbox/utils";
import { Factory, MapPin } from "lucide-react";
import Marker from "./map/map-marker";
import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";
import { SiteType } from "./location-popup";

interface LocationMarkerProps {
  location: SiteType;
  status: "critical" | "maintenance" | "operational" | "safe";
  onHover: (data: SiteType) => void;
}

export function LocationMarker({
  location,
  onHover,
  status,
  children,
}: LocationMarkerProps & PropsWithChildren) {
  const [lng, lat] = location.coordinates;
  return (
    <Marker
      longitude={lng}
      latitude={lat}
      data={location}
      onHover={() => {
        onHover(location);
      }}>
      <div
        className={cn(
          "rounded-full flex items-center justify-center transform transition-all duration-200 text-white shadow-lg size-8 cursor-pointer hover:scale-110",
          {
            "bg-rose-500": status === "critical",
            "bg-yellow-500": status === "maintenance",
            "bg-green-500":
              status === "operational" || status === "safe",
          }
        )}>
        {children ?? <MapPin className='size-5' />}
      </div>
    </Marker>
  );
}
