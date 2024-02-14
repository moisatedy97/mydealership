import { z } from "zod";
import {
  HorsepowerRangeTypes,
  KmPerLiterCityRangeTypes,
  KmPerLiterHighwayRangeTypes,
  KmRangeTypes,
  PriceRangeTypes,
  TorqueRangeTypes,
  YearRangeTypes,
} from "@/utils/constants";
import { Enums } from "../../types/database.types";
import { createRangeFiltersSchema } from "./range-filter-interface";

export const carFiltersSchema = z.object({
  manufacturer: z.number(),
  model: z.number(),
  year: createRangeFiltersSchema(YearRangeTypes.from, YearRangeTypes.to),
  price: createRangeFiltersSchema(PriceRangeTypes.from, PriceRangeTypes.to),
  horsepower: createRangeFiltersSchema(HorsepowerRangeTypes.from, HorsepowerRangeTypes.to),
  torque: createRangeFiltersSchema(TorqueRangeTypes.from, TorqueRangeTypes.to),
  km: createRangeFiltersSchema(KmRangeTypes.from, KmRangeTypes.to),
  kmPerLiterCity: createRangeFiltersSchema(KmPerLiterCityRangeTypes.from, KmPerLiterCityRangeTypes.to),
  kmPerLiterHighway: createRangeFiltersSchema(KmPerLiterHighwayRangeTypes.from, KmPerLiterHighwayRangeTypes.to),
  transmissionType: z.custom<Enums<"car_transmission_type">>(),
  engineType: z.custom<Enums<"car_engine_type">>(),
  fuelType: z.custom<Enums<"car_fuel_type">>(),
  status: z.custom<Enums<"car_status_type">>(),
  category: z.number(),
});

export type CarFiltersType = z.infer<typeof carFiltersSchema>;
