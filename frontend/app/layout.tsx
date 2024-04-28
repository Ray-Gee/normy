import "@mantine/core/styles.css"
import type { Metadata } from "next"
import "./globals.css"
import React from "react"
import { ColorSchemeScript } from "@mantine/core"
import { GlobalProviders } from "@/_components/providers"
import { DashboardLayout } from '@/_components/DashboardLayout';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
// import { Inter } from "next/font/google"
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
          <GlobalProviders>
          <Notifications position="top-right"/>
            <DashboardLayout>
            {children}
            </DashboardLayout>
          </GlobalProviders>
      </body>
    </html>
  )
}
