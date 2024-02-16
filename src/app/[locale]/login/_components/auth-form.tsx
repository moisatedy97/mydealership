"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Container, Tabs } from "@radix-ui/themes";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AuthResponse, AuthTokenResponsePassword } from "@supabase/supabase-js";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { AuthActionEnum } from "@/utils/enums";
import { authFormSchema, AuthFormType } from "@/interfaces/auth-interface";
import { useUserSessionStore } from "@/stores/session-store";
import { Database } from "../../../../../types/supabase";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";

export default function AuthForm(): ReactElement {
  const t = useTranslations("login");
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const pathname = usePathname();
  const pathNameWithoutForwardSlash = pathname.slice(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormType>({ resolver: zodResolver(authFormSchema) });
  const [authAction, setAuthAction] = useState<AuthActionEnum>(AuthActionEnum.LOGIN);
  const [formAuthError, setFormAuthError] = useState<string>();
  const setIsLogged = useUserSessionStore((state) => state.setIsLogged);

  const onSubmit: SubmitHandler<AuthFormType> = async (values: z.infer<typeof authFormSchema>) => {
    const authCredentials: AuthFormType = { email: values.email, password: values.password };
    const login = await onSubmitLogin(authCredentials);
    const register = await onSubmitRegister(authCredentials);
    const { error } = authAction === AuthActionEnum.LOGIN ? login : register;
    const isEmailAlreadyRegistered: boolean = register.data.user?.identities?.length === 0;
    const isEmailConfirmed: boolean =
      register.data.user?.identities?.length && register?.data?.user?.identities[0]?.identity_data?.email_verified;

    if (error) {
      setFormAuthError(error.message);
    } else {
      if (login.data.user) {
        setIsLogged(true);
        router.push("/");
        router.refresh();
      } else {
        if (!isEmailConfirmed) {
          console.log("email da confermare", isEmailConfirmed);
        } else if (isEmailAlreadyRegistered) {
          console.log("email gia registrata", isEmailAlreadyRegistered);
        }
      }
    }
  };

  const onSubmitLogin = async (authCredentials: AuthFormType): Promise<AuthTokenResponsePassword> => {
    return await supabase.auth.signInWithPassword(authCredentials);
  };

  const onSubmitRegister = async (authCredentials: AuthFormType): Promise<AuthResponse> => {
    return await supabase.auth.signUp(authCredentials);
  };

  return (
    <Container className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-gradient-to-t from-lime-300 to-slate-50">
      <Card className="mx-auto w-full max-w-xs">
        <div className="flex flex-col gap-2">
          <Tabs.Root defaultValue={pathNameWithoutForwardSlash}>
            <Tabs.List>
              <Tabs.Trigger value="login">{t("title")}</Tabs.Trigger>
              <Tabs.Trigger value="register">{t("register")}</Tabs.Trigger>
            </Tabs.List>
            <div className="pb-2 pt-3">
              <Tabs.Content value="login">
                <LoginForm />
              </Tabs.Content>
              <Tabs.Content value="register">
                <RegisterForm />
              </Tabs.Content>
            </div>
          </Tabs.Root>
        </div>
      </Card>
    </Container>
  );
}
