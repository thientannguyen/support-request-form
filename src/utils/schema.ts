import { z } from "zod";

const supportFormSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .max(100, "Full name must be at most 100 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: "Invalid email address",
    }),
  issueType: z.string().min(1, { message: "Please select an issue type" }),
  tags: z
    .array(z.string())
    .min(1, { message: "Please select at least one tag" }),
  stepsToReproduce: z
    .array(
      z.object({
        step: z.string().min(1, { message: "Step description is required" }),
      })
    )
    .min(1, { message: "Please add at least one step to reproduce" }),
});

export default supportFormSchema;
