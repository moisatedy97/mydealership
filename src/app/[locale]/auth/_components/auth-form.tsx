"use client";

import React, { ReactElement, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { AuthResponse, AuthTokenResponsePassword } from "@supabase/supabase-js";
import { authForm } from "@/interfaces/auth-interface";
import { Database } from "../../../../../types/supabase";

export enum AuthActionEnum {
  LOGIN = "login",
  REGISTER = "register",
}

export default function AuthForm(): ReactElement {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthForm>({ resolver: zodResolver(authForm) });
  const [authAction, setAuthAction] = useState<AuthActionEnum>(AuthActionEnum.LOGIN);

  const onSubmit: SubmitHandler<AuthForm> = async (values: z.infer<typeof authForm>) => {
    const authCredentials: AuthForm = { email: values.email, password: values.password };
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

  const onSubmitLogin = async (authCredentials: AuthForm): Promise<AuthTokenResponsePassword> => {
    console.log("login");

    return await supabase.auth.signInWithPassword(authCredentials);
  };

  const onSubmitRegister = async (authCredentials: AuthForm): Promise<AuthResponse> => {
    console.log("register");
    return await supabase.auth.signUp(authCredentials);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <input type="text" placeholder="E-mail" className="input input-bordered w-full max-w-xs" {...register("email")} />
      {errors.email && <span>{errors.email.message}</span>}
      <input
        type="password"
        placeholder="Password"
        className="input input-bordered w-full max-w-xs"
        {...register("password")}
      />
      {errors.password && <span>{errors.password.message}</span>}
      <button type="submit" className="btn" onClick={() => setAuthAction(AuthActionEnum.LOGIN)}>
        Submit
      </button>
      <button type="submit" className="btn" onClick={() => setAuthAction(AuthActionEnum.REGISTER)}>
        Register
      </button>
    </form>
  );
}
