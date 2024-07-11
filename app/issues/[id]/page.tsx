import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

import delay from "delay";

interface Props {
  params: { id: string };
}
const IssueDetailPage = async ({ params }: Props) => {
  //if (typeof params.id !== "number") return notFound();

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) return notFound();

  await delay(2000);
  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gap="3" my="2">
        <IssueStatusBadge status={issue.status}></IssueStatusBadge>
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose prose-sm" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default IssueDetailPage;
