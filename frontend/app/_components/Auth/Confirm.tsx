"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { LoadingOverlay } from "@mantine/core";
import { authConfirm } from "@/_services/authService";
import { QueryProps } from "@/definitions";

export default function Confirm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const userId = searchParams.get("user_id");

  useEffect(() => {
    if (typeof token === "string" && typeof userId === "string") {
      confirmAccount({ token, userId });
    }
  }, [token, userId]);

  const confirmAccount = async ({ token, userId }: QueryProps) => {
    console.log("Confirming account:", token, userId);
    await authConfirm({ token, userId });
  };

  return (
    <>
      <LoadingOverlay visible={true} />;
    </>
  );
}
