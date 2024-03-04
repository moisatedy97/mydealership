"use client";

import React, { ReactElement } from "react";
import { Select } from "@radix-ui/themes";
import { useCarFiltersStore } from "@/stores/car-filters-store";
import { Tables } from "../../../../../types/database.types";

type PropsCategorySelect = {
  categories: Tables<"Category">[];
};

export default function CategorySelect({ categories }: PropsCategorySelect): ReactElement {
  const setCategory = useCarFiltersStore((state) => state.setCarFilterCategory);

  return (
    <Select.Root onValueChange={(value: string) => setCategory(Number(value))}>
      <Select.Trigger placeholder="Pick a category" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Categories</Select.Label>
          {categories.map((category: Tables<"Category">, index: number) => (
            <Select.Item key={index} value={category.categoryId.toString()}>
              {category.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}
