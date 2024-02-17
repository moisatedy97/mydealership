import { create } from "zustand";
import { produce } from "immer";
import { User } from "@supabase/supabase-js";

type UserSessionStore = {
  user: User | null;
};

type UserSessionActions = {
  setUser: (user: User | null) => void;
};

export const useUserSessionStore = create<UserSessionStore & UserSessionActions>()((set) => {
  return {
    user: null,
    setUser: (user: User | null) =>
      set(
        produce((state: UserSessionStore) => {
          state.user = user;
        }),
      ),
  };
});
