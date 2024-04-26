export const theme = {
  components: {
    Container: {
      defaultProps: {
        style: { backgroundColor: '#B2EBF2', width: 700, padding: 16, margin: "16px auto" },
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
        style: { backgroundColor: "white", marginBottom: 16 },
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
        style: { marginTop: 10, padding: '0 10px' },
        order: 2,
      },
    },
  }
}
