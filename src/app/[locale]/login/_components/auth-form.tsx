"use client";

import React, { ReactElement, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { AuthResponse, AuthTokenResponsePassword } from "@supabase/supabase-js";
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
    <div
      className="hero min-h-screen bg-base-200"
      style={{
        backgroundImage: "url(https://www.mlaworld.com/wp-content/uploads/2021/10/strada-route-66.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="card rounded-2xl bg-base-100">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-3xl font-bold">Login</h1>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" placeholder="email" className="input input-bordered" required {...register("email")} />
            {errors.email && <span>{errors.email.message}</span>}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              required
              {...register("password")}
            />
            {errors.password && <span>{errors.password.message}</span>}
          </div>
          <div className="form-control mt-6 flex flex-row gap-x-2">
            <button className="btn btn-primary grow rounded-full" onClick={() => setAuthAction(AuthActionEnum.LOGIN)}>
              Login
            </button>
            <AuthProvider />
          </div>
          <div className="form-control">
            <button
              className="btn btn-outline btn-secondary  rounded-full"
              onClick={() => setAuthAction(AuthActionEnum.REGISTER)}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
