"use client";

import { Slider } from "@radix-ui/themes";
import React, { ReactElement } from "react";
import { useTranslations } from "next-intl";
import { useCarFiltersStore } from "@/stores/car-filters-store";
import { TorqueRangeTypes } from "@/utils/constants";

export default function TorqueFilter(): ReactElement {
  const t = useTranslations("cars");
  const { torque, setTorque } = useCarFiltersStore((state) => ({
    torque: state.carFilters?.torque,
    setTorque: state.setCarFilterTorqueRange,
  }));

  const handleRangeChange = (values: number[]) => {
    setTorque({
      from: values[0],
      to: values[1],
    });
  };

  return (
    <div className="flex flex-col gap-1">
      <div>{`${t("torque")} ${torque ? torque.from : TorqueRangeTypes.from} - ${torque ? torque.to : TorqueRangeTypes.to}`}</div>
      <Slider
        min={TorqueRangeTypes.from}
        max={TorqueRangeTypes.to}
        defaultValue={[TorqueRangeTypes.from, TorqueRangeTypes.to]}
        onValueCommit={handleRangeChange}
        className="w-full"
      />
    </div>
  );
}
