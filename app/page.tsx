import Image from 'next/image'
import Pagination from "./components/Pagination";
import PaginationSizeSelector from "./components/PaginationSizeSelector";
import { Flex } from "@radix-ui/themes";
import PaginationRadioSelector from "./components/PaginationRadioSelector";
import LatestIssues from "./LatestIssues";

export default function Home({ searchParams }: { searchParams: { page: string } }) {
  return <LatestIssues />;
}
