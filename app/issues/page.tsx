import { IssueStatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Flex, Table } from "@radix-ui/themes";
import IssuesToolbar from "./IssuesToolbar";
import { Issue, Status } from "@prisma/client";
import Link from "next/link";
import { FaArrowDownShortWide, FaArrowDownWideShort } from "react-icons/fa6";
import Pagination from "../components/Pagination";

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue; sortOrder: "asc" | "desc"; page: string; pageSize: string };
}

const IssuesPage = async ({ searchParams }: Props) => {
  //********************** SETUP SEARCH PARAMS FOR STATUS ************************ */
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden sm:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden sm:table-cell" },
  ];
  //check for typo in query params and returned undefined if status is not a valid status
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;

  //********************** SETUP SEARCH PARAMS FOR ORDERBY ************************ */
  const toggleOrder = () => {
    return !searchParams.sortOrder || searchParams.sortOrder === "desc" ? "asc" : "desc";
  };
  const orderBy = searchParams.orderBy ? { [searchParams.orderBy]: searchParams.sortOrder } : undefined;

  //************************ SETUP SEARCH PARAMS FOR PAGINATION ************************* */
  const page = parseInt(searchParams.page) || 1;
  const pageSize = searchParams.pageSize ? parseInt(searchParams.pageSize) : 10;

  //************************************************************************************* */

  const issues = await prisma.issue.findMany({
    where: { status: status },
    orderBy: orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where: { status } });

  return (
    <>
      <IssuesToolbar />
      <Pagination currentPage={page} itemsCount={issueCount} />
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
    </>
  );
};

export const dynamic = "force-dynamic";
export default IssuesPage;
