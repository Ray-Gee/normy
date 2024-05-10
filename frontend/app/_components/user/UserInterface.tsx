"use client";
import React, { useState, useEffect } from "react";
import { Container, Title, LoadingOverlay } from "@mantine/core";
import { ErrorAlert } from "@/_components/ErrorAlert";
import { CreateForm } from "@/_components/user/CreateForm";
import { UserList } from "@/_components/user/UserList";
import { useListUsers } from "@/_utils/_hooks/users";
import type { UserInterfaceProps, ExistingUser } from "@/definitions";
import { T } from "@/_intl/T";

const UserInterface: React.FC<UserInterfaceProps> = ({ backendName }) => {
  const [users, setUsers] = useState<ExistingUser[]>([]);
  const { data, error, isLoading } = useListUsers({ backendName });
  console.log("data:", data);
  useEffect(() => {
    if (data?.status == 200) {
      setUsers([...data.data].reverse());
    }
  }, [data]);

  if (isLoading) return <LoadingOverlay visible={true} />;
  if (error) return <ErrorAlert message={error.message} />;

  return (
    <Container
      className={`user-interface ${backendName} w-full max-w-md p-4 my-4 rounded shadow`}
    >
      <Title>
        <T id="Users" />
      </Title>
      <CreateForm items={users || []} setItems={setUsers} />
      <UserList items={users || []} setItems={setUsers} />
    </Container>
  );
};

export default UserInterface;
