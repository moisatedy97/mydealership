import { Button, Text, TextField } from "@radix-ui/themes";
import React from "react";
import { useTranslations } from "next-intl";
import ErrorMessage from "./error-message";

type FormProps = {
  submitFunction: any;
  emailFiled?: any;
  passwordField?: any;
  errors?: any;
  formTypeName: string;
};

const Form = ({ submitFunction, emailFiled, passwordField, errors, formTypeName }: FormProps) => {
  const t = useTranslations("login");

  return (
    <form onSubmit={submitFunction}>
      <div>
        <Text as="label" size="1" weight={"medium"}>
          {t("form.email.label")}
        </Text>
        {errors.email && <ErrorMessage errorValue={errors.email.message} />}
        <TextField.Input placeholder={t("form.email.placeholder")} {...emailFiled} required type="email" />
      </div>
      <div>
        <Text as="label" size="1" weight={"medium"}>
          {t("form.password.label")}
        </Text>
        {errors.password && <ErrorMessage errorValue={errors.password.message} />}
        <TextField.Input placeholder={t("form.password.placeholder")} {...passwordField} required type="password" />
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
