import React from "react"
import Link from "next/link"
import { Card } from "../definitions"

const CardComponent: React.FC<{ card: Card }> = ({ card }) => {
  return (
    <Link href={`/users/edit/${card.id}`} passHref>
      <div className="bg-white shadow-lg rounded-lg p-2 mb-2 hover:bg-gray-100 cursor-pointer">
        <div className="text-sm text-gray-600">ID: {card.id}</div>
        <div className="text-lg font-semibold text-gray-800">{card.name}</div>
        <div className="text-md text-gray-700">{card.email}</div>
      </div>
    </Link>
  )
}

export default CardComponent
