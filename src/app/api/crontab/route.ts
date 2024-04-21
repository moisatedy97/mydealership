import { QueryData, QueryError } from "@supabase/supabase-js";
import { mailTransporter } from "@/mailer";
import supabaseServer from "@/supabase/config";

export async function GET() {
  const isEmailActive: string | undefined = process.env.NEXT_EMAIL;

  if (isEmailActive && isEmailActive === "true") {
    const query = supabaseServer().from("Car").select("*");
    const { data, error }: { data: QueryData<typeof query> | null; error: QueryError | null } = await query;

    if (error) {
      throw error;
    }

    if (data && data[0].carId > 0) {
      try {
        await mailTransporter.sendMail({
          to: process.env.NEXT_EMAIL_TO,
          subject: "My Dealership website reset",
          text: "Supabase request was sent. Supabase was restarted.",
        });

        return new Response("Email sent", { status: 200 });
      } catch (error) {
        return new Response("Send email error", { status: 400 });
      }
    }
  }

  return new Response("Wrong body", { status: 400 });
}
