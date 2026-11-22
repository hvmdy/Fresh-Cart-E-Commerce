"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { loginSchema, LoginSchemaType } from "@/lib/schemas/Auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Login() {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<LoginSchemaType>({
    mode: "all",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleUserLogin(value: LoginSchemaType) {
    const response = await signIn("credentials", {
      email: value?.email,
      password: value?.password,
      redirect: false,
    });
    if (response?.ok) {
      toast.success("Login Successfully");
      router.push("/products");
    } else {
      toast.error("Incorrect email or password");
    }
  }
  return (
    <>
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <span className="text-3xl font-bold text-emerald-600">
            Fresh<span className="text-gray-800">Cart</span>
          </span>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back!</h1>
        <p className="text-gray-600">
          Sign in to continue your fresh shopping experience
        </p>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit(handleUserLogin)}>
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor={field.name}
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email Address
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Enter your email"
                type="email"
                className="rounded-sm py-2 bg-white border-[#99a1af]  focus-visible:border-[#16a34a] h-14 "
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
              <div className="flex items-center justify-between mb-2">
                <FieldLabel
                  htmlFor={field.name}
                  className="block text-sm font-semibold text-gray-700 "
                >
                  Email Address
                </FieldLabel>
                <Link
                  href={"/forget-password"}
                  className="text-sm text-emerald-600 hover:text-emerald-700 cursor-pointer font-medium"
                >
                  Forget Password?
                </Link>
              </div>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Enter your password"
                type="password"
                className="rounded-sm py-2 bg-white border-[#99a1af]  focus-visible:border-[#16a34a] h-14 "
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button
          variant={"default"}
          type="submit"
          className="w-full rounded-md h-10 font-semibold text-lg shadow-lg py-3 px-4"
        >
          {isSubmitting ? <Spinner></Spinner> : "Sign In"}
        </Button>
      </form>
    </>
  );
}
