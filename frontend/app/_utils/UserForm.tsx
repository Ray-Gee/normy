import { useForm } from "@mantine/form"
import { validateName, validateEmail } from "@/_utils/validations"

export const UserForm = (initialValues: { name: string; email: string }) => {
  return useForm({
    initialValues,
    validate: {
      name: validateName,
      email: validateEmail,
    },
  })
}
