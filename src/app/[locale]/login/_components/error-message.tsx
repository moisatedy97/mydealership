import { Callout } from "@radix-ui/themes";
import { Ban } from "lucide-react";
import React from "react";

type ErrorMessageProps = {
  errorType: "1" | "2";
  errorValue: string | undefined;
};

const ErrorMessage = ({ errorType, errorValue }: ErrorMessageProps) => {
  if (errorValue) {
    switch (errorType) {
      case "1":
        return <span className="text-right text-xs text-red-500">{errorValue}</span>;
      case "2":
        return <ErrorAlert messageText={errorValue} color="red" />;
      default:
        return <span>Unexpected value!</span>;
    }
  }
};

export default ErrorMessage;

type ErrorAlertProps = {
  messageText: string;
  color: "red" | "green" | "yellow"; //TODO
};

const ErrorAlert = ({ messageText, color }: ErrorAlertProps) => {
  return (
    <Callout.Root color={color}>
      <Callout.Icon>
        <Ban />
      </Callout.Icon>
      <Callout.Text className=" text-xs">{messageText}</Callout.Text>
    </Callout.Root>
  );
};
