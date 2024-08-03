"use client";

import Skeleton from "@/app/components/Skeleton";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <Skeleton height="31px" />;
  if (error) return null;

  const assignIssue = async (userId: string) => {
    try {
      await axios.patch(`/api/issues/${issue.id}`, {
        assignedToUserId: userId === "unassigned" ? null : userId,
      });
      toast.success("Assignee updated");
    } catch (error) {
      toast.error("Error updating assignee");
    }
  };

  return (
    <>
      <Select.Root
        size="2"
        onValueChange={assignIssue}
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
      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((response) => response.data),
    staleTime: 1000 * 60, // 60s
    retry: 3,
  });

export default AssigneeSelect;
