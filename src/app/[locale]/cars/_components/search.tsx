"use client";

import { Button } from "@radix-ui/themes";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SearchIcon } from "lucide-react";
import React, { ReactElement } from "react";
import { CarFiltersType } from "@/interfaces/car-filters-interface";
import { useCarFiltersStore } from "@/stores/car-filters-store";
import { Database } from "../../../../../types/supabase";

export default function Search(): ReactElement {
  const carFilters = useCarFiltersStore((state) => state.carFilters);

  const handleSearch = async () => {
    if (carFilters) {
      const { data, error } = await constructQuery(carFilters);

      if (error) {
        throw error;
      }

      if (data) {
        console.log(data);
      }
    } else {
      console.log("No filters selected");
    }
  };

  return (
    <Button onClick={handleSearch}>
      <SearchIcon width="16" height="16" />
      Search
    </Button>
  );
}

async function constructQuery(carFilters: CarFiltersType) {
  const supabase = createClientComponentClient<Database>();
  let query = supabase.from("Car").select("*");

  if (carFilters.manufacturer > 0) {
    query = query.eq("manufacturerId", carFilters.manufacturer);
  }
  if (carFilters.fuelType.length > 0) {
    query = query.eq("fuelType", carFilters.fuelType);
  }

  return await query;
}
