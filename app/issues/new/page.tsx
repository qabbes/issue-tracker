"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const [error, setError] = useState("");
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
    <div className=" max-w-xl">
      {error && (
        <Callout.Root className="mb-5 " color="red" role="alert">
          <Callout.Icon>
            <ExclamationTriangleIcon />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="max-w-xl space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            if (error instanceof Error) {
              setError(error.message);
            } else {
              // Handle the case where the error is not an Error object
              setError("An unknown error occurred");
            }
          }
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
    </div>
  );
};

export default NewIssuePage;
