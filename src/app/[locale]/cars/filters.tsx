import React, { ReactElement } from "react";
import ManufacturersFilter from "./_components/manufacturers-filter";
import EngineTypeFilter from "./_components/engine-type-filter";
import FuelTypeFilter from "./_components/fuel-type-filter";
import TransmissionTypeFilter from "./_components/transmission-type-filter";
import StatusFilter from "./_components/status-filter";
import Search from "./search";
import PriceFilter from "./_components/price-filter";
import TorqueFilter from "./_components/torque-filter";
import KmFilter from "./_components/km-filter";
import HorsepowerFilter from "./_components/horsepower-filter";
import KmPerLiterCityFilter from "./_components/km-per-liter-city-filter";
import KmPerLiterHighwayFilter from "./_components/km-per-liter-highway-filter";
import CategoryFilter from "./_components/category-filter";
import ModelFilter from "./_components/model-filter";

export default function Filters(): ReactElement {
  return (
    <div className="flex flex-col gap-4">
      <ManufacturersFilter />
      <ModelFilter />
      <EngineTypeFilter />
      <FuelTypeFilter />
      <TransmissionTypeFilter />
      <StatusFilter />
      <CategoryFilter />
      <PriceFilter />
      <TorqueFilter />
      <HorsepowerFilter />
      <KmFilter />
      <KmPerLiterCityFilter />
      <KmPerLiterHighwayFilter />
      <Search />
    </div>
  );
}
