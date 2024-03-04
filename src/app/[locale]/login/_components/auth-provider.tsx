"use client";

import { AuthError, Provider } from "@supabase/supabase-js";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { usePathname } from "next/navigation";
import { Button } from "@radix-ui/themes";
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
    <div className="flex gap-1">
      {EnabledProviders.map((provider: Provider, index: number) => {
        return (
          <Button
            variant="outline"
            className="cursor-pointer"
            key={index}
            value={provider}
            onClick={handleAuthProviderOnClick}
          >
            {provider}
          </Button>
        );
      })}
    </div>
  );
}
