import { QueryData, QueryError } from "@supabase/supabase-js";
import React, { ReactElement } from "react";
import supabaseServer from "@/supabase/config";
import CategorySelect from "./category-select";

export default async function CategoryFilter(): Promise<ReactElement | undefined> {
  const query = supabaseServer().from("Category").select("*").order("name", { ascending: true });
  const { data, error }: { data: QueryData<typeof query> | null; error: QueryError | null } = await query;

  if (error) {
    console.error(error);
  }

  if (data) {
    return <CategorySelect categories={data} />;
  }
}
