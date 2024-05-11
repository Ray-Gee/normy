import React from "react";
import { useRouter } from "next/navigation";
import type { UserProps } from "@/definitions";
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
  Box,
} from "@mantine/core";
import { UserForm } from "@/_utils/UserForm";
import { T } from "@/_intl/T";
import { useNotification } from "@/_utils/_hooks/notifications";
import { useUpdateUser } from "@/_utils/_hooks/users";
import { useUser } from "@/UserContext";
import { decodeToken } from "@/_utils/utils";

export const EditUserForm: React.FC<UserProps> = ({ user }) => {
  const router = useRouter();
  const form = UserForm({
    name: user.name,
    email: user.email,
  });
  const { setUser } = useUser();
  const { notifySuccess, notifyError } = useNotification();
  const { mutate, isPending } = useUpdateUser({
    user,
    onSuccess: (values: any) => {
      console.log("values:", values);
      localStorage.setItem("jwt", values.jwt);
      const decodedUser = decodeToken(values.jwt);
      setUser(decodedUser);
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
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Flex direction="column" gap="md">
        <SimpleGrid cols={1}>
          <TextInput
            {...form.getInputProps("name")}
            required
            label={<T id="Username" />}
          />
          <TextInput
            {...form.getInputProps("email")}
            required
            label={<T id="Email" />}
            placeholder="sample@sample.com"
          />
        </SimpleGrid>
        <Flex justify="flex-end">
          <Button type="submit">
            <T id="Edit" />
          </Button>
        </Flex>
      </Flex>
    </form>
  );
};
