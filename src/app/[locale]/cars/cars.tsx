"use client";

import React, { ReactElement } from "react";
import { useCarsStore } from "@/stores/cars-store";
import { Tables } from "../../../../types/database.types";
import CarCard from "./_components/car-card";

export default function Cars(): ReactElement | undefined {
  const cars = useCarsStore((state) => state.cars);

  if (cars && cars.length > 0) {
    return (
      <div>
        {cars.map((car: Tables<"Car">, index: number) => {
          return <CarCard key={index} car={car} />;
        })}
      </div>
    );
  }
}
