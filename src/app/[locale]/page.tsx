import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { AuthError, Session } from "@supabase/supabase-js";
import supabaseServer from "@/supabase/config";

export default async function Index() {
  const t = await getTranslations("index");

  const { data, error }: { data: { session: Session | null }; error: AuthError | null } =
    await supabaseServer().auth.getSession();

  if (error) {
    throw error;
  }

  if (data.session) {
    return (
      <>
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

        {/* <main className="flex min-h-screen flex-col items-center justify-between p-24">
          {data.map((car, index) => {
            return (
              <div key={index}>
                <p>{car.carId}</p>
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
        </main> */}
      </>
    );
  }
}
