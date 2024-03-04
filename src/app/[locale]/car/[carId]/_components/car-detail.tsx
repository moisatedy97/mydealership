"use client";

import { Card, Heading, Table, Text } from "@radix-ui/themes";
import { Tables } from "../../../../../../types/database.types";
import { CarCarousel } from "./car-carousel";
import "./css/embla.css";

type CarDetailProps = {
  data: Tables<"Car">;
};

export default function CarDetail({ data }: CarDetailProps) {
  return (
    <div className="gap-4 md:flex">
      <div className="md:w-1/4">
        <Card>
          <Heading size="6" as="h1" className="mb-3">
            Filters
          </Heading>
          <CarDetailSummary data={data} />
        </Card>
      </div>
      <div className="md:w-3/4">
        <Card>
          <Heading size="6" as="h1" className="mb-3">
            {data.title}
          </Heading>
          <Text color="gray">{data.description}</Text>
          <CarCarousel slides={data.images} />
        </Card>
      </div>
    </div>
  );
}

const CarDetailSummary = ({ data }: CarDetailProps) => {
  const tableData = [
    {
      title: "year",
      value: data.year,
    },
    {
      title: "Price",
      value: data.price,
    },
    {
      title: "torque",
      value: data.torque,
    },
    {
      title: "Km",
      value: data.km,
    },
    {
      title: "km per liter city",
      value: data.kmPerLiterCity,
    },
    {
      title: "km per liter highway",
      value: data.kmPerLiterHighway,
    },
    {
      title: "engine type",
      value: data.engineType,
    },
    {
      title: "trasmission type",
      value: data.transmissionType,
    },
    {
      title: "fuel Type",
      value: data.fuelType,
    },
    {
      title: "Status",
      value: data.status,
    },
  ];

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>label</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>data</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {tableData.map((value, index: number) => (
          <Table.Row key={index}>
            <Table.RowHeaderCell>{value.title}</Table.RowHeaderCell>
            <Table.Cell>{value.value}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
