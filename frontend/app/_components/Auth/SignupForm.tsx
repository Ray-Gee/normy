"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Paper,
  PasswordInput,
  Space,
  TextInput,
  LoadingOverlay,
  Title,
} from "@mantine/core";
import { UserAuthForm } from "@/_utils/UserForm";
import { useNotification } from "@/_utils/_hooks/notifications";
import { useCreateSignupUser } from "@/_utils/_hooks/users";
import { T } from "@/_intl/T";

export default function SignupForm() {
  const router = useRouter();
  const { notifySuccess, notifyError } = useNotification();
  const form = UserAuthForm({
    name: "",
    email: "",
    password: "",
  });
  const { mutate, isPending } = useCreateSignupUser({
    onSuccess: () => {
      notifySuccess("アカウントが正常に作成されました。");
      router.push("/login");
    },
    onError: (error) => {
      notifyError({ error });
    },
  });

  const handleSubmit = async (values: any) => {
    mutate({ values });
  };
  if (isPending) return <LoadingOverlay visible={true} />;

  return (
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      <Title order={2}>
        <T id="Signup" />
      </Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          {...form.getInputProps("name")}
          label={<T id="Name" />}
          required
        />
        <TextInput
          {...form.getInputProps("email")}
          label={<T id="Email" />}
          placeholder="sample@sample.com"
          required
        />
        <PasswordInput
          {...form.getInputProps("password")}
          label={<T id="Password" />}
          placeholder="Your password"
          required
        />
        <Space h="md" />
        <Button fullWidth mt="xl" type="submit">
          <T id="Sign Up" />
        </Button>
      </form>
    </Paper>
  );
}
