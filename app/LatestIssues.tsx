import prisma from "@/prisma/client";
import { Avatar, Box, Card, Flex, Heading, Table } from "@radix-ui/themes";
import React from "react";
import { IssueStatusBadge } from "./components";
import Link from "next/link";

const LatestIssues = async () => {
  const latestIssues = await prisma.issue.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });

  return (
    <Card>
      <Heading size="3" mb="2">
        Latest Issues
      </Heading>
      <Box pb="1">
        <Table.Root>
          <Table.Body>
            {latestIssues.map((issue) => (
              <Table.Row key={issue.id}>
                <Table.RowHeaderCell>
                  <Flex justify="between">
                    <Flex direction="column" align="start" gap="2">
                      <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                      <Flex>
                        <IssueStatusBadge status={issue.status} />
                      </Flex>
                    </Flex>
                    <Box pt="0.6rem">
                      {issue.assignedToUserId && (
                        <Avatar
                          size="2"
                          radius="full"
                          src={issue.assignedToUser?.image!}
                          fallback={issue.assignedToUser?.name!.charAt(0)!}></Avatar>
                      )}
                    </Box>
                  </Flex>
                </Table.RowHeaderCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </Card>
  );
};

export default LatestIssues;
