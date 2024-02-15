"use client";
import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";
import { ChevronsUp, ListChecks, Shield } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { ReactElement } from "react";

const HeroCards = (): ReactElement => {
  const t = useTranslations("index.cardSection");
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <CardFeature icon={<ChevronsUp />} title={t("1.title")} subtitle={t("1.subtitle")} />
      <CardFeature icon={<ListChecks />} title={t("2.title")} subtitle={t("2.subtitle")} />
      <CardFeature icon={<Shield />} title={t("3.title")} subtitle={t("3.subtitle")} />
    </div>
  );
};

export default HeroCards;

type CardFeatureProps = {
  icon: NonNullable<React.ReactNode>;
  title: string;
  subtitle: string;
};

const CardFeature = ({ icon, title, subtitle }: CardFeatureProps): ReactElement => {
  return (
    <Card size="3" className="flex-auto">
      <Flex gap="3" align="center">
        <Avatar size="3" radius="full" fallback={icon} color="lime" />
        <Box>
          <Text as="div" size="4" weight="bold">
            {title}
          </Text>
          <Text as="div" size="2" color="gray">
            {subtitle}
          </Text>
        </Box>
      </Flex>
    </Card>
  );
};
