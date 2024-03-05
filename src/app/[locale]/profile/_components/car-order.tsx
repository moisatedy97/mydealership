import React, { ReactElement, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { QueryData, QueryError } from "@supabase/supabase-js";
import { Tables } from "../../../../../types/database.types";
import { Database } from "../../../../../types/supabase";

type CarOrderProps = {
  carOrder: Tables<"CarOrder">;
};

export default function CarOrder({ carOrder }: CarOrderProps): ReactElement | undefined {
  const supabase = createClientComponentClient<Database>();
  const [car, setCar] = useState<Tables<"Car"> | null>(null);

  const getCar = async () => {
    const query = supabase.from("Car").select("*").eq("carId", carOrder.carId);
    const { data, error }: { data: QueryData<typeof query> | null; error: QueryError | null } = await query;

    //TODO: handle error
    if (error) {
      console.error(error);
    }

    if (data && data.length > 0) {
      setCar(data[0]);
    }
  };

  useEffect(() => {
    getCar();
  }, []);

  if (car) {
    return (
      <div>
        <h3>{car.title}</h3>
        <p>{carOrder.plan}</p>
        <p>{carOrder.price}</p>
        <h3>{carOrder.status}</h3>
      </div>
    );
  }
}
