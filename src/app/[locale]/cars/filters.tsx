import { QueryData, QueryError } from "@supabase/supabase-js";
import React, { ReactElement } from "react";
import supabaseServer from "@/supabase/config";

export default async function Filters(): Promise<ReactElement | undefined> {
  const query = supabaseServer().from("Car").select("*");
  const { data, error }: { data: QueryData<typeof query> | null; error: QueryError | null } = await query;

  if (error) {
    throw error;
  }

  if (data) {
    return <div></div>;
  }
}
