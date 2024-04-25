"use client"
import React from "react"
import { useRouter } from "next/navigation"
import type { ExistingUser } from "@/definitions"
import { updateUser } from "@/_services/userService"
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
import { UserForm } from '@/_utils/UserForm';
// import { IconAlertCircle } from "@tabler/icons-react"

export default function EditUserForm({ user }: { user: ExistingUser }) {
  console.log("user:", user)
  const router = useRouter()
  // const { isPending, mutate } = useCreateCompany();

  const form = UserForm({
    name: user.name,
    email: user.email,
  })

  const handleSubmit = async (values: any) => {
    console.log("values:", values)
    try {
      const updatedUser = await updateUser(values.id, {
        name: values.name,
        email: values.email,
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
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Flex direction="column" gap="md">
                <SimpleGrid cols={1}>
                  <Alert color="red">あらーと</Alert>
                </SimpleGrid>
                <Title order={2}>アカウント</Title>
                <SimpleGrid cols={1}>
                  <TextInput
                    {...form.getInputProps("name")}
                    withAsterisk
                    label="Username"
                  />
                  <TextInput
                    {...form.getInputProps("email")}
                    withAsterisk
                    label="Email"
                    placeholder="sample@sample.com"
                  />
                </SimpleGrid>
                <Flex justify="flex-end">
                  <Button type="submit">編集</Button>
                </Flex>
                <Divider labelPosition="center"></Divider>
              </Flex>
            </form>
          </Paper>
        </Stack>
      </Container>
    </div>
  )
}
