import "@mantine/core/styles.css"
import type { Metadata } from "next"
import "./globals.css"
import React from "react"
import { MantineProvider, ColorSchemeScript } from "@mantine/core"
// import { Inter } from "next/font/google"
// import { theme } from "@/theme"
// const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "植田のアプリ",
  description: "植田がnext rust スタックに慣れるためのアプリ",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider
          theme={{
            components: {
              Container: {
                defaultProps: {
                  style: { maxWidth: 480, padding: 16, margin: "16px auto" },
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
            },
          }}
        >
          {children}
        </MantineProvider>
      </body>
    </html>
  )
}
