import React, { useState } from "react"
import { createWrapper, createUser } from "@/_services/userService"
import type { NewUser, CreateFormProps, ExistingUser } from "@/definitions"
import { Button, TextInput, Flex } from "@mantine/core"
import { UserForm } from '@/_utils/UserForm';

export const CreateForm: React.FC<CreateFormProps<ExistingUser>> = ({
  items,
  setItems,
}) => {
  console.log("items:", items)
  console.log("setItems:", setItems)
const form = UserForm({
    name: "",
    email: "",
  })

  const handleSubmit = async (values: NewUser) => {
    createWrapper<ExistingUser, NewUser>({
      values,
      items,
      setItems,
      createData: createUser,
    })
    form.reset();
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        {...form.getInputProps("name")}
        label="Username"
        withAsterisk
      />
      <TextInput
        {...form.getInputProps("email")}
        label="Email"
        withAsterisk
        placeholder="sample@sample.com"
      />
      <Flex justify="flex-end">
        <Button type="submit">新規作成</Button>
      </Flex>
    </form>
  )
}
