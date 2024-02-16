"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Heading, Text } from "@radix-ui/themes";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AuthResponse } from "@supabase/supabase-js";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { AuthActionEnum } from "@/utils/enums";
import { authFormSchema, AuthFormType } from "@/interfaces/auth-interface";
import { useUserSessionStore } from "@/stores/session-store";
import { Database } from "../../../../../types/supabase";
import Form from "./form";

export default function RegisterForm(): ReactElement {
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
  const setIsLogged = useUserSessionStore((state) => state.setIsLogged);
  const [isEmailSent, setIsEmailSent] = useState<boolean>();
  const [isUserExist, setIsUserExist] = useState<boolean>();

  const onSubmit: SubmitHandler<AuthFormType> = async (values: z.infer<typeof authFormSchema>) => {
    const authCredentials: AuthFormType = { email: values.email, password: values.password };
    const register = await onSubmitRegister(authCredentials);
    const { error } = register;
    const isEmailAlreadyRegistered: boolean = register.data.user?.identities?.length === 0;
    const isEmailConfirmed: boolean =
      register.data.user?.identities?.length && register?.data?.user?.identities[0]?.identity_data?.email_verified;

    if (error) {
      setFormAuthError(error.message);
    } else {
      if (isEmailAlreadyRegistered) {
        setIsUserExist(true);
        setIsEmailSent(false);
      } else if (isEmailConfirmed === false) {
        setIsUserExist(false);
        setIsEmailSent(true);
      }
    }
  };

  const onSubmitRegister = async (authCredentials: AuthFormType): Promise<AuthResponse> => {
    return await supabase.auth.signUp(authCredentials);
  };

  return (
    <div className="flex flex-col gap-2">
      <Heading size="6" as="h1">
        {t("register")}
      </Heading>
      <Text color="gray">{t("sentence")}</Text>
      <Form
        submitFunction={handleSubmit(onSubmit)}
        emailFiled={{ ...register("email") }}
        passwordField={{ ...register("password") }}
        errors={errors}
        formTypeName={t("register")}
      />
      {isUserExist && (
        <span className="text-xs text-red-500">Lo utente esiste gia, se non ricordi la password boh</span>
      )}
      {isEmailSent && (
        <span className="text-xs text-red-500">
          Abbiamo inviato una email al tuo inidirizzo id posta, verifica lo spam
        </span>
      )}
    </div>
  );
}
