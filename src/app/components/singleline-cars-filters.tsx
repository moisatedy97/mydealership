"use client";

import { Button, TextField } from "@radix-ui/themes";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { QueryData, QueryError } from "@supabase/supabase-js";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { ReactElement, useEffect, useState } from "react";
import { SpinnerDiamond } from "spinners-react";
import { useRouter } from "next/navigation";
import useDebouncedPromise from "@/hooks/use-debounce-promise";
import { useCarFiltersStore } from "@/stores/car-filters-store";
import { Tables } from "../../../types/database.types";
import { Database } from "../../../types/supabase";

export default function SinglelineCarsFilter(): ReactElement {
  const t = useTranslations("index");
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [cars, setCars] = useState<Tables<"Car">[] | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const setTitle = useCarFiltersStore((state) => state.setCarFilterTitle);

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (activeIndex === null) {
      event.preventDefault();
      console.log("handleSubmit");

      router.push("cars", { scroll: false });
    }
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTitle(value);
  };

  //TODO il SpinnerDiamond da warning perche usa variabili deprecate
  return (
    <div className="w-fulll flex flex-col items-center">
      <form className="w-full" onSubmit={handleSubmit}>
        <TextField.Root size={"3"} onChange={handleSearch}>
          <TextField.Slot>
            <Button variant="solid" className="cursor-pointer" type="submit">
              <Search height="16" width="16" />
            </Button>
          </TextField.Slot>
          <TextField.Input placeholder={t("searchButton")} onChange={handleChangeTitle} />
          {isLoading && (
            <TextField.Slot>
              <SpinnerDiamond size={35} color="lime" secondaryColor="#E8E8E8" className="p-1" />
            </TextField.Slot>
          )}
        </TextField.Root>
      </form>
      {cars && <Dropdown cars={cars} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />}
    </div>
  );
}

type DropdownProps = {
  cars: Tables<"Car">[];
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
};

const Dropdown = ({ cars, activeIndex, setActiveIndex }: DropdownProps): ReactElement => {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (activeIndex !== null) {
        event.preventDefault();
      }

      if (event.key === "ArrowDown") {
        setActiveIndex((prevIndex) => (prevIndex === null ? 0 : Math.min(prevIndex + 1, cars.slice(0, 8).length - 1)));
      } else if (event.key === "ArrowUp") {
        setActiveIndex((prevIndex) => (prevIndex === null ? 0 : Math.max(prevIndex - 1, 0)));
      } else if (event.key === "Enter" && activeIndex !== null) {
        router.push(`/car/${cars[activeIndex].carId}`, { scroll: false });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex]);

  const handleClickCar = (id: number) => () => {
    router.push(`/car/${id}`, { scroll: false });
  };

  const handleMouseEnter = (index: number) => () => {
    setActiveIndex(index);
  };

  return (
    <div
      className={`rounded-sm border-b border-l border-r border-gray-300 transition-all duration-1000 ease-in-out 
        ${cars && cars.length > 0 ? "max-h-80 opacity-100" : "max-h-0 opacity-0"} flex w-11/12 flex-col items-start gap-1 p-2`}
      onMouseLeave={() => setActiveIndex(null)}
    >
      {cars.slice(0, 8).map((car: Tables<"Car">, index: number) => {
        return (
          <div
            key={index}
            className={`flex w-full cursor-pointer items-center overflow-hidden p-4 ${
              index === activeIndex ? "bg-lime-300" : "hover:bg-lime-300"
            }`}
            onClick={handleClickCar(car.carId)}
            onMouseEnter={handleMouseEnter(index)}
          >
            {car.title}
          </div>
        );
      })}
    </div>
  );
};
