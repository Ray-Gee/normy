"use client";
import React from "react";
import type { UserProps } from "@/definitions";
import { Container, Center, Paper, Stack, Title, Box } from "@mantine/core";
import { T } from "@/_intl/T";
import { EditUserForm } from "@/_components/user/EditForm";

export const Edit: React.FC<UserProps> = ({ user }) => {
  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Container size={420}>
        <Stack>
          <Center>
            <Title order={1}>
              <T id="Users.edit" />
            </Title>
          </Center>
          <Paper withBorder p="xl" radius="sm">
            <EditUserForm user={user} />
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
};
