import React, { ReactElement } from "react";
import ManufacturersFilter from "./_components/manufacturers-filter";
import EngineTypeFilter from "./_components/engine-type-filter";
import FuelTypeFilter from "./_components/fuel-type-filter";
import TransmissionTypeFilter from "./_components/transmission-type-filter";
import StatusFilter from "./_components/status-filter";
import Search from "./_components/search";
import PriceFilter from "./_components/price-filter";

export default function Filters(): ReactElement {
  return (
    <div>
      <ManufacturersFilter />
      <EngineTypeFilter />
      <FuelTypeFilter />
      <TransmissionTypeFilter />
      <StatusFilter />
      <PriceFilter />
      <Search />
    </div>
  );
}
