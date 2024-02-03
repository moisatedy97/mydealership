import { getTranslations } from "next-intl/server";
import Link from "next/link";
import supabaseServer from "@/supabase/config";
import { QueryData, QueryError } from "@supabase/supabase-js";
import Image from "next/image";

export default async function Index() {
  const t = await getTranslations("index");

  const query = supabaseServer().from("Car").select("*");
  const { data, error }: { data: QueryData<typeof query> | null; error: QueryError | null } = await query;

  if (error) {
    throw error;
  }

  if (data) {
    return (
      <>
        <button
          type="button"
          className="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        >
          Solid
        </button>
        <h1 style={{ fontSize: "40px" }}>Homepage</h1>
        <br />
        <p style={{ fontSize: "40px" }}>{t("title")}</p>
        <br />
        <button>
          <Link href="/it">traduci in italiano</Link>
        </button>
        <br />
        <br />
        <button>
          <Link href="/en">traduci in inglese</Link>
        </button>

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
                  {car.images.map((image: any, index: any) => {
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
      </>
    );
  }
}
