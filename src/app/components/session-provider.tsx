"use client";

import React, { ReactElement, useEffect } from "react";
import { createClientComponentClient, Session } from "@supabase/auth-helpers-nextjs";
import { AuthError } from "@supabase/supabase-js";
import { useUserSessionStore } from "@/stores/session-store";
import { Database } from "../../../types/supabase";

export default function SessionProvider(): ReactElement {
  const supabase = createClientComponentClient<Database>();
  const setUser = useUserSessionStore((state) => state.setUser);

  const readUserSession = async () => {
    const { data, error }: { data: { session: Session | null }; error: AuthError | null } =
      await supabase.auth.getSession();

    //TODO handle error
    if (error) {
      console.error("Error reading user session", error);
    }

    if (data && data.session) {
      setUser(data.session.user);
    }
  };

  useEffect(() => {
    readUserSession();
  }, []);

  return <></>;
}
