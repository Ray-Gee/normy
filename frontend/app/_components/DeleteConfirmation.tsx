import { useState } from "react";
import { Modal, Button, Group } from "@mantine/core";
import { T } from "@/_intl/T";

interface DeleteConfirmationProps {
  onDelete: () => Promise<void>;
  onClose: () => void;
}

export function DeleteConfirmation({
  onDelete,
  onClose,
}: DeleteConfirmationProps) {
  const [opened, setOpened] = useState(true);

  const handleDelete = async () => {
    await onDelete();
    handleClose();
  };

  const handleClose = () => {
    setOpened(false);
    onClose();
  };

  return (
    <>
      <Modal opened={opened} onClose={handleClose}>
        <p>
          <T id="Are you sure you want to delete?" />
        </p>
        <Group>
          <Button onClick={handleDelete}>
            <T id="Yes, Delete" />
          </Button>
          <Button onClick={handleClose} variant="subtle">
            <T id="Cancel" />
          </Button>
        </Group>
      </Modal>
    </>
  );
}
