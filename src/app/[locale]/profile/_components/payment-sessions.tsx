"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { QueryData, QueryError } from "@supabase/supabase-js";
import React, { ReactElement, useEffect, useState } from "react";
import { Database } from "../../../../../types/supabase";
import { Tables } from "../../../../../types/database.types";
import CarOrder from "./car-order";

export default function PaymentSessions(): ReactElement {
  const supabase = createClientComponentClient<Database>();
  const [carOrders, setCarOrders] = useState<Tables<"CarOrder">[]>([]);

  const getCarOrders = async () => {
    const query = supabase.from("CarOrder").select("*");
    const { data, error }: { data: QueryData<typeof query> | null; error: QueryError | null } = await query;

    //TODO: handle error
    if (error) {
      console.log(error);
    }

    if (data && data.length > 0) {
      setCarOrders(data);
    }
  };

  useEffect(() => {
    getCarOrders();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {carOrders.map((carOrder, index) => {
        return <CarOrder key={index} carOrder={carOrder} />;
      })}
    </div>
  );
}
