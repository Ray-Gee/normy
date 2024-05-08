import { notifications } from "@mantine/notifications";

export function useNotification() {
  const notifySuccess = (message: string = "正常に作成されました。") => {
    notifications.show({
      title: "成功",
      message: message,
      color: "green",
      autoClose: 5000,
    });
  };

  const notifyError = ({
    message = "エラーが発生しました。",
    error,
  }: {
    message?: string;
    error?: unknown;
  }) => {
    notifications.show({
      title: "エラー",
      message: message,
      color: "red",
      autoClose: 5000,
    });
    console.error("Error:", error);
  };

  return { notifySuccess, notifyError };
}
