"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Heading, Text } from "@radix-ui/themes";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AuthTokenResponsePassword } from "@supabase/supabase-js";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormType>({ resolver: zodResolver(authFormSchema) });
  const [formAuthError, setFormAuthError] = useState<string>();
  const setIsLogged = useUserSessionStore((state) => state.setIsLogged);

  const onSubmit: SubmitHandler<AuthFormType> = async (values: z.infer<typeof authFormSchema>) => {
    const authCredentials: AuthFormType = { email: values.email, password: values.password };
    const login = await onSubmitLogin(authCredentials);
    const { error } = login;

    if (error) {
      setFormAuthError(error.message);
    } else {
      setIsLogged(true);
      router.push("/");
      router.refresh();
    }
  };

  const onSubmitLogin = async (authCredentials: AuthFormType): Promise<AuthTokenResponsePassword> => {
    return await supabase.auth.signInWithPassword(authCredentials);
  };

  return (
    <div className="flex flex-col gap-2">
      <Heading size="6" as="h1">
        {t("title")}
      </Heading>
      <Text color="gray">{t("sentence")}</Text>
      <Form
        submitFunction={handleSubmit(onSubmit)}
        emailFiled={{ ...register("email") }}
        passwordField={{ ...register("password") }}
        errors={errors}
        formTypeName={t("title")}
      />
      {formAuthError && <ErrorMessage errorValue={formAuthError} />}
      <AuthProvider />
    </div>
  );
}
