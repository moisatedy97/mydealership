"use client";

import { TextField } from "@radix-ui/themes";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { ReactElement } from "react";

export default function SinglelineCarsFilter(): ReactElement {
  const t = useTranslations("index");

  return (
    <div className="flex flex-col items-center">
      <form className="w-full">
        <TextField.Root size={"3"}>
          <TextField.Slot>
            <Search height="16" width="16" />
          </TextField.Slot>
          <TextField.Input placeholder={t("searchButton")} />
        </TextField.Root>
      </form>
    </div>
  );
}
