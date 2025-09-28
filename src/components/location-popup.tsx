import { ReactNode } from "react";
import Popup from "./map/map-popup";

export type SiteType = {
  id: string;
  type: "Powerplant" | "Substation" | "Transformer" | "Junction";
  status: "critical" | "maintenance" | "operational" | "safe";
  coordinates: [number, number];
  icon: ReactNode;
};

type LocationPopupProps = {
  location: SiteType;
  onClose?: () => void;
};
export function LocationPopup({
  location,
  onClose,
}: LocationPopupProps) {
  if (!location) return null;

  const [lng, lat] = location.coordinates;
  const name = location.type;
  const brand = location.type;

  return (
    <Popup
      latitude={lat}
      longitude={lng}
      onClose={onClose}
      offset={15}
      closeButton={false}
      closeOnClick={false}
      focusAfterOpen={false}>
      <div className='w-[300px] sm:w-[350px]'>
        <div className='flex items-start gap-3'>
          <div className='flex-1 min-w-0'>
            <div className='flex items-center justify-between gap-1'>
              <h3 className='font-medium text-base truncate'>
                {name}
              </h3>
            </div>
            {brand && brand !== name && (
              <p className='text-sm font-medium text-muted-foreground'>
                {brand}
              </p>
            )}
          </div>
        </div>

        <div className='mt-3 pt-2 border-t text-xs text-muted-foreground'>
          <div className='flex justify-between items-center'>
            <span className='truncate max-w-[170px]'>
              ID: {location.id}...
            </span>
            <span className='text-right'>
              {lat.toFixed(4)}, {lng.toFixed(4)}
            </span>
          </div>
        </div>
      </div>
    </Popup>
  );
}
