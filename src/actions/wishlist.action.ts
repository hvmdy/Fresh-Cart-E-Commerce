"use server";
import { getOurToken } from "@/lib/auth";

const baseurl = process.env.NEXT_PUBLIC_BASE_URL;

export async function addProductToWhishlist(productId: string) {
  const token = await getOurToken();
  const response = await fetch(`${baseurl}/api/v1/wishlist`, {
    method: "POST",
    body: JSON.stringify({ productId }),
    headers: {
      token: token,
      "content-type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function removeProductFromwishlist(productid: string) {
  const token = await getOurToken();
  const response = await fetch(`${baseurl}/api/v1/wishlist/${productid}`, {
    method: "DELETE",
    headers: {
      token: token,
      "content-type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function getLoggedUserwishlist() {
  const token = await getOurToken();
  const response = await fetch(`${baseurl}/api/v1/wishlist`, {
    headers: {
      token: token,
      "content-type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}
