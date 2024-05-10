"use client";
import React, { useState } from "react";
import {
  Anchor,
  Button,
  Card,
  Checkbox,
  Group,
  LoadingOverlay,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { useVerifyToken } from "@/_utils/_hooks/users";
import { UserLoginForm } from "@/_utils/UserForm";
import { T } from "@/_intl/T";
import { useNotification } from "@/_utils/_hooks/notifications";
import { LoginProps } from "@/definitions";

export default function LoginForm() {
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const form = UserLoginForm({
    email: "",
    password: "",
  });
  const { notifySuccess, notifyError } = useNotification();

  const { mutate, isPending } = useVerifyToken({
    onSuccess: (data: any) => {
      console.debug("data:", data);
      notifySuccess("ログインに成功しました。");
      form.reset();
      if (data.status === 200) {
        const { token } = data.data;
        localStorage.setItem("token", token);
        router.push("/");
      } else {
        console.error("Failed to sign in");
      }
    },
    onError: (error: any) => {
      console.error("An error occurred during sign in:", error);
      notifyError({ error });
    },
  });

  const handleSubmit = async (values: any) => {
    try {
      mutate(values);
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  return (
    <Card withBorder shadow="md" p={30} mt={30} radius="md">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <LoadingOverlay visible={isPending} />
        <TextInput
          {...form.getInputProps("email")}
          label={<T id="Email" />}
          placeholder="test@example.com"
          required
        />
        <PasswordInput
          {...form.getInputProps("password")}
          label={<T id="Password" />}
          placeholder="Your password"
          required
          mt="md"
        />
        <Group mt="md">
          <Checkbox
            label="Remember me"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.currentTarget.checked)}
          />
          <Anchor size="sm" href="#">
            Forgot Password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl" type="submit" disabled={isPending}>
          Sign In
        </Button>
      </form>
    </Card>
  );
}
