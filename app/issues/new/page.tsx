"use client";
import dynamic from "next/dynamic";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { createIssueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";

import z from "zod";

// lazy load the SimpleMDE editor
//const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const [error, setError] = useState("");
  //set up the Hook Form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const [isSubmit, setIsSubmit] = useState(false);
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

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmit(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setIsSubmit(false);
      setError("An unknown error occurred");
    }
  });

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
      <form className="max-w-xl space-y-3" onSubmit={onSubmit}>
        <TextField.Root {...register("title")} placeholder="Title" />
        {errors.title && <ErrorMessage>{errors.title?.message} </ErrorMessage>}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} id="issue" value={autosavedValue} options={anOptions} />
          )}
        />
        {errors.description && <ErrorMessage>{errors.description?.message} </ErrorMessage>}
        <Button disabled={isSubmit}>Submit new issue {isSubmit && <Spinner />}</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
