import React from "react";

type ErrorMessage = {
  errorValue: string | undefined;
};

const ErrorMessage = ({ errorValue }: ErrorMessage) => {
  if (errorValue) {
    return <span className="text-right text-xs text-red-500">{errorValue}</span>;
  }
};

export default ErrorMessage;
