import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

const statusColors: Record<Status, { label: string; color: "orange" | "violet" | "green" }> = {
  OPEN: { label: "Open", color: "orange" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  DONE: { label: "Done", color: "green" },
};

interface Props {
  status: Status;
}

const IssueStatusBadge = ({ status }: Props) => {
  return (
    <Badge size="2" color={statusColors[status].color}>
      {statusColors[status].label}
    </Badge>
  );
};

export default IssueStatusBadge;
