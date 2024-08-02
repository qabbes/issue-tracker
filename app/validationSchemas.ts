import z from "zod";


//prettier-ignore
export const createIssueSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(65535),
});

 //prettier-ignore
export const patchIssueSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255)
    .optional(),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(65535)
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, { message: "Assignee is required" })
    .max(255)
    .optional()
    .nullable(),
});