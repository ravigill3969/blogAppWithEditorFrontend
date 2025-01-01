import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" }),
  // .max(20, { message: "Username cannot exceed 20 characters" })
  // .regex(/^[a-zA-Z0-9_]+$/, {
  //   message: "Username can only contain letters, numbers, and underscores",
  // }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(1, { message: "Password must be at least 8 characters long" }),
  // .regex(/[A-Z]/, {
  //   message: "Password must contain at least one uppercase letter",
  // })
  // .regex(/[a-z]/, {
  //   message: "Password must contain at least one lowercase letter",
  // })
  // .regex(/[0-9]/, { message: "Password must contain at least one number" })
  // .regex(/[@$!%*?&]/, {
  //   message: "Password must contain at least one special character (@$!%*?&)",
  // }),
});

// Infer the TypeScript type for the schema
export type RegisterFormValues = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Please enter the usrname" }),
  // .max(20, { message: "Username cannot exceed 20 characters" })
  // .regex(/^[a-zA-Z0-9_]+$/, {
  //   message: "Username can only contain letters, numbers, and underscores",
  // }),
  password: z
    .string()
    .min(1, { message: "Please enter the password" }),
  // .regex(/[A-Z]/, {
  //   message: "Password must contain at least one uppercase letter",
  // })
  // .regex(/[a-z]/, {
  //   message: "Password must contain at least one lowercase letter",
  // })
  // .regex(/[0-9]/, { message: "Password must contain at least one number" })
  // .regex(/[@$!%*?&]/, {
  //   message: "Password must contain at least one special character (@$!%*?&)",
  // }),
});

// Infer the TypeScript type for the schema
export type LoginFormValues = z.infer<typeof loginSchema>;
