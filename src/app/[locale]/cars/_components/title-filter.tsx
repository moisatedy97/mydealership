"use client";

import { TextField } from "@radix-ui/themes";
import { Search } from "lucide-react";
import React, { ReactElement } from "react";
import { useTranslations } from "next-intl";
import { useCarFiltersStore } from "@/stores/car-filters-store";

export default function TitleFilter(): ReactElement {
  const t = useTranslations("cars");

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
      <TextField.Input placeholder={t("search_by_title")} value={title ?? ""} onChange={handleChangeTitle} />
    </TextField.Root>
  );
}
