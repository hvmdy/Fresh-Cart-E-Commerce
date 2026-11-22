import * as z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty("Please enter your name")
      .min(3, "Name is too short"),
    email: z
      .string()
      .nonempty("Please enter your email")
      .email("Invalid email address"),

    password: z
      .string()
      .nonempty("Please enter your password")
      .min(8, "Password must be at least 8 characters long"),
    rePassword: z.string().nonempty("Please confirm your password"),
    phone: z
      .string()
      .nonempty("Please enter your phone number")
      .regex(
        /^(?:01[0125]\d{8}|\+201[0125]\d{8})$/,
        "Enter an Egyptian mobile number, e.g. 01012345678 or +201012345678",
      ),
  })
  .refine(
    (data) => {
      return data.password === data.rePassword;
    },
    {
      path: ["repassword"],
      message: "Passwords not match",
    },
  );

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty("Please enter your email")
    .email("Invalid email address"),
  password: z
    .string()
    .nonempty("Please enter your password")
    .min(8, "Password must be at least 8 characters long"),
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;
export type LoginSchemaType = z.infer<typeof loginSchema>;
