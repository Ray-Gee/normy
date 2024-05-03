import React from "react";
import { Alert } from "@mantine/core";

interface ErrorAlertProps {
  message: string;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => {
  return (
    <Alert title="Error" color="red">
      {message}
    </Alert>
  );
};
