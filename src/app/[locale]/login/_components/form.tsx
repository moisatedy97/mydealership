import { Button, Text, TextField } from "@radix-ui/themes";
import React from "react";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authFormSchema, AuthFormType } from "@/interfaces/auth-interface";
import ErrorMessage from "./error-message";

type FormProps = {
  submitFunction: SubmitHandler<AuthFormType>;
  formTypeName: string;
};

const Form = ({ submitFunction, formTypeName }: FormProps) => {
  const t = useTranslations("login");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormType>({ resolver: zodResolver(authFormSchema) });

  return (
    <form onSubmit={handleSubmit(submitFunction)}>
      <div>
        <Text as="label" size="1" weight={"medium"}>
          {t("form.email.label")}
        </Text>
        {errors.email && <ErrorMessage errorValue={errors.email.message} errorType="1" />}
        <TextField.Input placeholder={t("form.email.placeholder")} {...register("email")} required type="email" />
      </div>
      <div>
        <Text as="label" size="1" weight={"medium"}>
          {t("form.password.label")}
        </Text>
        {errors.password && <ErrorMessage errorValue={errors.password.message} errorType="1" />}
        <TextField.Input
          placeholder={t("form.password.placeholder")}
          {...register("password")}
          required
          type="password"
        />
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <Button
          variant="solid"
          className="w-full cursor-pointer bg-lime-300"
          type="submit"
          disabled={!!errors.password || !!errors.email}
        >
          {formTypeName}
        </Button>
      </div>
    </form>
  );
};

export default Form;
