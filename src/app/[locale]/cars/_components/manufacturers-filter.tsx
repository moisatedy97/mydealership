import { QueryData, QueryError } from "@supabase/supabase-js";
import React, { ReactElement } from "react";
import supabaseServer from "@/supabase/config";
import ManufacturersSelect from "./manufacturers-select";

export default async function ManufacturersFilter(): Promise<ReactElement | undefined> {
  const query = supabaseServer().from("Manufacturer").select("*").order("name", { ascending: true });
  const { data, error }: { data: QueryData<typeof query> | null; error: QueryError | null } = await query;

  if (error) {
    throw error;
  }

  if (data) {
    return <ManufacturersSelect manufacturers={data} />;
  }
}
