import { QueryData, QueryError } from "@supabase/supabase-js";
import React, { ReactElement } from "react";
import supabaseServer from "@/supabase/config";
import CarDetail from "./_components/car-detail";

export default async function CarDetails({ params }: { params: { carId: string } }): Promise<ReactElement | undefined> {
  const query = supabaseServer().from("Car").select("*").eq("carId", Number(params.carId));
  const { data, error }: { data: QueryData<typeof query> | null; error: QueryError | null } = await query;

  //TODO handle error
  if (error) {
    throw error;
  }

  if (data && data.length > 0) {
    const activeData = data[0];
    return <CarDetail data={activeData} />;
  } else {
    return <div>Car not found</div>;
  }
}
