import { NextRequest } from "next/server";
import { createMiddlewareClient, Session } from "@supabase/auth-helpers-nextjs";
import createIntlMiddleware from "next-intl/middleware";
import { AuthError } from "@supabase/supabase-js";
import { Database } from "../types/supabase";

export default async function middleware(req: NextRequest) {
  const handleI18nRouting = createIntlMiddleware({
    locales: ["en", "it"],
    localePrefix: "never",
    defaultLocale: "en",
  });
  const res = handleI18nRouting(req);

  const supabase = createMiddlewareClient<Database>({ req, res });
  const { error }: { data: { session: Session | null }; error: AuthError | null } = await supabase.auth.getSession();

  if (error) {
    throw error;
  }

  return res;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
