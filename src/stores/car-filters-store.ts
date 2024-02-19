import { create } from "zustand";
import { produce } from "immer";
import { CarFiltersType } from "@/interfaces/car-filters-interface";
import { RangeFiltersType } from "@/interfaces/range-filter-interface";
import { Enums } from "../../types/database.types";

export type CarFiltersStore = {
  carFilters: CarFiltersType | undefined;
};

export type CarFiltersActions = {
  setCarFilterTitle: (title: string) => void;
  setCarFilterManufacturer: (manufacturer: number) => void;
  setCarFilterModel: (model: number) => void;
  setCarFilterYearRange: (year: RangeFiltersType) => void;
  setCarFilterPriceRange: (price: RangeFiltersType) => void;
  setCarFilterHorsepowerRange: (horsepower: RangeFiltersType) => void;
  setCarFilterTorqueRange: (torque: RangeFiltersType) => void;
  setCarFilterKmRange: (km: RangeFiltersType) => void;
  setCarFilterKmPerLiterCityRange: (kmPerLiterCity: RangeFiltersType) => void;
  setCarFilterKmPerLiterHighwayRange: (kmPerLiterHighway: RangeFiltersType) => void;
  setCarFilterTransmissionType: (transmissionType: Enums<"car_transmission_type">) => void;
  setCarFilterEngineType: (engineType: Enums<"car_engine_type">) => void;
  setCarFilterFuelType: (fuelType: Enums<"car_fuel_type">) => void;
  setCarFilterStatus: (status: Enums<"car_status_type">) => void;
  setCarFilterCategory: (category: number) => void;
};

export const useCarFiltersStore = create<CarFiltersStore & CarFiltersActions>()((set) => {
  return {
    carFilters: undefined,
    setCarFilterTitle: (title: string) =>
      set(
        produce((state: CarFiltersStore) => {
          state.carFilters = { ...state.carFilters, title: title } as CarFiltersType;
        }),
      ),
    setCarFilterManufacturer: (manufacturer: number) =>
      set(
        produce((state: CarFiltersStore) => {
          state.carFilters = { ...state.carFilters, manufacturer: manufacturer } as CarFiltersType;
        }),
      ),
    setCarFilterModel: (model: number) =>
      set(
        produce((state: CarFiltersStore) => {
          state.carFilters = { ...state.carFilters, model: model } as CarFiltersType;
        }),
      ),
    setCarFilterYearRange: (year: RangeFiltersType) =>
      set(
        produce((state: CarFiltersStore) => {
          state.carFilters = { ...state.carFilters, year: year } as CarFiltersType;
        }),
      ),
    setCarFilterPriceRange: (price: RangeFiltersType) =>
      set(
        produce((state: CarFiltersStore) => {
          state.carFilters = { ...state.carFilters, price: price } as CarFiltersType;
        }),
      ),
    setCarFilterHorsepowerRange: (horsepower: RangeFiltersType) =>
      set(
        produce((state: CarFiltersStore) => {
          state.carFilters = { ...state.carFilters, horsepower: horsepower } as CarFiltersType;
        }),
      ),
    setCarFilterTorqueRange: (torque: RangeFiltersType) =>
      set(
        produce((state: CarFiltersStore) => {
          state.carFilters = { ...state.carFilters, torque: torque } as CarFiltersType;
        }),
      ),
    setCarFilterKmRange: (km: RangeFiltersType) =>
      set(
        produce((state: CarFiltersStore) => {
          state.carFilters = { ...state.carFilters, km: km } as CarFiltersType;
        }),
      ),
    setCarFilterKmPerLiterCityRange: (kmPerLiterCity: RangeFiltersType) =>
      set(
        produce((state: CarFiltersStore) => {
          state.carFilters = { ...state.carFilters, kmPerLiterCity: kmPerLiterCity } as CarFiltersType;
        }),
      ),
    setCarFilterKmPerLiterHighwayRange: (kmPerLiterHighway: RangeFiltersType) =>
      set(
        produce((state: CarFiltersStore) => {
          state.carFilters = { ...state.carFilters, kmPerLiterHighway: kmPerLiterHighway } as CarFiltersType;
        }),
      ),
    setCarFilterTransmissionType: (transmissionType: Enums<"car_transmission_type">) =>
      set(
        produce((state: CarFiltersStore) => {
          state.carFilters = { ...state.carFilters, transmissionType: transmissionType } as CarFiltersType;
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
          state.carFilters = { ...state.carFilters, fuelType: fuelType } as CarFiltersType;
        }),
      ),
    setCarFilterStatus: (status: Enums<"car_status_type">) =>
      set(
        produce((state: CarFiltersStore) => {
          state.carFilters = { ...state.carFilters, status: status } as CarFiltersType;
        }),
      ),
    setCarFilterCategory: (category: number) =>
      set(
        produce((state: CarFiltersStore) => {
          state.carFilters = { ...state.carFilters, category: category } as CarFiltersType;
        }),
      ),
  };
});
