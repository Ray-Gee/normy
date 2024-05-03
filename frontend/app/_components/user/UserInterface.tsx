"use client";
import React, { useState, useEffect } from "react";
import { Container, Title } from "@mantine/core";
import { CreateForm } from "@/_components/user/CreateForm";
import { UserList } from "@/_components/user/UserList";
import { useListUsers } from "@/_utils/_hooks/users";
import type { UserInterfaceProps, ExistingUser } from "@/definitions";
import { T } from "@/_intl/T";

const UserInterface: React.FC<UserInterfaceProps> = ({ backendName }) => {
  const [users, setUsers] = useState<ExistingUser[]>([]);
  const { data, error, isLoading } = useListUsers({ backendName });
  useEffect(() => {
    if (data) {
      setUsers([...data].reverse());
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching users: {error.message}</div>;

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
