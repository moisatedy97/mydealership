import { useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { usePathname, useRouter } from "../../../navigation";
import Link from "next/link";

export default async function Index() {
  const t = await getTranslations("index");

  return (
    <>
      <h1>Homepage</h1>
      <br />
      <p>{t("title")}</p>
      <br />
      <button>
        <Link href="/it">metti italiano</Link>
      </button>
      <br />
      <button>
        <Link href="/en">metti inglese</Link>
      </button>
    </>
  );
}
