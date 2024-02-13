"use client";

import React, { ReactElement, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { AuthResponse, AuthTokenResponsePassword } from "@supabase/supabase-js";
import { Button, Card, Container, Heading, Text, TextField } from "@radix-ui/themes";
import { authFormSchema, AuthFormType } from "@/interfaces/auth-interface";
import { AuthActionEnum } from "@/utils/enums";
import { Database } from "../../../../../types/supabase";
import AuthProvider from "./auth-provider";

export default function AuthForm(): ReactElement {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormType>({ resolver: zodResolver(authFormSchema) });
  const [authAction, setAuthAction] = useState<AuthActionEnum>(AuthActionEnum.LOGIN);

  const onSubmit: SubmitHandler<AuthFormType> = async (values: z.infer<typeof authFormSchema>) => {
    const authCredentials: AuthFormType = { email: values.email, password: values.password };
    const { error } =
      authAction === AuthActionEnum.LOGIN
        ? await onSubmitLogin(authCredentials)
        : await onSubmitRegister(authCredentials);

    if (error) {
      router.push("/auth?message=Could not authenticate user");
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
    return await supabase.auth.signUp(authCredentials);
  };

  return (
    <Container className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-gradient-to-t from-lime-300 to-slate-50">
      <Card className="mx-auto  w-full max-w-xs">
        <div className="flex flex-col gap-2">
          <Heading size="6" as="h1">
            Login
          </Heading>
          <Text color="gray">Login to our platform</Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Text as="label" size="1" weight={"medium"}>
                Email
              </Text>
              <TextField.Input placeholder="Enter your email" required {...register("email")} />
            </div>
            <div>
              <Text as="label" size="1" weight={"medium"} required {...register("password")}>
                Password
              </Text>
              <TextField.Input placeholder="Enter your password" />
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <Button variant="solid" className="w-full" onClick={() => setAuthAction(AuthActionEnum.LOGIN)}>
                Login
              </Button>
              <Button variant="soft" className="w-full" onClick={() => setAuthAction(AuthActionEnum.REGISTER)}>
                Register
              </Button>
              <AuthProvider />
            </div>
          </form>
        </div>
      </Card>
    </Container>
  );
}
