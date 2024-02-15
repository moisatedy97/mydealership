"use client";

import React, { ReactElement } from "react";
import { Box, Card, Flex, Text } from "@radix-ui/themes";
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
    <Card style={{ maxWidth: 240 }} onClick={handleCardClick}>
      <Flex gap="3" align="center">
        <Box>
          <Text as="div" size="2" weight="bold">
            {car.carId}
          </Text>
          <Text as="div" size="2" weight="bold">
            {car.manufacturerId}
          </Text>
          <Text as="div" size="2" color="gray">
            {car.modelId}
          </Text>
          ...
        </Box>
      </Flex>
    </Card>
  );
}
