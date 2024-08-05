import Image from 'next/image'
import Pagination from "./components/Pagination";
import PaginationSizeSelector from "./components/PaginationSizeSelector";
import { Flex } from "@radix-ui/themes";
import PaginationRadioSelector from "./components/PaginationRadioSelector";

export default function Home({ searchParams }: { searchParams: { page: string } }) {
  return (
    <>
      <Flex align="center" gap="3"></Flex>
    </>
  );
}
