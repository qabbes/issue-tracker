"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

//prettier-ignore
const statuses: { label: string, value?: Status }[] = [
  {label: "All"},
  {label: "Open", value: "OPEN"},
  {label: "In Progress",value: "IN_PROGRESS"},
  {label: "Closed", value: "CLOSED"},
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setQueryParams = (status: string) => {
    const params = new URLSearchParams();
    if (status) {
      params.append("status", status);
    }
    if (searchParams.get("orderBy")) {
      params.append("orderBy", searchParams.get("orderBy")!);
    }
    if (searchParams.get("sortOrder")) {
      params.append("sortOrder", searchParams.get("sortOrder")!);
    }
    if (searchParams.get("pageSize")) {
      params.append("pageSize", searchParams.get("pageSize")!);
    }
    const query = status === "ALL" && params.size === 0 ? "" : "?" + params.toString();
    router.push(`/issues/${query}`);
  };

  return (
    <Select.Root defaultValue={searchParams.get("status") || ""} onValueChange={setQueryParams}>
      <Select.Trigger placeholder="Filter by status..."></Select.Trigger>
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status?.value} value={status.value ?? "ALL"}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
