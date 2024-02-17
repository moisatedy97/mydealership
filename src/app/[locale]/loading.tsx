import { Container } from "@radix-ui/themes";
import { SpinnerDiamond } from "spinners-react";

export default function Loading() {
  return (
    <Container className="fixed left-0 top-0 flex h-full w-full items-center justify-center">
      <div className="mx-auto w-full max-w-[50px] items-center justify-center">
        <SpinnerDiamond size={50} color="lime" secondaryColor="#E8E8E8" />
      </div>
    </Container>
  );
}
