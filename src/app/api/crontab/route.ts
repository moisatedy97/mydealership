import { mailTransporter } from "@/mailer";

export async function GET() {
  const isEmailActive: string | undefined = process.env.NEXT_EMAIL;

  if (isEmailActive && isEmailActive === "true") {
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

  return new Response("Wrong body", { status: 400 });
}
