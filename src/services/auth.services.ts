import { LoginSchemaType } from "./../lib/schemas/Auth.schema";
import { RegisterSchemaType } from "@/lib/schemas/Auth.schema";

const baseurl = process.env.NEXT_PUBLIC_BASE_URL;

export async function userRegister(formData: RegisterSchemaType) {
  const response = await fetch(`${baseurl}/api/v1/auth/signup`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "content-type": "application/json",
    },
  });

  const data = await response.json();

  return data;
}

export async function userLogin(formData: LoginSchemaType) {
  const response = await fetch(`${baseurl}/api/v1/auth/signin`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "content-type": "application/json",
    },
  });

  const data = await response.json();

  return data;
}
