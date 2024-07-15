import React from "react";
import IssueFormSkeleton from "./IssueFormSkeleton";
import { Box } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";

const EditIssueFormSkeleteon = () => {
  return (
    <>
      <Skeleton width="7rem" height="2rem" />
      <IssueFormSkeleton />
    </>
  );
};

export default EditIssueFormSkeleteon;
