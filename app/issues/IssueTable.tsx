import { Table, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { FaArrowDownShortWide, FaArrowDownWideShort } from "react-icons/fa6";
import { IssueStatusBadge } from "../components";
import { Issue, Status } from "@prisma/client";

export interface IssueQueryParams {
  status: Status;
  orderBy: keyof Issue;
  sortOrder: "asc" | "desc";
  page: string;
  pageSize: string;
}

interface Props {
  issues: Issue[];
  searchParams: IssueQueryParams;
}

const IssueTable = ({ issues, searchParams }: Props) => {
  const toggleOrder = () => {
    return !searchParams.sortOrder || searchParams.sortOrder === "desc" ? "asc" : "desc";
  };

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell key={column.value} className={column.className}>
              <Link
                href={{
                  query: { ...searchParams, orderBy: column.value, sortOrder: toggleOrder() },
                }}>
                {column.label}
              </Link>
              {column.value === searchParams.orderBy &&
                (searchParams.sortOrder === "asc" ? (
                  <FaArrowDownShortWide className="inline ml-1" />
                ) : (
                  <FaArrowDownWideShort className="inline ml-1 " />
                ))}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.RowHeaderCell>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              <Flex className="block sm:hidden">
                <IssueStatusBadge status={issue.status} />
              </Flex>
            </Table.RowHeaderCell>
            <Table.Cell className="hidden sm:table-cell">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden sm:table-cell">{issue.createdAt.toLocaleDateString()}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden sm:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden sm:table-cell" },
];

export default IssueTable;
