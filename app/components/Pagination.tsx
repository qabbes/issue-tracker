import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { MdKeyboardDoubleArrowLeft, MdOutlineDoubleArrow } from "react-icons/md";
import { RxDoubleArrowLeft } from "react-icons/rx";

interface Props {
  itemsCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ currentPage, pageSize, itemsCount }: Props) => {
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount <= 1) return null;
  return (
    <Flex align="center" gap="3">
      <Text size="2">
        Page {currentPage} of {pageCount}
      </Text>
      <Button color="gray" variant="ghost" radius="full" disabled={currentPage === 1}>
        <DoubleArrowLeftIcon />
      </Button>
      <Button color="gray" variant="ghost" radius="full" disabled={currentPage === 1}>
        <ChevronLeftIcon />
      </Button>
      <Button color="gray" variant="ghost" radius="full" disabled={currentPage === pageCount}>
        <ChevronRightIcon />
      </Button>
      <Button color="gray" variant="ghost" radius="full" disabled={currentPage === pageCount}>
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
