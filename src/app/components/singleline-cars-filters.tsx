"use client";

import { TextField } from "@radix-ui/themes";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { QueryData, QueryError } from "@supabase/supabase-js";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { ReactElement, useState } from "react";
import { SpinnerDiamond } from "spinners-react";
import { useRouter } from "next/navigation";
import useDebouncedPromise from "@/hooks/use-debounce-promise";
import { Tables } from "../../../types/database.types";
import { Database } from "../../../types/supabase";

export default function SinglelineCarsFilter(): ReactElement {
  const t = useTranslations("index");
  const supabase = createClientComponentClient<Database>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [cars, setCars] = useState<Tables<"Car">[] | null>(null);

  const searchCar = useDebouncedPromise(async (searchTerm: string) => {
    const query = supabase.from("Car").select("*").ilike("title", `%${searchTerm}%`);
    const { data, error }: { data: QueryData<typeof query> | null; error: QueryError | null } = await query;

    //TODO handle error
    if (error) {
      console.log("error", error);
    }

    if (data && data.length > 0) {
      setCars(data);
      setIsLoading(false);
    }
  }, 500);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setCars(null);

    if (value.length > 0) {
      if (isLoading === false) {
        setIsLoading(true);
      }
      searchCar(value);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <form className="w-full">
        <TextField.Root size={"3"} onChange={handleSearch}>
          <TextField.Slot>
            <Search height="16" width="16" />
          </TextField.Slot>
          <TextField.Input placeholder={t("searchButton")} />
          {isLoading && (
            <TextField.Slot>
              <SpinnerDiamond size={35} color="lime" secondaryColor="#E8E8E8" className="p-1" />
            </TextField.Slot>
          )}
        </TextField.Root>
      </form>
      {cars && <Dropdown cars={cars} />}
    </div>
  );
}

type DropdownProps = {
  cars: Tables<"Car">[];
};

const Dropdown = ({ cars }: DropdownProps): ReactElement => {
  const router = useRouter();

  const handleClick = (id: number) => () => {
    router.push(`/car/${id}`, { scroll: false });
  };

  return (
    <div
      className={`rounded-sm border-b border-l border-r border-gray-300 transition-all duration-1000 ease-in-out 
        ${cars && cars.length > 0 ? "max-h-72 opacity-100" : "max-h-0 opacity-0"} flex w-11/12 flex-col items-start gap-1 p-2`}
    >
      {cars.slice(0, 8).map((car: Tables<"Car">, index: number) => {
        return (
          <div
            key={index}
            className="flex w-full items-center overflow-hidden p-4 hover:cursor-pointer hover:bg-lime-300"
            onClick={handleClick(car.carId)}
          >
            {car.title}
          </div>
        );
      })}
    </div>
  );
};
