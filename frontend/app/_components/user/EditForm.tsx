"use client";
import React from "react";
import { useRouter } from "next/navigation";
import type { ExistingUser, UserProps } from "@/definitions";
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
  LoadingOverlay,
} from "@mantine/core";
import { UserForm } from "@/_utils/UserForm";
import { T } from "@/_intl/T";
import { useNotification } from "@/_utils/_hooks/notifications";
import { useUpdateUser } from "@/_utils/_hooks/users";

export const EditUserForm: React.FC<UserProps> = ({ user }) => {
  const router = useRouter();
  const { notifySuccess, notifyError } = useNotification();
  const form = UserForm({
    name: user.name,
    email: user.email,
  });
  const { mutate, isPending } = useUpdateUser({
    user,
    onSuccess: () => {
      notifySuccess("正常に更新されました。");
      router.push("/");
    },
    onError: (error: unknown) => {
      notifyError({ error });
    },
  });
  if (isPending) return <LoadingOverlay visible={true} />;

  const handleSubmit = async (values: any) => {
    mutate({
      name: values.name,
      email: values.email,
    });
  };

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
            <Title order={1}>
              <T id="Users.edit" />
            </Title>
          </Center>
          <Paper withBorder p="xl" radius="sm">
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Flex direction="column" gap="md">
                <SimpleGrid cols={1}>
                  <Alert color="red">
                    <T id="Alert" />
                  </Alert>
                </SimpleGrid>
                <SimpleGrid cols={1}>
                  <TextInput
                    {...form.getInputProps("name")}
                    withAsterisk
                    label={<T id="Username" />}
                  />
                  <TextInput
                    {...form.getInputProps("email")}
                    withAsterisk
                    label={<T id="Email" />}
                    placeholder="sample@sample.com"
                  />
                </SimpleGrid>
                <Flex justify="flex-end">
                  <Button type="submit">
                    <T id="Edit" />
                  </Button>
                </Flex>
                <Divider labelPosition="center"></Divider>
              </Flex>
            </form>
          </Paper>
        </Stack>
      </Container>
    </div>
  );
};
