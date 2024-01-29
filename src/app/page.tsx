import supabaseServer from "@/supabase/config";
import { QueryData, QueryError } from "@supabase/supabase-js";
import Image from "next/image";
import { ReactElement } from "react";

export default async function Home(): Promise<ReactElement | undefined> {
  const query = supabaseServer().from("Car").select("*");
  const { data, error }: { data: QueryData<typeof query> | null; error: QueryError | null } = await query;

  if (error) {
    throw error;
  }

  if (data) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {data.map((car, index) => {
          return (
            <div key={index}>
              <p>{car.cardId}</p>
              <p>{car.model}</p>
              <p>{car.horsepower}</p>
              <p>{car.engineType}</p>
              <p>{car.fuelType}</p>
              <div className="flex flex-col">
                {car.images.map((image, index) => {
                  return (
                    <div key={index} className="relative h-48 w-96">
                      <Image priority={true} fill={true} src={image} alt={car.model} />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </main>
    );
  }
}
