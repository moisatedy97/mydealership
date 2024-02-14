import { Provider } from "@supabase/supabase-js";
import { RangeFiltersType } from "@/interfaces/range-filter-interface";
import { Enums } from "../../types/database.types";

export const EnabledProviders: Provider[] = ["github", "google"];
export const EngineTypes: Enums<"car_engine_type">[] = ["Combustion", "Electric", "Hybrid"];
export const TransmissionTypes: Enums<"car_transmission_type">[] = ["Automatic", "Manual"];
export const FuelTypes: Enums<"car_fuel_type">[] = ["Diesel", "Petrol", "Hydrogen", "Electricity", "LPG", "Methane"];
export const StatusTypes: Enums<"car_status_type">[] = ["Coming soon", "On sale", "Sold", "In process"];
export const YearRangeTypes: RangeFiltersType = {
  from: 1800,
  to: 2200,
};
export const PriceRangeTypes: RangeFiltersType = {
  from: 0,
  to: Math.pow(10, 6),
};
export const HorsepowerRangeTypes: RangeFiltersType = {
  from: 0,
  to: 2500,
};
export const TorqueRangeTypes: RangeFiltersType = {
  from: 0,
  to: 5000,
};
export const KmRangeTypes: RangeFiltersType = {
  from: 0,
  to: 2 * Math.pow(10, 7),
};
export const KmPerLiterCityRangeTypes: RangeFiltersType = {
  from: 0,
  to: 100,
};
export const KmPerLiterHighwayRangeTypes: RangeFiltersType = {
  from: 0,
  to: 100,
};
