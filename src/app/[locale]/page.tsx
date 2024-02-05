import { getTranslations } from "next-intl/server";
import { QueryData, QueryError } from "@supabase/supabase-js";
import supabaseServer from "@/supabase/config";
import Hero from "../components/hero";
import Main from "../components/main";

export default async function Index() {
  const t = await getTranslations("index");

  const query = supabaseServer().from("Car").select("*");
  const { data, error }: { data: QueryData<typeof query> | null; error: QueryError | null } = await query;

  if (error) {
    throw error;
  }

  if (data) {
    return (
      <>
        <Hero />
        <Main />
      </>
    );
  }
}
