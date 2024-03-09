import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { QueryData, QueryError } from "@supabase/supabase-js";
import { useUserSessionStore } from "@/stores/session-store";
import { Enums, Tables } from "../../types/database.types";
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
        setCarOrders(verifiedCarOrders(data));
      }
    }
  };

  return carOrders;
}

const verifiedCarOrders = (carOrders: Tables<"CarOrder">[]): Tables<"CarOrder">[] => {
  const carStatus: Enums<"car_order_status_type"> = "expired";

  const verifiedCarOrders = carOrders.map((carOrder: Tables<"CarOrder">) => {
    if (isCarOrderExpired(carOrder)) {
      updateCarOrder(carOrder);

      return { ...carOrder, status: carStatus };
    }
    return carOrder;
  });

  return verifiedCarOrders;
};

const isCarOrderExpired = (carOrder: Tables<"CarOrder">): boolean => {
  if (!carOrder.expiredAt) {
    return false;
  }
  return new Date(carOrder.expiredAt) < new Date();
};

const updateCarOrder = async (carOrder: Tables<"CarOrder">): Promise<Tables<"CarOrder">[] | null> => {
  const supabase = createClientComponentClient<Database>();
  const query = supabase
    .from("CarOrder")
    .update({
      status: "expired",
    })
    .eq("carId", carOrder.carId)
    .eq("userId", carOrder.userId)
    .select();
  const { data, error }: { data: QueryData<typeof query> | null; error: QueryError | null } = await query;

  if (error) {
    console.log(error);
  }

  return data;
};
