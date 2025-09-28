import {
  Coffee,
  Utensils,
  ShoppingBag,
  Hotel,
  Dumbbell,
  Landmark,
  Store,
  Banknote,
  GraduationCap,
  Shirt,
  Stethoscope,
  Home,
  Factory,
  Zap,
  PlugZap,
} from "lucide-react";

export const iconMap: { [key: string]: React.ReactNode } = {
  powerplant: <Factory className='size-5 stroke-[2.5px]' />,
  substation: <Zap className='size-5 stroke-[2.5px]' />,
  transformer: <PlugZap className='size-5 stroke-[2.5px]' />,
  junction: <Landmark className='size-5 stroke-[2.5px]' />,
};

export type LocationSuggestion = {
  mapbox_id: string;
  name: string;
  place_formatted: string;
  maki?: string;
};

export type LocationFeature = {
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
  properties: {
    name: string;
    name_preferred?: string;
    mapbox_id: string;
    feature_type: string;
    address?: string;
    full_address?: string;
    place_formatted?: string;
    context: {
      country?: {
        name: string;
        country_code: string;
        country_code_alpha_3: string;
      };
      region?: {
        name: string;
        region_code: string;
        region_code_full: string;
      };
      postcode?: { name: string };
      district?: { name: string };
      place?: { name: string };
      locality?: { name: string };
      neighborhood?: { name: string };
      address?: {
        name: string;
        address_number?: string;
        street_name?: string;
      };
      street?: { name: string };
    };
    coordinates: {
      latitude: number;
      longitude: number;
      accuracy?: string;
      routable_points?: {
        name: string;
        latitude: number;
        longitude: number;
        note?: string;
      }[];
    };
    language?: string;
    maki?: string;
    poi_category?: string[];
    poi_category_ids?: string[];
    brand?: string[];
    brand_id?: string[];
    external_ids?: Record<string, string>;
    metadata?: Record<string, unknown>;
    bbox?: [number, number, number, number];
    operational_status?: string;
  };
};
