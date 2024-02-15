"use client";
import { Container, Heading, Text, TextField } from "@radix-ui/themes";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Search } from "lucide-react";
import React from "react";
import HeroCards from "./hero-cards";

export default function Hero() {
  const t = useTranslations("index");

  return (
    <Container className="mt-[80px] text-center">
      <div className="mx-auto flex max-w-3xl flex-col gap-5">
        <Heading size="9" as="h1">
          {t("title")}
        </Heading>
        <Text size="6" color="gray">
          {t("sentence")}
        </Text>
        <TextField.Root size={"3"}>
          <TextField.Slot>
            <Search height="16" width="16" />
          </TextField.Slot>
          <TextField.Input placeholder={t("searchButton")} />
        </TextField.Root>
        <Image
          src="https://www.apexspares.com/cdn/shop/collections/por3__67065_1200x1200.png?v=1639558726"
          alt="Porsche GT3"
          width="1080"
          height={"1080"}
        />
        <HeroCards />
      </div>
    </Container>
  );
}
