"use client";

import { Heading, Text } from "@radix-ui/themes";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { ReactElement, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { authFormSchema, AuthFormType } from "@/interfaces/auth-interface";
import { useUserSessionStore } from "@/stores/session-store";
import { Database } from "../../../../../types/supabase";
import AuthProvider from "./auth-provider";
import ErrorMessage from "./error-message";
import Form from "./form";

export default function LoginForm(): ReactElement {
  const t = useTranslations("login");
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const [formAuthError, setFormAuthError] = useState<string>();
  const setIsLogged = useUserSessionStore((state) => state.setIsLogged);

  const onSubmit: SubmitHandler<AuthFormType> = async (values: z.infer<typeof authFormSchema>) => {
    const authCredentials: AuthFormType = { email: values.email, password: values.password };
    const login = await supabase.auth.signInWithPassword(authCredentials);
    const { error } = login;

    if (error) {
      setFormAuthError(error.message);
    } else {
      setIsLogged(true);
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Heading size="6" as="h1">
        {t("title")}
      </Heading>
      <Text color="gray">{t("sentence")}</Text>
      <Form submitFunction={onSubmit} formTypeName={t("title")} />
      <AuthProvider />
      {formAuthError && <ErrorMessage errorValue={formAuthError} errorType="2" />}
    </div>
  );
}
