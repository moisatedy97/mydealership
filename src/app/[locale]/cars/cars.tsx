"use client";

import React, { ReactElement } from "react";
import { ScrollArea } from "@radix-ui/themes";
import { useCarsStore } from "@/stores/cars-store";
import { Tables } from "../../../../types/database.types";
import CarCard from "./_components/car-card";

export default function CarsResult(): ReactElement | undefined {
  const cars = useCarsStore((state) => state.cars);

  if (cars && cars.length > 0) {
    return (
      <ScrollArea type="always" scrollbars="vertical" style={{ height: 615 }} className="mt-4">
        <div className="grid gap-4 md:grid-cols-3">
          {cars.map((car: Tables<"Car">, index: number) => {
            return <CarCard key={index} car={car} />;
          })}
        </div>
      </ScrollArea>
    );
  }
}
