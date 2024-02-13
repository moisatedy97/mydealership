"use client";
import { Button, DropdownMenu, Select } from "@radix-ui/themes";
import Link from "next/link";
import { ReactElement } from "react";

export default function Navbar(): ReactElement {
  type NavigationMenu = {
    name: string;
    href: string;
  };

  const navigation: NavigationMenu[] = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Login",
      href: "/login",
    },
  ];

  return (
    <nav className="sticky top-0 z-50 mb-5 flex h-16 items-center justify-center border-b border-lime-200 bg-white/80 backdrop-blur-sm">
      <div className="flex  items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-slate-100"></div>
        {navigation.map((item: NavigationMenu, index: number) => (
          <Button variant="soft" asChild key={index}>
            <Link href={item.href}>{item.name}</Link>
          </Button>
        ))}
        <ProfileButton />
        <LanguageSelector />
      </div>
    </nav>
  );
}

const ProfileButton = (): ReactElement => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="outline">Profile</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item shortcut="⌘ E">Edit</DropdownMenu.Item>
        <DropdownMenu.Item shortcut="⌘ D">Duplicate</DropdownMenu.Item>
        <DropdownMenu.Item shortcut="⌘ N">Archive</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item shortcut="⌘ ⌫" color="red">
          Delete
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

const LanguageSelector = (): ReactElement => {
  return (
    <Select.Root defaultValue="it">
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          <Select.Label>Languge</Select.Label>
          <Select.Item value="it">it</Select.Item>
          <Select.Item value="en">en</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};
