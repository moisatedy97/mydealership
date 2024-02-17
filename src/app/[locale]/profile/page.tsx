"use client";

import React, { ReactElement } from "react";
import { useUserSessionStore } from "@/stores/session-store";

export default function ProfileDetails(): ReactElement {
  const user = useUserSessionStore((state) => state.user);

  return <div>{user ? user.email : "no user"}</div>;
}
