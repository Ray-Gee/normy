"use client";
import React, { useState, useEffect } from "react";
import { CreateForm } from "@/_components/user/CreateForm";
import { UserList } from "@/_components/user/UserList";
import type { UserInterfaceProps, ExistingUser } from "@/definitions";
import { listUsers } from "@/_services/userService";
import { Container, Title } from "@mantine/core";
import { T } from "@/_intl/T";

const UserInterface: React.FC<UserInterfaceProps> = ({ backendName }) => {
  const [users, setUsers] = useState<ExistingUser[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: ExistingUser[] = await listUsers();
        setUsers(data.reverse());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [backendName]);

  return (
    <Container
      className={`user-interface ${backendName} w-full max-w-md p-4 my-4 rounded shadow`}
    >
      <Title>
        <T id="Users" />
      </Title>
      <CreateForm items={users} setItems={setUsers} />
      <UserList items={users} setItems={setUsers} />
    </Container>
  );
};

export default UserInterface;
