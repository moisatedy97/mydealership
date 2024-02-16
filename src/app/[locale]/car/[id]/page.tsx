import React from "react";

export default async function Car({ params }: { params: { id: string } }) {
  // http://localhost:3000/car/id
  return <div>id: {params.id}</div>;
}
