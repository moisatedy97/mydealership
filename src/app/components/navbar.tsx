"use client";

import { Button, DropdownMenu, Heading } from "@radix-ui/themes";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SupabaseClient } from "@supabase/supabase-js";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactElement } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useUserSessionStore } from "@/stores/session-store";
import { Database } from "../../../types/supabase";
import LanguageSelector from "./language-selector";

type SupabaseClientProps = {
  supabase: SupabaseClient;
};

export default function Navbar(): ReactElement {
  const supabase = createClientComponentClient<Database>();

  return (
    <Disclosure as="nav" className="sticky top-0 z-50 mb-5  border-b bg-white">
      {({ open }: { open: boolean }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-lime-500 hover:text-lime-500">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link href="/">
                    <Logo />
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex gap-2">
                    <NavigationMenu supabase={supabase} />
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center gap-2 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <LanguageSelector />
              </div>
            </div>
          </div>
          <Disclosure.Panel className="border-b bg-white  p-5 sm:hidden">
            <div className="flex flex-wrap gap-2">
              <NavigationMenu supabase={supabase} />
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

const Logo = (): ReactElement => {
  return (
    <Heading as="h1" weight={"bold"}>
      <span className="block text-lime-400 sm:hidden">MyD</span>
      <span className="hidden text-lime-400  sm:block ">MyDealership</span>
    </Heading>
  );
};

const NavigationMenu = ({ supabase }: SupabaseClientProps): ReactElement => {
  const t = useTranslations("navbar");
  const user = useUserSessionStore((state) => state.user);

  if (user) {
    return (
      <>
        <MenuButton style="soft" link="/" title={t("menu.home")} />
        <MenuButton style="soft" link="/cars" title={t("menu.cars")} />
        <ProfileButton supabase={supabase} />
      </>
    );
  } else {
    return (
      <>
        <MenuButton style="soft" link="/" title={t("menu.home")} />
        <MenuButton style="soft" link="/login" title={t("menu.login")} />
        <MenuButton link="/register" title={t("menu.signup")} />
      </>
    );
  }
};

type MenuButtonProps = {
  link: string;
  style?: "outline" | "classic" | "solid" | "soft" | "surface" | "ghost";
  title: string;
};

const MenuButton = ({ link, style, title }: MenuButtonProps): ReactElement => {
  return (
    <Button variant={style} asChild>
      <Link href={link}>{title}</Link>
    </Button>
  );
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
        <MenuButton link={"/profile"} style={"ghost"} title={"Info"} />
        <LogoutButton supabase={supabase} />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

const LogoutButton = ({ supabase }: SupabaseClientProps): ReactElement => {
  const t = useTranslations("navbar");
  const router = useRouter();
  const setUser = useUserSessionStore((state) => state.setUser);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log(error);
    }

    setUser(null);
    router.refresh();
  };

  return (
    <DropdownMenu.Item color="red" onClick={() => signOut()}>
      {t("menu.user.logout")}
    </DropdownMenu.Item>
  );
};
