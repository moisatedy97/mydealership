"use client";

import { TextField } from "@radix-ui/themes";
import { Search } from "lucide-react";
import React, { ReactElement } from "react";
import { useCarFiltersStore } from "@/stores/car-filters-store";

export default function TitleFilter(): ReactElement {
  const { title, setTitle } = useCarFiltersStore((state) => ({
    title: state.carFilters?.title,
    setTitle: state.setCarFilterTitle,
  }));

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTitle(value);
  };

  return (
    <TextField.Root>
      <TextField.Slot>
        <Search height="16" width="16" />
      </TextField.Slot>
      <TextField.Input placeholder="Search by title…" value={title ?? ""} onChange={handleChangeTitle} />
    </TextField.Root>
  );
}
