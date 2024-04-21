import React, { ReactElement } from "react";
import { Button, Card, Heading } from "@radix-ui/themes";
import { Minus } from "lucide-react";
import { useTranslations } from "next-intl";
import Filters from "./filters";
import CarsResult from "./cars";

export default function Cars(): ReactElement {
  const t = useTranslations("cars");

  return (
    <div className="gap-4 md:flex">
      <div className="md:w-1/4">
        <Card>
          <div className="flex">
            <Heading size="6" as="h1" className="mb-3">
              {t("filters")}
            </Heading>
            <Button className="ml-auto rounded-full">
              <Minus className="h-4 w-4" />
            </Button>
          </div>
          <Filters />
        </Card>
      </div>
      <div className="md:w-3/4">
        <Card>
          <Heading size="6" as="h1" className="mb-3">
            {t("car")}
          </Heading>
          {t("filter_car")}
        </Card>
        <CarsResult />
      </div>
    </div>
  );
}
