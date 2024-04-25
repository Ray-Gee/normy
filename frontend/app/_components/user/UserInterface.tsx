"use client"
import React, { useState, useEffect } from "react"
import CardComponent from "@/_components/CardComponent"
import { CreateForm } from "@/_components/user/CreateForm"
import type {
  UserInterfaceProps,
  ExistingUser,
} from "@/definitions";
import {
  isExistingUser
} from "@/definitions";
import { listUsers, deleteWrapper, deleteUser } from "@/_services/userService"
import { Container, Title, Button, Card, Flex, Group, Box } from "@mantine/core"

const UserInterface: React.FC<UserInterfaceProps> = ({ backendName }) => {
  const [users, setUsers] = useState<ExistingUser[]>([])

  // const backgroundColors: { [key: string]: string } = {
  //   rust: "bg-orange-500",
  // }

  // const bgColor =
  //   backgroundColors[backendName as keyof typeof backgroundColors] ||
  //   "bg-gray-200"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: ExistingUser[] = await listUsers()
        setUsers(data.reverse())
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [backendName])

  return (
          <Container
        className={`user-interface ${backendName} w-full max-w-md p-4 my-4 rounded shadow`}
      >
        <Title>
          ユーザー一覧
        </Title>

        <CreateForm items={users} setItems={setUsers} />

        <div>
          {users.map((user) => (
            <Card
              key={user.id}
            >
            {isExistingUser(user) ? <CardComponent card={user} /> : <div></div>}
            <Flex justify="flex-end">

            <Button
              onClick={async () => {
                if (isExistingUser(user)) {
                  await deleteWrapper<ExistingUser>({
                    item: user,
                    items: users,
                    setItems: setUsers,
                    deleteData: deleteUser,
                  });
                }
              }}
            >
              削除
            </Button>
      </Flex>
            </Card>
          ))}
        </div>
      </Container>
    // </div>
  )
}

export default UserInterface
