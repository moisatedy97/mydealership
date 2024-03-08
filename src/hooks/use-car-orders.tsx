import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { QueryData, QueryError } from "@supabase/supabase-js";
import { useUserSessionStore } from "@/stores/session-store";
import { Tables } from "../../types/database.types";
import { Database } from "../../types/supabase";

export default function useCarOrders(carId?: number) {
  const supabase = createClientComponentClient<Database>();
  const user = useUserSessionStore((state) => state.user);
  const [carOrders, setCarOrders] = useState<Tables<"CarOrder">[]>([]);

  useEffect(() => {
    getCarOrders();
  }, [user]);

  const getCarOrders = async () => {
    if (user) {
      let query = supabase.from("CarOrder").select("*").eq("userId", user.id);
      if (carId) {
        query = query.eq("carId", carId);
      }

      const { data, error }: { data: QueryData<typeof query> | null; error: QueryError | null } = await query;

      //TODO: handle error
      if (error) {
        console.log(error);
      }

      if (data && data.length > 0) {
        setCarOrders(data);
      }
    }
  };

  return carOrders;
}
