"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { ReactElement, useEffect, useState } from "react";
import { parseISO } from "date-fns";
import { QueryData, QueryError } from "@supabase/supabase-js";
import { useUserSessionStore } from "@/stores/session-store";
import { Database } from "../../../../../../types/supabase";
import { Tables } from "../../../../../../types/database.types";
import PaymentPlans from "./payment-plans";

export default function PaymentPlansWrapper(): ReactElement | undefined {
  const supabase = createClientComponentClient<Database>();
  const user = useUserSessionStore((state) => state.user);
  const [carOrder, setCarOrder] = useState<Tables<"CarOrder"> | null>(null);

  useEffect(() => {
    getCarOrder();
  }, [user]);

  const getCarOrder = async () => {
    if (user) {
      const query = supabase.from("CarOrder").select("*").eq("userId", user.id);
      const { data, error }: { data: QueryData<typeof query> | null; error: QueryError | null } = await query;

      //TODO: handle error
      if (error) {
        console.error(error);
      }

      if (data && data.length > 0) {
        setCarOrder(data[0]);
      }
    }
  };

  if (user) {
    if (carOrder) {
      if (carOrder.sessionId.length > 0 && parseISO(carOrder.expiredAt) > new Date()) {
        return (
          <div>
            You already have a car order for this car. Go in the proflie page to see the details and complete the
            payment.
          </div>
        );
      } else {
        return <PaymentPlans />;
      }
    } else {
      return <PaymentPlans />;
    }
  }
}
