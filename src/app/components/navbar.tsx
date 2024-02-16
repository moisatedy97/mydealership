"use client";

import { Button, DropdownMenu, Heading } from "@radix-ui/themes";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AuthError, Session, SupabaseClient } from "@supabase/supabase-js";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactElement, useEffect } from "react";
import { useUserSessionStore } from "@/stores/session-store";
import { Database } from "../../../types/supabase";
import LanguageSelector from "./language-selector";

type SupabaseClientProps = {
  supabase: SupabaseClient;
};

export default function Navbar(): ReactElement {
  const supabase = createClientComponentClient<Database>();

  return (
    <nav className="sticky top-0 z-50 flex h-16 items-center justify-center border-b border-lime-200 bg-white">
      <div className="flex  items-center gap-3">
        <Heading as="h1" weight={"bold"}>
          <span className="block text-lime-400 sm:hidden">MyD</span>
          <span className="hidden text-lime-400  sm:block ">MyDealership</span>
        </Heading>
        <NavigationMenu supabase={supabase} />
        <LanguageSelector />
      </div>
    </nav>
  );
}

const NavigationMenu = ({ supabase }: SupabaseClientProps): ReactElement => {
  const t = useTranslations("navbar");
  const { isLogged, setIsLogged } = useUserSessionStore((state) => ({
    isLogged: state.isLogged,
    setIsLogged: state.setIsLogged,
  }));

  useEffect(() => {
    const getUserLoggedSession = async () => {
      const { data }: { data: { session: Session | null }; error: AuthError | null } = await supabase.auth.getSession();
      if (data.session) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    };

    getUserLoggedSession();
  }, []);

  if (isLogged) {
    return (
      <>
        <Button variant="soft" asChild>
          <Link href="/">{t("menu.home")}</Link>
        </Button>
        <Button variant="soft" asChild>
          <Link href="/cars">{t("menu.cars")}</Link>
        </Button>
        <ProfileButton supabase={supabase} />
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

const ProfileButton = ({ supabase }: SupabaseClientProps): ReactElement => {
  const t = useTranslations("navbar");

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="outline" className="cursor-pointer">
          {t("menu.user.profile")}
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <LogoutButton supabase={supabase} />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

const LogoutButton = ({ supabase }: SupabaseClientProps) => {
  const t = useTranslations("navbar");
  const router = useRouter();
  const setIsLogged = useUserSessionStore((state) => state.setIsLogged);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }

    router.refresh();
    setIsLogged(false);
  };

  return (
    <DropdownMenu.Item color="red" onClick={() => signOut()}>
      {t("menu.user.logout")}
    </DropdownMenu.Item>
  );
};
