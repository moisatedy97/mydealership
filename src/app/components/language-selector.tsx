"use client";
import { Select } from "@radix-ui/themes";
import { useLocale } from "next-intl";
import { ReactElement, useState } from "react";
import { usePathname, useRouter } from "../../navigation";

function LanguageSelector(): ReactElement {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const [language, setLanguage] = useState<string>(locale);

  const selectLanguage = (e: string) => {
    router.replace(pathname, { locale: e.valueOf() });
  };

  return (
    <Select.Root
      defaultValue="en"
      onValueChange={(e) => {
        selectLanguage(e);
      }}
      value={language}
    >
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          <Select.Item value="it">IT</Select.Item>
          <Select.Item value="en">EN</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

export default LanguageSelector;
