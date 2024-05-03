"use client";
import React, { useState } from "react";
import { ExistingUserListProps, isExistingUser } from "@/definitions";
import CardComponent from "@/_components/CardComponent";
import { DeleteConfirmation } from "@/_components/DeleteConfirmation";
import { T } from "@/_intl/T";
import { Button, Card, Flex, LoadingOverlay } from "@mantine/core";
import { useNotification } from "@/_utils/_hooks/notifications";
import { useDeleteUser } from "@/_utils/_hooks/users";

export const UserList: React.FC<ExistingUserListProps> = ({
  items,
  setItems,
}) => {
  const [modalUserId, setModalUserId] = useState<string>("");
  const { notifySuccess, notifyError } = useNotification();

  const { mutateAsync, isPending } = useDeleteUser({
    items,
    setItems,
    onSuccess: () => {
      setModalUserId("");
      notifySuccess("削除されました。");
    },
    onError: (error: unknown) => {
      notifyError({ error });
    },
  });
  if (isPending) return <LoadingOverlay visible={true} />;

  const handleClose = () => {
    setModalUserId("");
  };

  return (
    <div>
      {items.map((user) => (
        <Card key={user.id}>
          {isExistingUser(user) ? <CardComponent card={user} /> : <div></div>}
          <Flex justify="flex-end">
            <Button onClick={() => setModalUserId(user.id)}>
              <T id="Delete" />
            </Button>
          </Flex>
          {modalUserId === user.id && (
            <DeleteConfirmation
              onDelete={() => mutateAsync(user.id)}
              onClose={handleClose}
            />
          )}
        </Card>
      ))}
    </div>
  );
};

export default UserList;
