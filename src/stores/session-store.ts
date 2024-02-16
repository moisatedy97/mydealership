import { create } from "zustand";
import { produce } from "immer";

type UserSessionStore = {
  isLogged: boolean;
};

type UserSessionActions = {
  setIsLogged: (name: boolean) => void;
};

export const useUserSessionStore = create<UserSessionStore & UserSessionActions>()((set) => {
  return {
    isLogged: false,
    setIsLogged: (name: boolean) =>
      set(
        produce((state: UserSessionStore) => {
          state.isLogged = name;
        }),
      ),
  };
});
