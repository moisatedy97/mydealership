"use client";

import { Card, Container, Tabs } from "@radix-ui/themes";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { ReactElement } from "react";
import { AuthActionEnum } from "@/utils/enums";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";

export default function AuthForm(): ReactElement {
  const t = useTranslations("login");
  const pathname = usePathname();
  const pathNameWithoutForwardSlash = pathname.slice(1);

  return (
    <Container className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-gradient-to-t from-lime-300 to-slate-50">
      <Card className="mx-auto w-full max-w-xs">
        <div className="flex flex-col gap-2">
          <Tabs.Root defaultValue={pathNameWithoutForwardSlash}>
            <Tabs.List>
              <Tabs.Trigger value={AuthActionEnum.LOGIN}>{t("title")}</Tabs.Trigger>
              <Tabs.Trigger value={AuthActionEnum.REGISTER}>{t("register")}</Tabs.Trigger>
            </Tabs.List>
            <div className="pb-2 pt-3">
              <Tabs.Content value={AuthActionEnum.LOGIN}>
                <LoginForm />
              </Tabs.Content>
              <Tabs.Content value={AuthActionEnum.REGISTER}>
                <RegisterForm />
              </Tabs.Content>
            </div>
          </Tabs.Root>
        </div>
      </Card>
    </Container>
  );
}
