"use client";

import { AuthError, Provider } from "@supabase/supabase-js";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { Button } from "@radix-ui/themes";
import Image from "next/image";
import { EnabledProviders, Providers } from "@/utils/constants";
import { Database } from "../../../../../types/supabase";

export default function AuthProvider() {
  // const pathname = usePathname();
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
      // options: {
      //   redirectTo: location.origin + "/auth/callback?next=" + pathname,
      // },
    });

    if (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-2 pt-2">
      {EnabledProviders.map((provider: Provider, index: number) => {
        const providerData = Providers.find((pProvider) => pProvider.key === provider);

        return (
          <Button
            variant="outline"
            className="w-full cursor-pointer"
            key={index}
            value={provider}
            onClick={handleAuthProviderOnClick}
          >
            <div className="flex items-center gap-2">
              <Image src={providerData!.icon} alt={providerData!.name} priority={true} width={24} height={24} />
              {providerData!.name}
            </div>
          </Button>
        );
      })}
    </div>
  );
}
