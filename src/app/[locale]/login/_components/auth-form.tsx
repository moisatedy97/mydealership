"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Container, Heading, Text, TextField } from "@radix-ui/themes";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AuthResponse, AuthTokenResponsePassword } from "@supabase/supabase-js";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { AuthActionEnum } from "@/utils/enums";
import { authFormSchema, AuthFormType } from "@/interfaces/auth-interface";
import { Database } from "../../../../../types/supabase";
import AuthProvider from "./auth-provider";

export default function AuthForm(): ReactElement {
  const t = useTranslations("login");
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormType>({ resolver: zodResolver(authFormSchema) });
  const [authAction, setAuthAction] = useState<AuthActionEnum>(AuthActionEnum.LOGIN);
  const [formAuthError, setFormAuthError] = useState<string>();

  const onSubmit: SubmitHandler<AuthFormType> = async (values: z.infer<typeof authFormSchema>) => {
    const authCredentials: AuthFormType = { email: values.email, password: values.password };
    const { error } =
      authAction === AuthActionEnum.LOGIN
        ? await onSubmitLogin(authCredentials)
        : await onSubmitRegister(authCredentials);

    if (error) {
      setFormAuthError(error.message);
    } else {
      router.push("/");
      router.refresh();
    }
  };

  const onSubmitLogin = async (authCredentials: AuthFormType): Promise<AuthTokenResponsePassword> => {
    console.log("login");

    return await supabase.auth.signInWithPassword(authCredentials);
  };

  const onSubmitRegister = async (authCredentials: AuthFormType): Promise<AuthResponse> => {
    console.log("register");
    const data = await supabase.auth.signUp(authCredentials);
    return data;
  };

  return (
    <Container className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-gradient-to-t from-lime-300 to-slate-50">
      <Card className="mx-auto w-full max-w-xs">
        <div className="flex flex-col gap-2">
          <Heading size="6" as="h1">
            {t("title")}
          </Heading>
          <Text color="gray">{t("sentence")}</Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Text as="label" size="1" weight={"medium"}>
                {t("form.email.label")}
              </Text>
              {errors.email && <span className="text-right text-xs text-red-500"> {errors.email.message}</span>}
              <TextField.Input placeholder={t("form.email.placeholder")} required {...register("email")} type="email" />
            </div>
            <div>
              <Text as="label" size="1" weight={"medium"}>
                {t("form.password.label")}
              </Text>
              {errors.password && <span className="text-xs text-red-500"> {errors.password.message}</span>}
              <TextField.Input
                placeholder={t("form.password.placeholder")}
                required
                {...register("password")}
                type="password"
              />
            </div>
            {formAuthError && <span className="text-xs text-red-500">{formAuthError}</span>}
            <div className="mt-4 flex flex-col gap-2">
              <Button
                variant="solid"
                className="w-full cursor-pointer"
                onClick={() => setAuthAction(AuthActionEnum.LOGIN)}
                disabled={!!errors.password || !!errors.email}
              >
                {t("title")}
              </Button>
              <Button
                variant="soft"
                className="w-full  cursor-pointer"
                onClick={() => setAuthAction(AuthActionEnum.REGISTER)}
              >
                {t("register")}
              </Button>
              <AuthProvider />
            </div>
          </form>
        </div>
      </Card>
    </Container>
  );
}
