import { z } from "zod";

export const createRangeFiltersSchema = (min: number, max: number) => {
  return z
    .object({
      from: z.number().min(min).max(max).optional(),
      to: z.number().min(min).max(max).optional(),
    })
    .refine((data) => data.from === undefined || data.to === undefined || data.from < data.to, {
      message: "From must be less than To",
      path: ["from", "to"],
    });
};

export type RangeFiltersType = z.infer<ReturnType<typeof createRangeFiltersSchema>>;
