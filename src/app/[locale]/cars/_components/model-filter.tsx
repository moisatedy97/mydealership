"use client";

import { QueryData, QueryError } from "@supabase/supabase-js";
import React, { ReactElement, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Select } from "@radix-ui/themes";
import { useCarFiltersStore } from "@/stores/car-filters-store";
import { Tables } from "../../../../../types/database.types";
import { Database } from "../../../../../types/supabase";

export default function ModelFilter(): ReactElement | undefined {
  const supabase = createClientComponentClient<Database>();
  const { manufacturer, setModel } = useCarFiltersStore((state) => ({
    manufacturer: state.carFilters?.manufacturer,
    setModel: state.setCarFilterModel,
  }));
  const [carModels, setCarModels] = useState<Tables<"CarModel">[]>([]);

  useEffect(() => {
    if (manufacturer && manufacturer > 0) {
      const getModels = async () => {
        const query = supabase
          .from("CarModel")
          .select("*")
          .eq("manufacturerId", manufacturer)
          .order("name", { ascending: true });
        const { data, error }: { data: QueryData<typeof query> | null; error: QueryError | null } = await query;

        if (error) {
          throw error;
        }

        if (data) {
          setCarModels(data);
        }
      };

      getModels();
    }
  }, [manufacturer]);

  if (manufacturer && manufacturer > 0 && carModels.length > 0) {
    return (
      <Select.Root onValueChange={(value: string) => setModel(Number(value))}>
        <Select.Trigger placeholder="Pick a model" />
        <Select.Content>
          <Select.Group>
            <Select.Label>Models</Select.Label>
            {carModels.map((model: Tables<"CarModel">, index: number) => (
              <Select.Item key={index} value={model.carModelId.toString()}>
                {model.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    );
  }
}
