import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { QueryData, QueryError } from "@supabase/supabase-js";
import { Tables } from "../../types/database.types";
import { Database } from "../../types/supabase";

export const supabaseFn = {
  carOrder: {
    get: async (carId?: number, userId?: string) => {
      const supabase = createClientComponentClient<Database>();
      let query = supabase.from("CarOrder").select("*");

      if (userId) {
        query = query.eq("userId", userId);
      }
      if (carId) {
        query = query.eq("carId", carId);
      }

      const { data, error }: { data: QueryData<typeof query> | null; error: QueryError | null } = await query;

      if (error) {
        console.log(error);
      }

      return data;
    },
    create: async (newCarOrder: { carId: number; userId: string; price: number } & Partial<Tables<"CarOrder">>) => {
      const supabase = createClientComponentClient<Database>();
      const query = supabase.from("CarOrder").insert(newCarOrder).select();
      const { data, error }: { data: QueryData<typeof query> | null; error: QueryError | null } = await query;

      if (error) {
        console.log(error);
      }

      return data;
    },
    update: async (newCarOrder: Partial<Tables<"CarOrder">>, carId: number, userId: string) => {
      const supabase = createClientComponentClient<Database>();
      const query = supabase.from("CarOrder").update(newCarOrder).eq("carId", carId).eq("userId", userId).select();
      const { data, error }: { data: QueryData<typeof query> | null; error: QueryError | null } = await query;

      if (error) {
        console.log(error);
      }

      return data;
    },
    updateBySessionId: async (newCarOrder: Partial<Tables<"CarOrder">>, sessionId: string) => {
      const supabase = createClientComponentClient<Database>();
      const query = supabase.from("CarOrder").update(newCarOrder).eq("sessionId", sessionId).select();
      const { error }: { error: QueryError | null } = await query;

      return error;
    },
  },
  payment: {
    create: async (
      newPayment: { carId: number; userId: string; amount: number; updatedAt: string } & Partial<Tables<"Payment">>,
    ) => {
      const supabase = createClientComponentClient<Database>();
      const query = supabase.from("Payment").insert(newPayment).select();
      const { data, error }: { data: QueryData<typeof query> | null; error: QueryError | null } = await query;

      if (error) {
        console.log(error);
      }

      return data;
    },
    update: async (newPayment: Partial<Tables<"Payment">>, carId: number, userId: string, sessionId: string) => {
      const supabase = createClientComponentClient<Database>();
      const query = supabase
        .from("Payment")
        .update(newPayment)
        .eq("carId", carId)
        .eq("userId", userId)
        .eq("sessionId", sessionId)
        .select();
      const { data, error }: { data: QueryData<typeof query> | null; error: QueryError | null } = await query;

      if (error) {
        console.log(error);
      }

      return data;
    },
    updateBySessionId: async (newPayment: Partial<Tables<"Payment">>, sessionId: string) => {
      const supabase = createClientComponentClient<Database>();
      const query = supabase.from("Payment").update(newPayment).eq("sessionId", sessionId).select();
      const { error }: { error: QueryError | null } = await query;

      return error;
    },
  },
};
