"use client";

import { AuthError, Provider } from "@supabase/supabase-js";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { usePathname } from "next/navigation";
import { EnabledProviders } from "@/utils/constants";
import { Database } from "../../../../../types/supabase";

export default function AuthProvider() {
  const pathname = usePathname();
  const supabase = createClientComponentClient<Database>();

  const handleAuthProviderOnClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      data,
      error,
    }: {
      data:
        | {
            provider: Provider;
            url: string;
          }
        | {
            provider: Provider;
            url: null;
          };
      error: AuthError | null;
    } = await supabase.auth.signInWithOAuth({
      provider: event.currentTarget.value as Provider,
      options: {
        redirectTo: location.origin + "/auth/callback?next=" + pathname,
      },
    });

    if (error) {
      throw error;
    }
  };

  return (
    <div>
      {EnabledProviders.map((provider: Provider, index: number) => {
        return (
          <button
            key={index}
            className="btn-dark btn btn-outline rounded-full"
            value={provider}
            onClick={handleAuthProviderOnClick}
          >
            {provider}
          </button>
        );
      })}
    </div>
  );
}
