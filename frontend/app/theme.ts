import { MantineThemeOverride } from "@mantine/core";

export const theme: MantineThemeOverride = {
  focusRing: "auto",
  scale: 1,
  fontSmoothing: true,
  white: "#FFFFFF",
  black: "#000000",
  colors: {
    teal: [
      "#CDE8E5",
      "#EEF7FF",
      "#7AB2B2",
      "#4D869C",
      "#66A5AD",
      "#1D7074",
      "#005D5D",
      "#003D3D",
      "#002626",
      "#001414",
    ],
  },
  primaryShade: { light: 6, dark: 7 },
  primaryColor: "teal",
  components: {
    Container: {
      defaultProps: {
        style: {
          width: 700,
          padding: 16,
          margin: "16px auto",
        },
      },
    },
    Button: {
      defaultProps: {
        style: { margin: "20px 0" },
        radius: "md",
      },
    },
    Card: {
      defaultProps: {
        style: { marginBottom: 16 },
        shadow: "sm",
        p: "lg",
        radius: "md",
      },
    },
    Title: {
      defaultProps: {
        style: { marginBottom: 14 },
        order: 2,
      },
    },
    Group: {
      defaultProps: {
        style: { marginTop: 10, padding: "0 10px" },
        order: 2,
      },
    },
  },
};
