import { Button } from "@radix-ui/themes";
import { FaRegTrashCan } from "react-icons/fa6";
import Link from "next/link";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button color="crimson">
      <FaRegTrashCan />
      <Link href={`/issues/${issueId}/delete`}>Delete Issue</Link>
    </Button>
  );
};

export default DeleteIssueButton;
