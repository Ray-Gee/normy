"use client"
import React, { useState, useEffect } from "react"
import type { ExistingUser } from "@/definitions"
import Form from "@/_components/user/EditForm"
// import Breadcrumbs from "@/app/ui/invoices/breadcrumbs"
import { fetchUser, updateUser } from "@/_services/userService"

export default function Page({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<ExistingUser>()
  const id = params.id
  // const [invoice, customers] = await Promise.all([getUser(id)])

  useEffect(() => {
    fetchUser(id).then((user) => {
      setUser(user)
    })
  }, [id])

  return (
    <main>
      {/* <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", href: "/dashboard/invoices" },
          {
            label: "Edit Invoice",
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      /> */}
      {user && <Form user={user} />}
    </main>
  )
}
