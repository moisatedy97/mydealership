import { create } from "zustand";
import { produce } from "immer";
import { Tables } from "../../types/database.types";

type CarsStore = {
  cars: Tables<"Car">[] | undefined;
};

type CarActions = {
  setCars: (cars: Tables<"Car">[]) => void;
};

export const useCarsStore = create<CarsStore & CarActions>()((set) => {
  return {
    cars: undefined,
    setCars: (cars: Tables<"Car">[]) =>
      set(
        produce((state: CarsStore) => {
          state.cars = cars;
        }),
      ),
  };
});
