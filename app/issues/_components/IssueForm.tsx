"use client";
import { ErrorMessage, Spinner } from "@/app/components";
import IssueStatusChooser from "@/app/components/IssueStatusChooser";
import { createIssueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";


type IssueFormData = z.infer<typeof createIssueSchema>;

interface Props {
  issue?: Issue;
}
const IssueForm = ({ issue }: Props) => {
  const [error, setError] = useState("");
  //set up the Hook Form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(createIssueSchema),
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const lastPath = pathname.substring(pathname.lastIndexOf("/") + 1);

  // set up the autosave feature for the SimpleMDE editor
  /*  const autosavedValue = localStorage.getItem(`smde_issue`) || "";
  const anOptions = useMemo(() => {
    return {
      autosave: {
        enabled: true,
        uniqueId: "issue",
        delay,
      },
    };
  }, [delay]); */

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmit(true);
      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data);
        router.push(`/issues/${issue.id}`);
        router.refresh();
        return;
      }
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
        {lastPath === "edit" && (
          <IssueStatusChooser
            status={issue!.status}
            issueId={issue?.id}
            title={issue?.title}
            description={issue?.description}
          />
        )}
        <TextField.Root defaultValue={issue?.title} {...register("title")} placeholder="Title" />
        {errors.title && <ErrorMessage>{errors.title?.message} </ErrorMessage>}
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => <SimpleMDE placeholder="Description" {...field} id="issue" />}
        />
        {errors.description && <ErrorMessage>{errors.description?.message} </ErrorMessage>}
        <Button>
          {issue ? "Update Issue" : "Submit new issue"} {isSubmit && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
