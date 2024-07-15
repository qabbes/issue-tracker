"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { FaRegTrashCan } from "react-icons/fa6";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Spinner } from "@/app/components";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const [error, setError] = useState(false);
  const router = useRouter();
  const [isDeleting, setisDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setisDeleting(true);
      await axios.delete("/api/issues/" + issueId);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setisDeleting(false);
      setError(true);
      console.error(error);
    }
  };
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="crimson" disabled={isDeleting}>
          <FaRegTrashCan />
          {isDeleting ? "Deleting Issue..." : "Delete Issue"} {isDeleting && <Spinner />}
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title className="text-center">Confirm Delete</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete this issue? This action cannot be undone.
        </AlertDialog.Description>
        <Flex gap="4" mt="4" justify="center">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="crimson" onClick={handleDelete}>
              Delete Issue
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title className="text-center">Error</AlertDialog.Title>
          <AlertDialog.Description> There was an error deleting the issue.</AlertDialog.Description>
          <Flex justify="center">
            <Button variant="solid" color="crimson" onClick={() => setError(false)} mt="2">
              Close
            </Button>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </AlertDialog.Root>
  );
};

export default DeleteIssueButton;
