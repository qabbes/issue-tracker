import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import Pagination from "../components/Pagination";
import IssuesToolbar from "./IssuesToolbar";
import IssueTable, { IssueQueryParams } from "./IssueTable";
import { Flex } from "@radix-ui/themes";

interface Props {
  searchParams: IssueQueryParams;
}

const IssuesPage = async ({ searchParams }: Props) => {
  //********************** SETUP SEARCH PARAMS FOR STATUS ************************ */

  //check for typo in query params and returned undefined if status is not a valid status
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;

  //********************** SETUP SEARCH PARAMS FOR ORDERBY ************************ */
  const orderBy = searchParams.orderBy ? { [searchParams.orderBy]: searchParams.sortOrder } : undefined;

  //************************ SETUP SEARCH PARAMS FOR PAGINATION ************************* */
  const page = parseInt(searchParams.page) || 1;
  const pageSize = searchParams.pageSize ? parseInt(searchParams.pageSize) : 5;

  //************************************************************************************* */

  const issues = await prisma.issue.findMany({
    where: { status: status },
    orderBy: orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where: { status } });

  return (
    <Flex direction="column" gap="3">
      <IssuesToolbar />
      <IssueTable issues={issues} searchParams={searchParams} />
      <Pagination currentPage={page} itemsCount={issueCount} />
    </Flex>
  );
};

export const dynamic = "force-dynamic";
export default IssuesPage;
