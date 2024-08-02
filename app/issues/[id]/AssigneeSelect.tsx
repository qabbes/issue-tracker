"use client";

import Skeleton from "@/app/components/Skeleton";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// prettier-ignore
const AssigneeSelect = () => {
  const {data: users, error, isLoading} = useQuery({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/xapi/users").then((response) => response.data),
    staleTime: 1000 * 60, // 60s
    retry: 3,
  });

  if(isLoading) return <Skeleton height="31px"/>
  if (error) return null;

  return (
    <Select.Root size="2">
      <Select.Trigger placeholder="Assign to..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
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
