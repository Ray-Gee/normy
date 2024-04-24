import '@mantine/core/styles.css';
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
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  )
}
