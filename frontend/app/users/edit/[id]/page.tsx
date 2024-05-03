"use client";
import React, { useState, useEffect } from "react";
import type { ExistingUser } from "@/definitions";
import { EditUserForm } from "@/_components/user/EditForm";
import { getUser, fetchData } from "@/_services/userService";

export default function Page({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<ExistingUser>();
  const id = params.id;

  useEffect(() => {
    fetchData<ExistingUser>({
      id,
      getData: getUser,
    }).then((user) => {
      setUser(user);
    });
  }, [id]);

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
      {user && <EditUserForm user={user} />}
    </main>
  );
}
