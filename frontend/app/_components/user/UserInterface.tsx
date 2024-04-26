"use client"
import React, { useState, useEffect } from "react"
import CardComponent from "@/_components/CardComponent"
import { CreateForm } from "@/_components/user/CreateForm"
import type { UserInterfaceProps, ExistingUser } from "@/definitions"
import { isExistingUser } from "@/definitions"
import { listUsers, deleteWrapper, deleteUser } from "@/_services/userService"
import { Container, Title, Button, Card, Flex, Group, Box } from "@mantine/core"
import { T } from "@/_intl/T"
import { DeleteConfirmation } from "@/_components/DeleteConfirmation"
import { useNotification } from "@/_utils/_hooks/notifications"

const UserInterface: React.FC<UserInterfaceProps> = ({ backendName }) => {
  const [users, setUsers] = useState<ExistingUser[]>([])
  const [modalUserId, setModalUserId] = useState<string>("")
  const { notifySuccess } = useNotification()

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

  const handleDelete = async (userId: any) => {
    const user = users.find((u) => u.id === userId)
    if (user) {
      await deleteWrapper({
        item: user,
        items: users,
        setItems: setUsers,
        deleteData: deleteUser,
      })
      setModalUserId("")
      notifySuccess("削除されました。")
    }
  }
  const handleClose = () => {
    setModalUserId("")
  }

  return (
    <Container
      className={`user-interface ${backendName} w-full max-w-md p-4 my-4 rounded shadow`}
    >
      <Title>
        <T id="Users" />
      </Title>
      <CreateForm items={users} setItems={setUsers} />
      <div>
        {users.map((user) => (
          <Card key={user.id}>
            {isExistingUser(user) ? <CardComponent card={user} /> : <div></div>}
            <Flex justify="flex-end">
              <Button onClick={() => setModalUserId(user.id)}>
                <T id="Delete" />
              </Button>
            </Flex>
            {modalUserId === user.id && (
              <DeleteConfirmation
                onDelete={() => handleDelete(user.id)}
                onClose={handleClose}
              />
            )}
          </Card>
        ))}
      </div>
    </Container>
  )
}

export default UserInterface
