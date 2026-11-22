"use server";
import { getOurToken } from "@/lib/auth";

const baseurl = process.env.NEXT_PUBLIC_BASE_URL;

export async function onlinePayment(cartId: string, formData: any) {
  const token = await getOurToken();
  const response = await fetch(
    `${baseurl}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
    {
      method: "POST",
      body: JSON.stringify({ formData }),
      headers: {
        token: token,
        "content-type": "application/json",
      },
    },
  );
  const data = await response.json();
  return data;
}

export async function cashPayment(cartId: string, formData: any) {
  const token = await getOurToken();
  const response = await fetch(`${baseurl}/api/v2/orders/${cartId}`, {
    method: "POST",
    body: JSON.stringify({ formData }),
    headers: {
      token: token,
      "content-type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}
