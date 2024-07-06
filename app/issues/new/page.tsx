"use client";
import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useMemo } from "react";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  //set up the Hook Form
  const { register, handleSubmit, control } = useForm<IssueForm>();
  // set up the autosave feature for the SimpleMDE editor
  const router = useRouter();
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
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/api/issues", data);
        router.push("/issues");
      })}>
      <TextField.Root {...register("title")} placeholder="Title" />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} id="issue" value={autosavedValue} options={anOptions} />
        )}
      />
      <Button className="bg-blue-500 text-white p-2 rounded">Submit new issue</Button>
    </form>
  );
};

export default NewIssuePage;
