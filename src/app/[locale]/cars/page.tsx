import React, { ReactElement } from "react";
import { Card } from "@radix-ui/themes";

export default function Cars(): ReactElement {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="">
        <Card>Filtri sec 1</Card>
      </div>
      <div className="">
        <Card>Filtri sec 2</Card>
      </div>
    </div>
  );
}
