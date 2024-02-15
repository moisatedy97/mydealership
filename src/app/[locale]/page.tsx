import { getTranslations } from "next-intl/server";

import Hero from "../components/hero";

export default async function Index() {
  const t = await getTranslations("index");

  return (
    <>
      <Hero />
    </>
  );
}
