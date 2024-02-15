"use client";

import { Button, DropdownMenu, Heading } from "@radix-ui/themes";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { User } from "@supabase/supabase-js";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";
import { Database } from "../../../types/supabase";
import LanguageSelector from "./language-selector";

export default function Navbar(): ReactElement {
  return (
    <nav className="sticky top-0 z-50 flex h-16 items-center justify-center border-b border-lime-200 bg-white">
      <div className="flex  items-center gap-3">
        <Heading as="h1" weight={"bold"}>
          <span className="block text-lime-400 sm:hidden">MyD</span>
          <span className="hidden text-lime-400  sm:block ">MyDealership</span>
        </Heading>
        <NavigationMenu />
        <LanguageSelector />
      </div>
    </nav>
  );
}

const ProfileButton = (): ReactElement => {
  const t = useTranslations("navbar");

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="outline" className="cursor-pointer">
          {t("menu.user.profile")}
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <LogoutButton />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

const LogoutButton = () => {
  const t = useTranslations("navbar");
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }

    router.refresh();
  };

  return (
    <DropdownMenu.Item color="red" onClick={() => signOut()}>
      {t("menu.user.logout")}
    </DropdownMenu.Item>
  );
};

const NavigationMenu = (): ReactElement => {
  const supabase = createClientComponentClient<Database>();
  const t = useTranslations("navbar");
  const [isLogged, setIsLogged] = useState<boolean>();

  useEffect(() => {
    const getUserLoggedSession = async () => {
      const data: User | null = (await supabase.auth.getUser()).data.user;
      if (!!data === true) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    };

    getUserLoggedSession();
  });

  if (isLogged) {
    return (
      <>
        <Button variant="soft" asChild>
          <Link href="/">{t("menu.home")}</Link>
        </Button>
        <Button variant="soft" asChild>
          <Link href="/cars">{t("menu.cars")}</Link>
        </Button>
        <ProfileButton />
      </>
    );
  } else {
    return (
      <>
        <Button variant="soft" asChild>
          <Link href="/">{t("menu.home")}</Link>
        </Button>
        <Button variant="soft" asChild>
          <Link href="/login">{t("menu.login")}</Link>
        </Button>
      </>
    );
  }
};
