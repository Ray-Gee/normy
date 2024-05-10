import React from "react";
import Link from "next/link";
import { CardProps } from "@/definitions";
import { Card, Text } from "@mantine/core";
import { T } from "@/_intl/T";

const CardComponent: React.FC<{ card: CardProps }> = ({ card }) => {
  return (
    <Link href={`/users/edit/${card.id}`} passHref>
      <Card
        shadow="sm"
        p="md"
        component="a"
        style={{ textDecoration: "none" }}
        className="mb-2 hover:bg-gray-100 cursor-pointer"
      >
        <Text size="lg">
          {<T id="Name" />}: {card.name}
        </Text>
        <Text size="md">
          {<T id="Email" />}: {card.email}
        </Text>
      </Card>
    </Link>
  );
};

export default CardComponent;
