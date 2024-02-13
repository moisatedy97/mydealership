import { create } from "zustand";
import { produce } from "immer";
import { CarFiltersType } from "@/interfaces/car-filters-interface";
import { Enums } from "../../types/database.types";

export type CarFiltersStore = {
  carFilters: CarFiltersType | null;
};

export type CarFiltersActions = {
  setCarFilterManufacturer: (manufacturer: string) => void;
  setCarFilterModel: (model: string) => void;
  setCarFilterYear: (year: number) => void;
  setCarFilterPrice: (price: number) => void;
  setCarFilterHorsepower: (horsepower: number) => void;
  setCarFilterTorque: (torque: number) => void;
  setCarFilterKm: (km: number) => void;
  setCarFilterKmPerLiterCity: (kmPerLiterCity: number) => void;
  setCarFilterKmPerLiterHighway: (kmPerLiterHighway: number) => void;
  setCarFilterTransimissionType: (transmissionType: Enums<"car_transmission_type">) => void;
  setCarFilterEngineType: (engineType: Enums<"car_engine_type">) => void;
  setCarFilterFuelType: (fuelType: Enums<"car_fuel_type">) => void;
  setCarFilterStatus: (status: Enums<"car_status_type">) => void;
  setCarFilterCategory: (category: string) => void;
};

export const useCarFiltersStore = create<CarFiltersStore & CarFiltersActions>()((set) => {
  return {
    carFilters: null,
    setCarFilterManufacturer: (manufacturer: string) =>
      set(
        produce((state: CarFiltersStore) => {
          if (state.carFilters) {
            state.carFilters.manufacturer = manufacturer;
          }
        }),
      ),
    setCarFilterModel: (model: string) =>
      set(
        produce((state: CarFiltersStore) => {
          if (state.carFilters) {
            state.carFilters.model = model;
          }
        }),
      ),
    setCarFilterYear: (year: number) =>
      set(
        produce((state: CarFiltersStore) => {
          if (state.carFilters) {
            state.carFilters.year = year;
          }
        }),
      ),
    setCarFilterPrice: (price: number) =>
      set(
        produce((state: CarFiltersStore) => {
          if (state.carFilters) {
            state.carFilters.price = price;
          }
        }),
      ),
    setCarFilterHorsepower: (horsepower: number) =>
      set(
        produce((state: CarFiltersStore) => {
          if (state.carFilters) {
            state.carFilters.horsepower = horsepower;
          }
        }),
      ),
    setCarFilterTorque: (torque: number) =>
      set(
        produce((state: CarFiltersStore) => {
          if (state.carFilters) {
            state.carFilters.torque = torque;
          }
        }),
      ),
    setCarFilterKm: (km: number) =>
      set(
        produce((state: CarFiltersStore) => {
          if (state.carFilters) {
            state.carFilters.km = km;
          }
        }),
      ),
    setCarFilterKmPerLiterCity: (kmPerLiterCity: number) =>
      set(
        produce((state: CarFiltersStore) => {
          if (state.carFilters) {
            state.carFilters.kmPerLiterCity = kmPerLiterCity;
          }
        }),
      ),
    setCarFilterKmPerLiterHighway: (kmPerLiterHighway: number) =>
      set(
        produce((state: CarFiltersStore) => {
          if (state.carFilters) {
            state.carFilters.kmPerLiterHighway = kmPerLiterHighway;
          }
        }),
      ),
    setCarFilterTransimissionType: (transmissionType: Enums<"car_transmission_type">) =>
      set(
        produce((state: CarFiltersStore) => {
          if (state.carFilters) {
            state.carFilters.transmissionType = transmissionType;
          }
        }),
      ),
    setCarFilterEngineType: (engineType: Enums<"car_engine_type">) =>
      set(
        produce((state: CarFiltersStore) => {
          if (state.carFilters) {
            state.carFilters.engineType = engineType;
          }
        }),
      ),
    setCarFilterFuelType: (fuelType: Enums<"car_fuel_type">) =>
      set(
        produce((state: CarFiltersStore) => {
          if (state.carFilters) {
            state.carFilters.fuelType = fuelType;
          }
        }),
      ),
    setCarFilterStatus: (status: Enums<"car_status_type">) =>
      set(
        produce((state: CarFiltersStore) => {
          if (state.carFilters) {
            state.carFilters.status = status;
          }
        }),
      ),
    setCarFilterCategory: (category: string) =>
      set(
        produce((state: CarFiltersStore) => {
          if (state.carFilters) {
            state.carFilters.category = category;
          }
        }),
      ),
  };
});
