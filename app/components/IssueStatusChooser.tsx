"use client";
import { Issue, Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import IssueStatusBadge from "./IssueStatusBadge";

interface Props {
  title?: Issue["title"];
  description?: Issue["description"];
  issueId?: Issue["id"];
  status: Issue["status"];
}

const IssueStatusChooser = ({ status, issueId, title, description }: Props) => {
  const [currentStatus, setCurrentStatus] = useState(status);
  const router = useRouter();

  const changeStatus = async (status: Status) => {
    const previousStatus = currentStatus;
    try {
      // call setCurrentStatus with new status (optimistic update)
      setCurrentStatus(status);
      // make API PATCH call to update status
      await axios.patch(`/api/issues/${issueId}`, { title, description, status });
      router.refresh();
    } catch (err) {
      // revert setCurrentStatus to previousStatus status if update fails
      setCurrentStatus(previousStatus);
      console.error(err);
    }
  };
  return (
    <Select.Root value={status} onValueChange={(status: Status) => changeStatus(status)}>
      <Select.Trigger placeholder="Status" />
      <Select.Content>
        {Object.values(Status).map((status) => (
          <Select.Item key={status} value={status}>
            <IssueStatusBadge status={status} />
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusChooser;
