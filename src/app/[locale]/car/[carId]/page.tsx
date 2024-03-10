import { QueryData, QueryError } from "@supabase/supabase-js";
import { ReactElement } from "react";
import { Text } from "@radix-ui/themes";
import supabaseServer from "@/supabase/config";
import PaymentPlansWrapper from "./_components/payment-plans-wrapper";
import CarDetail from "./_components/car-detail";

export default async function CarDetails({ params }: { params: { carId: string } }): Promise<ReactElement | undefined> {
  const query = supabaseServer().from("Car").select("*").eq("carId", Number(params.carId));
  const { data, error }: { data: QueryData<typeof query> | null; error: QueryError | null } = await query;

  if (error) {
    console.log(error);
  }

  if (data && data.length > 0) {
    const car = data[0];

    return (
      <div>
        <CarDetail data={car} />
        <PaymentPlansWrapper car={car} />
      </div>
    );
  } else {
    return <Text>Car not found</Text>;
  }
}
