import { create } from "zustand";
import { produce } from "immer";
import { User } from "@supabase/supabase-js";

type UserSessionStore = {
  user: User | null;
  isLogged: boolean;
};

type UserSessionActions = {
  setUser: (user: User | null) => void;
  setIsLogged: (name: boolean) => void;
};

export const useUserSessionStore = create<UserSessionStore & UserSessionActions>()((set) => {
  return {
    user: null,
    isLogged: false,
    setUser: (user: User | null) =>
      set(
        produce((state: UserSessionStore) => {
          state.user = user;
        }),
      ),
    setIsLogged: (name: boolean) =>
      set(
        produce((state: UserSessionStore) => {
          state.isLogged = name;
        }),
      ),
  };
});
