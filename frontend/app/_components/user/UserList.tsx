"use client";
import React, { useState } from "react";
import { ExistingUserListProps, isExistingUser } from "@/definitions";
import CardComponent from "@/_components/CardComponent";
import { DeleteConfirmation } from "@/_components/DeleteConfirmation";
import { T } from "@/_intl/T";
import { Button, Card, Flex } from "@mantine/core";
import { useNotification } from "@/_utils/_hooks/notifications";
import { deleteWrapper, deleteUser } from "@/_services/userService";

export const UserList: React.FC<ExistingUserListProps> = ({
  items,
  setItems,
}) => {
  const [modalUserId, setModalUserId] = useState<string>("");
  const { notifySuccess } = useNotification();

  const handleDelete = async (userId: string) => {
    const user = items.find((u) => u.id === userId);
    if (user) {
      await deleteWrapper({
        item: user,
        items,
        setItems,
        deleteData: deleteUser,
      });
      setModalUserId("");
      notifySuccess("削除されました。");
    }
  };

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
              onDelete={() => handleDelete(user.id)}
              onClose={handleClose}
            />
          )}
        </Card>
      ))}
    </div>
  );
};

export default UserList;
