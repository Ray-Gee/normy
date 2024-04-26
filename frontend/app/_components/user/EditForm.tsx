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
import { T } from "@/_intl/T"
import { useNotification } from '@/_utils/_hooks/notifications';
// import { IconAlertCircle } from "@tabler/icons-react"

export default function EditUserForm({ user }: { user: ExistingUser }) {
  console.log("user:", user)
  const router = useRouter()
  const {notifySuccess, notifyError} = useNotification()
  // const { isPending, mutate } = useCreateCompany();

  const form = UserForm({
    name: user.name,
    email: user.email,
  })

  const handleSubmit = async (values: any) => {
    console.log("values:", values)
    try {
      const updatedUser = await updateUser(user.id, {
        name: values.name,
        email: values.email,
      })
      console.log("updatedUser:", updatedUser)
      notifySuccess('正常に更新されました。');
      router.push("/")
    } catch (error) {
      notifyError()
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
            <Title order={1}><T id="Users.edit"/></Title>
          </Center>
          <Paper withBorder p="xl" radius="sm">
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Flex direction="column" gap="md">
                <SimpleGrid cols={1}>
                  <Alert color="red"><T id="Alert"/></Alert>
                </SimpleGrid>
                <SimpleGrid cols={1}>
                  <TextInput
                    {...form.getInputProps("name")}
                    withAsterisk
                    label={<T id="Username"/>}
                  />
                  <TextInput
                    {...form.getInputProps("email")}
                    withAsterisk
                    label={<T id="Email" />}
                    placeholder="sample@sample.com"
                  />
                </SimpleGrid>
                <Flex justify="flex-end">
                  <Button type="submit"><T id="Edit"/></Button>
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
