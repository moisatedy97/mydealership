"use client";

import React, { ReactElement } from "react";
import { Badge, Button, Card, Flex, Heading, Inset, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Tables } from "../../../../../types/database.types";

type CarCardProps = {
  car: Tables<"Car">;
};

export default function CarCard({ car }: CarCardProps): ReactElement {
  const t = useTranslations("cars");
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/car/${car.carId}`, { scroll: false });
  };

  return (
    <Card size="2">
      <Inset clip="padding-box" side="top" pb="current">
        <Image
          src={car.images[0] || "https://fakeimg.pl/600x400/f0f0f0/dbdbdb?text=Car+image+missing"}
          alt={`${car.carId}`}
          width={1080}
          height={1080}
          priority={true}
          className="h-auto w-full"
          id="carousel-selected-image"
          style={{
            display: "block",
            objectFit: "cover",
            width: "100%",
            height: 140,
            backgroundColor: "white",
          }}
        />
      </Inset>
      <div className="flex flex-col gap-2">
        <Heading size="2" as="h3" className="line-clamp-1">
          {car.title}
        </Heading>
        <Text size="2" color="gray" className="line-clamp-1">
          {car.description}
        </Text>
        <Flex gap="2">
          <b>
            {car.price.toLocaleString("it-IT", {
              style: "currency",
              currency: "EUR",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </b>
          <Badge color={car.year > 2019 ? "green" : "blue"} className="ml-auto">
            {car.year}
          </Badge>
        </Flex>
        <Button size="2" variant="surface" onClick={handleCardClick} className="cursor-pointer">
          {t("view_details")}
        </Button>
      </div>
    </Card>
  );
}
