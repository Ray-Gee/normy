import React from "react";
import { Button, Card, TextInput, PasswordInput } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function PasswordResetForm() {
  const router = useRouter();

  return (
    <Card withBorder shadow="md" p={30} mt={30} radius="md">
      <TextInput label="Email" placeholder="your-email@example.com" required />
      <PasswordInput
        label="New Password"
        placeholder="Enter new password"
        required
        mt="md"
      />
      <PasswordInput
        label="Confirm New Password"
        placeholder="Confirm new password"
        required
        mt="md"
      />
      <Button
        fullWidth
        mt="xl"
        onClick={() => {
          // ここにパスワード更新のロジックを実装
          router.push("/dashboard");
        }}
      >
        Update Password
      </Button>
    </Card>
  );
}
