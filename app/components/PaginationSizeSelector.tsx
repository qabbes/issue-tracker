"use client";
import { Flex, Select, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface Props {
  onPageSizeChange: (pageSize: string) => void;
}

const PaginationSizeSelector = ({ onPageSizeChange }: Props) => {
  const [pageSize, setPageSize] = useState("");
  const searchParams = useSearchParams();
  const pageSizeParam = searchParams.get("pageSize");

  const pageSizes: { label: string; value: string }[] = [
    { label: "5", value: "5" },
    { label: "10", value: "10" },
    { label: "50", value: "50" },
    { label: "All", value: "All" },
  ];

  const handlePageSizeChange = (pageSize: string) => {
    setPageSize(pageSize);
    onPageSizeChange(pageSize);
  };

  return (
    <Flex align="center" gap="3">
      <Text size="2">Items per page:</Text>
      <Select.Root size="1" value={pageSizeParam ? pageSizeParam : pageSize} onValueChange={handlePageSizeChange}>
        <Select.Trigger placeholder="Items per page:"></Select.Trigger>
        <Select.Content>
          {pageSizes.map((pageSize) => (
            <Select.Item key={pageSize.label} value={pageSize.value}>
              {pageSize.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </Flex>
  );
};

export default PaginationSizeSelector;
