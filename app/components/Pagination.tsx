"use client";
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import PaginationSizeSelector from "./PaginationSizeSelector";

interface Props {
  itemsCount: number;
  currentPage: number;
}

const Pagination = ({ currentPage, itemsCount }: Props) => {
  const [pageSize, setPageSize] = useState("5");
  const router = useRouter();
  const searchParams = useSearchParams();

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };

  const handlePageSizeChange = (pageSize: string) => {
    setPageSize(pageSize);
    const params = new URLSearchParams(searchParams);
    params.set("pageSize", pageSize);
    router.push("?" + params.toString());
  };

  const pageCount = Math.ceil(itemsCount / parseInt(pageSize));

  if (pageCount < 1) return null;
  return (
    <Flex align="center" gap="3">
      <Text size="2">
        Page {currentPage} of {pageCount}
      </Text>
      <Button color="gray" variant="ghost" radius="full" disabled={currentPage === 1} onClick={() => changePage(1)}>
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        color="gray"
        variant="ghost"
        radius="full"
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}>
        <ChevronLeftIcon />
      </Button>
      <Button
        color="gray"
        variant="ghost"
        radius="full"
        disabled={currentPage === pageCount}
        onClick={() => changePage(currentPage + 1)}>
        <ChevronRightIcon />
      </Button>
      <Button
        color="gray"
        variant="ghost"
        radius="full"
        disabled={currentPage === pageCount}
        onClick={() => changePage(pageCount)}>
        <DoubleArrowRightIcon />
      </Button>
      <Flex ml="auto">
        <PaginationSizeSelector onPageSizeChange={handlePageSizeChange} />
      </Flex>
    </Flex>
  );
};

export default Pagination;
