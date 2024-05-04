import { useForm } from "@mantine/form";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "@/_utils/validations";

export const UserForm = (initialValues: { name: string; email: string }) => {
  return useForm({
    initialValues,
    validate: {
      name: validateName,
      email: validateEmail,
    },
  });
};

export const UserAuthForm = (initialValues: {
  name: string;
  email: string;
  password: string;
}) => {
  return useForm({
    initialValues,
    validate: {
      name: validateName,
      email: validateEmail,
      password: validatePassword,
    },
  });
};
