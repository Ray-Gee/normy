import React from "react";
import type { NewUser, ExistingUserListProps } from "@/definitions";
import { Button, TextInput, Flex, LoadingOverlay } from "@mantine/core";
import { UserForm } from "@/_utils/UserForm";
import { T } from "@/_intl/T";
import { useNotification } from "@/_utils/_hooks/notifications";
import { useCreateUser } from "@/_utils/_hooks/users";

export const CreateForm: React.FC<ExistingUserListProps> = ({
  items,
  setItems,
}) => {
  const { notifySuccess, notifyError } = useNotification();
  const form = UserForm({
    name: "",
    email: "",
  });
  const { mutate, isPending } = useCreateUser({
    items,
    setItems,
    onSuccess: () => {
      form.reset();
      notifySuccess();
    },
    onError: (error: unknown) => {
      notifyError({ error });
    },
  });
  if (isPending) return <LoadingOverlay visible={true} />;

  const handleSubmit = async (values: NewUser) => {
    mutate({ values });
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        {...form.getInputProps("name")}
        label={<T id="Username" />}
        withAsterisk
      />
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
  );
};
