import { z } from "zod";
import { Enums } from "../../types/database.types";

export const carFiltersSchema = z.object({
  manufacturer: z.string(),
  model: z.string(),
  year: z.number().min(1800).max(new Date().getFullYear()),
  price: z.number().max(Math.pow(10, 8)),
  horsepower: z.number().max(2500),
  torque: z.number().max(5000),
  km: z.number().max(2 * Math.pow(10, 7)),
  kmPerLiterCity: z.number().max(100),
  kmPerLiterHighway: z.number().max(100),
  transmissionType: z.custom<Enums<"car_transmission_type">>(),
  engineType: z.custom<Enums<"car_engine_type">>(),
  fuelType: z.custom<Enums<"car_fuel_type">>(),
  status: z.custom<Enums<"car_status_type">>(),
  category: z.string(),
});

export type CarFiltersType = z.infer<typeof carFiltersSchema>;
