import React, { ReactElement } from "react";
import { redirect } from "next/navigation";
import { AuthError, Session } from "@supabase/supabase-js";
import supabaseServer from "@/supabase/config";
import AuthForm from "./_components/auth-form";

export default async function page(): Promise<ReactElement | undefined> {
  const { data, error }: { data: { session: Session | null }; error: AuthError | null } =
    await supabaseServer().auth.getSession();

  if (error) {
    throw error;
  }

  if (data.session) {
    redirect("/");
  } else {
    return (
      <main>
        <AuthForm />
      </main>
    );
  }
}
