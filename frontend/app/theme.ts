import { createTheme } from "@mantine/core"

export const theme = createTheme({
  fontFamily: "Open Sans, sans-serif",
  primaryColor: "cyan",
  components: {
    Button: {
      styles: (theme: { colors: { cyan: any[] } }) => ({
        root: {
          backgroundColor: theme.colors.cyan[6], // ボタンの背景色を設定
          color: "#ffffff", // 文字色を白に設定
          padding: "8px 16px", // パディングを設定
          fontSize: "16px", // フォントサイズを設定
          fontWeight: "500", // フォントウェイトを設定
          borderRadius: "4px", // ボーダーラディウスを設定
          "&:hover": {
            backgroundColor: theme.colors.cyan[7], // ホバー時の背景色を少し暗くする
          },
          "&:active": {
            backgroundColor: theme.colors.cyan[8], // アクティブ時の背景色をさらに暗くする
          },
        },
        filled: {
          backgroundColor: theme.colors.cyan[6], // フィルドスタイルの背景色を設定
          color: "#ffffff", // フィルドスタイルの文字色を設定
          "&:hover": {
            backgroundColor: theme.colors.cyan[7], // フィルドスタイルのホバー時の背景色を設定
          },
          "&:active": {
            backgroundColor: theme.colors.cyan[8], // フィルドスタイルのアクティブ時の背景色を設定
          },
        },
      }),
      defaultProps: {
        variant: "filled", // デフォルトでフィルドスタイルを使用
      },
    },
    Title: {
      styles: (theme: { colors: { cyan: any[] } }) => ({
        root: {
          fontSize: "24px", // タイトルのフォントサイズ
          fontWeight: "700", // フォントウェイト
          color: theme.colors.cyan[9], // タイトルの色
          marginBottom: "20px", // 下のマージン
        },
      }),
    },
    TextInput: {
      styles: (theme: { colors: { cyan: any[]; gray: any[] } }) => ({
        root: {
          marginBottom: "10px", // 各テキストインプット間のマージン
        },
        input: {
          fontWeight: "400", // フォントウェイト
          color: theme.colors.gray[9], // テキストカラー
          borderColor: theme.colors.cyan[4], // ボーダーの色
          borderWidth: "2px", // 増やすことでアウトラインを強調
          "&:hover": {
            borderColor: theme.colors.cyan[5], // ホバー時のボーダーカラー
          },
          "&:focus": {
            borderColor: theme.colors.cyan[6], // フォーカス時のボーダーカラー
            boxShadow: `0 0 0 1px ${theme.colors.cyan[6]}`, // フォーカス時に影を追加
          },
        },
        label: {
          fontSize: "16px", // ラベルのフォントサイズ
          color: theme.colors.gray[9], // ラベルカラー
        },
      }),
    },
    Alert: {
      styles: (theme: { colors: { cyan: any[] } }) => ({
        root: {
          backgroundColor: theme.colors.cyan[1], // アラート背景色
          borderColor: theme.colors.cyan[4], // アラートのボーダーカラー
          color: theme.colors.cyan[9], // アラート内テキストカラー
          padding: "10px", // パディング調整
          borderRadius: "8px", // ボーダーラディウス
        },
        title: {
          color: theme.colors.cyan[9], // タイトルの色
          fontSize: "16px", // タイトルのフォントサイズ
          fontWeight: "600", // タイトルのフォントウェイト
        },
        icon: {
          color: theme.colors.cyan[6], // アイコンの色
        },
      }),
    },
  },
})
