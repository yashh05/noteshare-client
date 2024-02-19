import { Role } from "@/tsTypes";
import z from "zod";

export const addNewDocSchema = z.object({
  addNewDocName: z
    .string({ required_error: "Enter Name" })
    .min(1, "Enter Document Name"),
  addNewDocDesc: z.string().optional(),
});

export const addNewUserSchema = z.object({
  email: z.string({ required_error: "Enter Email" }).email("Enter Valid Email"),
  role: z.custom<Role>(),
});

export const signInSchema = z.object({
  email: z
    .string({ required_error: "Enter your email" })
    .email("Invalid email"),
  password: z
    .string({ required_error: "Enter your password" })
    .min(6, "Password should be atleast 6 digits"),
});
