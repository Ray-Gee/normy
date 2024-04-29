import { useForm } from "@mantine/form";
import { validateEmail, validateName } from "@/_utils/validations";

export const UserForm = (initialValues: { name: string; email: string }) => {
  return useForm({
    initialValues,
    validate: {
      name: validateName,
      email: validateEmail,
    },
  });
};
