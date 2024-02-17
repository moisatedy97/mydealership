"use client";

import { Heading, Text } from "@radix-ui/themes";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useTranslations } from "next-intl";
import { ReactElement, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { authFormSchema, AuthFormType } from "@/interfaces/auth-interface";
import { Database } from "../../../../../types/supabase";
import Form from "./form";
import ErrorMessage from "./error-message";

export default function RegisterForm(): ReactElement {
  const t = useTranslations("login");
  const supabase = createClientComponentClient<Database>();
  const [formAuthError, setFormAuthError] = useState<string>();
  const [isEmailSent, setIsEmailSent] = useState<boolean>();
  const [isUserExist, setIsUserExist] = useState<boolean>();

  const onSubmit: SubmitHandler<AuthFormType> = async (values: z.infer<typeof authFormSchema>) => {
    const authCredentials: AuthFormType = { email: values.email, password: values.password };
    const register = await supabase.auth.signUp(authCredentials);
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

  return (
    <div className="flex flex-col gap-2">
      <Heading size="6" as="h1">
        {t("register")}
      </Heading>
      <Text color="gray">{t("sentence")}</Text>
      <Form submitFunction={onSubmit} formTypeName={t("register")} />
      {isUserExist && <ErrorMessage errorValue={t("form.errors.userExist")} errorType="2" />}
      {isEmailSent && <ErrorMessage errorValue={t("form.errors.emailSent")} errorType="2" />}
    </div>
  );
}
