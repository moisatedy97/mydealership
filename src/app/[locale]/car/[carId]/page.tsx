import { QueryData, QueryError } from "@supabase/supabase-js";
import React, { ReactElement } from "react";
import supabaseServer from "@/supabase/config";

export default async function CarDetails({ params }: { params: { carId: string } }): Promise<ReactElement | undefined> {
  const query = supabaseServer().from("Car").select("*").eq("carId", Number(params.carId));
  const { data, error }: { data: QueryData<typeof query> | null; error: QueryError | null } = await query;

  //TODO handle error
  if (error) {
    throw error;
  }

  if (data && data.length > 0) {
    return <pre>{JSON.stringify(data[0], null, 2)}</pre>;
  } else {
    return <div>Car not found</div>;
  }
}
