import React from "react"
import { createWrapper, createUser } from "@/_services/userService"
import type { NewUser, CreateFormProps, ExistingUser } from "@/definitions"
import { Button, TextInput, Flex } from "@mantine/core"
import { UserForm } from "@/_utils/UserForm"
import { T } from "@/_intl/T"
import { useNotification } from "@/_utils/_hooks/notifications"

export const CreateForm: React.FC<CreateFormProps<ExistingUser>> = ({
  items,
  setItems,
}) => {
  const { notifySuccess, notifyError } = useNotification()

  const form = UserForm({
    name: "",
    email: "",
  })

  const handleSubmit = async (values: NewUser) => {
    try {
      createWrapper<ExistingUser, NewUser>({
        values,
        items,
        setItems,
        createData: createUser,
      })
      notifySuccess()
      form.reset()
    } catch (error) {
      console.error("Error creating user:", error)
      notifyError()
    }
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput {...form.getInputProps("name")} label={<T id="Username"/>} withAsterisk />
      <TextInput
        {...form.getInputProps("email")}
        label={<T id="Email" />}
        withAsterisk
        placeholder="sample@sample.com"
      />
      <Flex justify="flex-end">
        <Button type="submit">
          <T id="Create" />
        </Button>
      </Flex>
    </form>
  )
}
