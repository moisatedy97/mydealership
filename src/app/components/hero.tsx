import { AspectRatio } from "@radix-ui/themes";
import React from "react";

export default function Hero() {
  return (
    <AspectRatio ratio={16 / 8}>
      <img
        src="https://www.bmw.it/content/dam/bmw/common/all-models/m-series/m3-sedan/2023/highlights/bmw-3-series-cs-m-automobiles-sp-desktop.jpg"
        alt="A house in a forest"
        style={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
          borderRadius: "var(--radius-2)",
        }}
      />
    </AspectRatio>
  );
}
