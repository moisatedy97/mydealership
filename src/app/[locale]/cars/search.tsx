"use client";

import { Button } from "@radix-ui/themes";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SearchIcon } from "lucide-react";
import React, { ReactElement } from "react";
import { useTranslations } from "next-intl";
import { CarFiltersType } from "@/interfaces/car-filters-interface";
import { useCarFiltersStore } from "@/stores/car-filters-store";
import { useCarsStore } from "@/stores/cars-store";
import { Database } from "../../../../types/supabase";

export default function Search(): ReactElement {
  const t = useTranslations("cars");
  const carFilters = useCarFiltersStore((state) => state.carFilters);
  const setCars = useCarsStore((state) => state.setCars);

  const handleSearch = async () => {
    if (carFilters) {
      const { data, error } = await constructQuery(carFilters);

      if (error) {
        console.log(error);
      }

      if (data && data.length > 0) {
        setCars(data);
      }
    } else {
      console.log("No filters selected");
    }
  };

  return (
    <Button onClick={handleSearch} className="cursor-pointer">
      <SearchIcon width="16" height="16" />
      {t("search")}
    </Button>
  );
}

async function constructQuery(carFilters: CarFiltersType) {
  const supabase = createClientComponentClient<Database>();
  let query = supabase.from("Car").select("*");

  if (carFilters.title && carFilters.title.length > 0) {
    query = query.ilike("title", `%${carFilters.title}%`);
  }
  if (carFilters.manufacturer && carFilters.manufacturer > 0) {
    query = query.eq("manufacturerId", carFilters.manufacturer);
  }
  if (carFilters.model && carFilters.model > 0) {
    query = query.eq("modelId", carFilters.model);
  }
  if (carFilters.engineType && carFilters.engineType.length > 0) {
    query = query.eq("engineType", carFilters.engineType);
  }
  if (carFilters.fuelType && carFilters.fuelType.length > 0) {
    query = query.eq("fuelType", carFilters.fuelType);
  }
  if (carFilters.transmissionType && carFilters.transmissionType.length > 0) {
    query = query.eq("transmissionType", carFilters.transmissionType);
  }
  if (carFilters.status && carFilters.status.length > 0) {
    query = query.eq("status", carFilters.status);
  }
  if (carFilters.category && carFilters.category > 0) {
    query = query.eq("categoryId", carFilters.category);
  }
  if (carFilters.price) {
    query = query.gte("price", carFilters.price.from).lte("price", carFilters.price.to);
  }
  if (carFilters.torque) {
    query = query.gte("torque", carFilters.torque.from).lte("torque", carFilters.torque.to);
  }
  if (carFilters.horsepower) {
    query = query.gte("horsepower", carFilters.horsepower.from).lte("horsepower", carFilters.horsepower.to);
  }
  if (carFilters.km) {
    query = query.gte("km", carFilters.km.from).lte("km", carFilters.km.to);
  }
  if (carFilters.kmPerLiterCity) {
    query = query
      .gte("kmPerLiterCity", carFilters.kmPerLiterCity.from)
      .lte("kmPerLiterCity", carFilters.kmPerLiterCity.to);
  }
  if (carFilters.kmPerLiterHighway) {
    query = query
      .gte("kmPerLiterHighway", carFilters.kmPerLiterHighway.from)
      .lte("kmPerLiterHighway", carFilters.kmPerLiterHighway.to);
  }

  return await query;
}
