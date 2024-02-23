import React, { ReactElement } from "react";
import axios from "axios";

export default async function PaymentPlans(): Promise<ReactElement | undefined> {
  const { data, status } = await axios.get("/api/stripe/products");

  if (data) {
    return <pre>{JSON.stringify(data, null, 2)}</pre>;
  } else {
    return <div>{status}</div>;
  }
}
