import { getTranslations } from "next-intl/server";

import { AuthError, Session } from "@supabase/supabase-js";
import supabaseServer from "@/supabase/config";
import Hero from "../components/hero";
import Main from "../components/main";

export default async function Index() {
  const t = await getTranslations("index");

  const { data, error }: { data: { session: Session | null }; error: AuthError | null } =
    await supabaseServer().auth.getSession();

  if (error) {
    throw error;
  }

  if (data.session) {
    return (
      <>
        <Hero />
        <Main />
      </>
    );
  }
}
