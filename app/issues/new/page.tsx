"use client";
import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useMemo } from "react";

const NewIssuePage = () => {
  const delay = 1000;
  const autosavedValue = localStorage.getItem(`smde_issue`) || "";
  const anOptions = useMemo(() => {
    return {
      autosave: {
        enabled: true,
        uniqueId: "issue",
        delay,
      },
    };
  }, [delay]);
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="Title">
        <TextField.Slot />
      </TextField.Root>
      <SimpleMDE placeholder="Description" id="issue" value={autosavedValue} options={anOptions} />
      <Button className="bg-blue-500 text-white p-2 rounded">Submit new issue</Button>
    </div>
  );
};

export default NewIssuePage;
