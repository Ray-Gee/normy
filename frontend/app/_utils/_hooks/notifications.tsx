import { notifications } from '@mantine/notifications';

export function useNotification() {
  const notifySuccess = (message: string = "正常に作成されました。") => {
    notifications.show({
      title: '成功',
      message: message,
      color: 'green',
      autoClose: 5000,
    });
  };

  const notifyError = (message: string = "エラーが発生しました。") => {
    notifications.show({
      title: 'エラー',
      message: message,
      color: 'red',
      autoClose: 5000,
    });
  };

  return { notifySuccess, notifyError };
}