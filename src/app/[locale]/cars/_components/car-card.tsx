"use client";

import React, { ReactElement } from "react";
import { Card, Heading, Inset, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { Tables } from "../../../../../types/database.types";

type CarCardProps = {
  car: Tables<"Car">;
};

export default function CarCard({ car }: CarCardProps): ReactElement {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/car/${car.carId}`, { scroll: false });
  };

  return (
    <Card size="2" onClick={handleCardClick} className="cursor-pointer">
      <Inset clip="padding-box" side="top" pb="current">
        <img
          src="https://manxmotortrader.com/wp-content/themes/kensington/img/placeholder.jpg"
          alt="Bold typography"
          style={{
            display: "block",
            objectFit: "cover",
            width: "100%",
            height: 140,
            backgroundColor: "var(--gray-5)",
          }}
        />
      </Inset>
      <Heading size="4" as="h3">
        {car.transmissionType}
      </Heading>
      <Text as="p" size="3">
        {car.modelId}
      </Text>
    </Card>
  );
}
