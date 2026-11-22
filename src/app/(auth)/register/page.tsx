"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { registerSchema, RegisterSchemaType } from "@/lib/schemas/Auth.schema";
import { userRegister } from "@/services/auth.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Register() {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<RegisterSchemaType>({
    mode: "all",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });

  async function handleUserRegister(values: RegisterSchemaType) {
    try {
      const response = await userRegister(values);
      if (response.message === "success") {
        toast.success("Account created successfully");
        router.push("/login");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <h2 className="text-center text-3xl font-semibold mb-2 text-[#364153]">
        Create Your Account
      </h2>
      <p className="text-center text-[#364153]">
        Start your fresh journey with us today
      </p>
      <form
        onSubmit={handleSubmit(handleUserRegister)}
        className="space-y-7 mt-10"
      >
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor={field.name}
                className="text-[#364153] font-medium"
              >
                Name*
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Ali"
                type="text"
                className="rounded-sm py-2 bg-white border-[#99a1af]  focus-visible:border-[#16a34a] h-11 "
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor={field.name}
                className="text-[#364153] font-medium"
              >
                Email*
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="ali@example.com"
                type="email"
                className="rounded-sm py-2 bg-white border-[#99a1af]  focus-visible:border-[#16a34a] h-11 "
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor={field.name}
                className="text-[#364153] font-medium"
              >
                Password*
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="create a strong password"
                type="password"
                className="rounded-sm py-2 bg-white border-[#99a1af]  focus-visible:border-[#16a34a] h-11 "
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="rePassword"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor={field.name}
                className="text-[#364153] font-medium"
              >
                Confirm Password*
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="confirm your password"
                type="password"
                className="rounded-sm py-2 bg-white border-[#99a1af]  focus-visible:border-[#16a34a] h-11 "
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="phone"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor={field.name}
                className="text-[#364153] font-medium"
              >
                Phone Number*
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="01012345678 or +201012345678"
                type="tel"
                className="rounded-sm py-2 bg-white border-[#99a1af]  focus-visible:border-[#16a34a] h-11 "
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button
          variant={"default"}
          type="submit"
          className="w-full rounded-md h-10"
        >
          {isSubmitting ? (
            <Spinner></Spinner>
          ) : (
            <>
              <UserPlus size={16} color="white" />
              <span>Create My Account</span>
            </>
          )}
        </Button>
      </form>
      <p className="border-t pt-10 border-gray-300/30 my-4 text-center font-medium">
        Already have an account?
        <Link
          href={"/login"}
          className="text-[#16a34a] hover:underline font-medium"
        >
          Sign In
        </Link>
      </p>
    </>
  );
}
