"use client"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import type { ExistingUser } from "@/definitions"
import { updateUser } from "@/_services/userService"
// import { useForm } from "react-hook-form"
import {
  Container,
  Alert,
  Button,
  Center,
  Flex,
  Divider,
  Paper,
  SimpleGrid,
  Stack,
  TextInput,
  Title,
} from "@mantine/core"
import { useForm } from "@mantine/form"
// import { IconAlertCircle } from "@tabler/icons-react"

export default function EditUserForm({ user }: { user: ExistingUser }) {
  console.log("user:", user)
  const router = useRouter()
  const [existingUser, setExistingUser] = useState<ExistingUser>({
    id: user.id,
    name: user.name,
    email: user.email,
  })
  // const [email, setEmail] = useState<string>(user.email)
  // const initialState = { name: "", email: "" }
  // const updateUserWithId = updateUser.bind(null, user.id)
  // const [state, dispatch] = useFormState(updateUserWithId, initialState)
  // const { isPending, mutate } = useCreateCompany();
  // const {
  //   handleSubmit,
  //   register,
  //   formState: { errors, isSubmitting },
  // } = useForm()
  // module not foundエラーになる

  const form = useForm({
    initialValues: {
      id: existingUser.id,
      email: existingUser.email,
      name: existingUser.name,
    },
    validate: {
      name: (value) => (value ? null : "Name is required"),
      email: (value) =>
        /^\S+@\S+\.\S+$/.test(value) ? null : "Invalid email format",
    },
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // const onSubmit = handleSubmit(async (data) => {
    // console.log("data:", data)
    e.preventDefault()
    try {
      const updatedUser = await updateUser(existingUser.id, {
        name: existingUser.name,
        email: existingUser.email,
      })
      console.log("updatedUser:", updatedUser)
      router.push("/")
    } catch (error) {
      console.error("Error updating user:", error)
    }
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Container size={420}>
        <Stack>
          <Center>
            <Title order={1}>ユーザー編集</Title>
          </Center>
          <Paper withBorder p="xl" radius="sm">
            <form onSubmit={handleSubmit}>
              <Flex direction="column" gap="md">
                <SimpleGrid cols={1}>
                  <Alert color="red">あらーと</Alert>
                </SimpleGrid>
                <Title order={2}>アカウント</Title>
                <SimpleGrid cols={1}>
                  <TextInput
                    value={existingUser.name}
                    onChange={(e) =>
                      setExistingUser({
                        ...existingUser,
                        name: e.target.value,
                      })
                    }
                    withAsterisk
                    label="Username"
                  />
                  <TextInput
                    value={existingUser.email}
                    onChange={(e) =>
                      setExistingUser({
                        ...existingUser,
                        email: e.target.value,
                      })
                    }
                    withAsterisk
                    label="Email"
                    placeholder="sample@sample.com"
                  />
                </SimpleGrid>
                <Button type="submit" variant="filled">
                  編集する
                </Button>
                <Divider labelPosition="center"></Divider>
              </Flex>
            </form>
          </Paper>
        </Stack>
      </Container>
    </div>
  )
}
