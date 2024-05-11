"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { LoadingOverlay } from "@mantine/core";
import { authConfirm } from "@/_services/authService";
import { QueryProps } from "@/definitions";
import { useNotification } from "@/_utils/_hooks/notifications";

export default function Confirm() {
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const userId = searchParams.get("user_id");
  const { notifySuccess, notifyError } = useNotification();

  useEffect(() => {
    if (typeof token === "string" && typeof userId === "string") {
      confirmAccount({ token, userId });
    } else {
      setLoading(false);
    }
  }, []);

  const confirmAccount = async ({ token, userId }: QueryProps) => {
    try {
      await authConfirm({ token, userId });
      notifySuccess("認証に成功しました。");
      router.push("/login");
    } catch (error) {
      console.error("Error occurred in confirmAccount", error);
      notifyError({
        message:
          "アカウントの確認に失敗しました。リンクが無効か、期限切れです。",
      });
    }
  };

  return <LoadingOverlay visible={loading} />;
}
