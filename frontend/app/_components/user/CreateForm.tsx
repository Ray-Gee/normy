import React, { useState } from "react"
import { createWrapper, createUser } from "@/_services/userService"
import type { NewUser, CreateFormProps, ExistingUser } from "@/definitions"
import { Button, TextInput, Flex } from "@mantine/core"

export const CreateForm: React.FC<CreateFormProps<ExistingUser>> = ({
  items,
  setItems,
}) => {
  console.log("items:", items)
  console.log("setItems:", setItems)
  const [newUser, setNewUser] = useState<NewUser>({ name: "", email: "" })

  return (
    <form
      onSubmit={(e) =>
        createWrapper<ExistingUser, NewUser>({
          e,
          items,
          newItem: newUser,
          setItems,
          setNewItem: setNewUser,
          createData: createUser,
        })
      }
    >
      <TextInput
        // type="text"
        label="Username"
        withAsterisk
        value={newUser.name}
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
      />
      <TextInput
        // type="email"
        label="Email"
        withAsterisk
        placeholder="sample@sample.com"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />
      <Flex justify="flex-end">
        <Button type="submit">新規作成</Button>
      </Flex>
    </form>
  )
}
