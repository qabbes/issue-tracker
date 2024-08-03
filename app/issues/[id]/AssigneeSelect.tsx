"use client";

import Skeleton from "@/app/components/Skeleton";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  // prettier-ignore
  const {data: users,error,isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/users").then((response) => response.data),
    staleTime: 1000 * 60, // 60s
    retry: 3,
  });

  if (isLoading) return <Skeleton height="31px" />;
  if (error) return null;

  return (
    <Select.Root
      size="2"
      onValueChange={(userId: string) => {
        axios.patch(`/api/issues/${issue.id}`, { assignedToUserId: userId === "unassigned" ? null : userId });
      }}
      defaultValue={issue.assignedToUserId ? issue.assignedToUserId : ""}>
      <Select.Trigger placeholder="Assign to..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="unassigned">{issue.assignedToUserId ? "Unassign user" : "Unassigned"}</Select.Item>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
