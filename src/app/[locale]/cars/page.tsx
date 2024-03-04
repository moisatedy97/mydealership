import React, { ReactElement } from "react";
import { Button, Card, Heading } from "@radix-ui/themes";
import { Minus } from "lucide-react";
import Filters from "./filters";
import CarsResult from "./cars";

export default function Cars(): ReactElement {
  return (
    <div className="gap-4 md:flex">
      <div className="md:w-1/4">
        <Card>
          <div className="flex">
            <Heading size="6" as="h1" className="mb-3">
              Filters
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
            Car
          </Heading>
          Filter your car and see the result
        </Card>
        <CarsResult />
      </div>
    </div>
  );
}
