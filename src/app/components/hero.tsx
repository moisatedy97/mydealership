"use client";

import { Container, Heading, Text } from "@radix-ui/themes";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import HeroCards from "./hero-cards";
import SinglelineCarsFilter from "./singleline-cars-filters";

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
        <SinglelineCarsFilter />
        <Image
          src="https://www.apexspares.com/cdn/shop/collections/por3__67065_1200x1200.png?v=1639558726"
          alt="Porsche GT3"
          width="1080"
          height={"1080"}
        />
        {/* <Canvas dpr={[1, 2]} shadows camera={{ fov: 45 }} style={{ position: "relative", width: 700, height: 400 }}>
          <PresentationControls>
            <Stage environment={"warehouse"}>
              <Model scale={0.01} />
            </Stage>
          </PresentationControls>
        </Canvas> */}
        <HeroCards />
      </div>
    </Container>
  );
}

// function Model(scale: any) {
//   const { scene } = useGLTF("/audi5.glb");
//   return <primitive object={scene} {...scale} />;
// }
