import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getOurToken() {
  const token = (await cookies()).get("next-auth.session-token")?.value;

  if (!token) {
    throw new Error("Please login to add product to cart");
  }

  const decodedToken = await decode({
    token: token,
    secret: process.env.AUTH_SECRET!,
  });

  return decodedToken!.token as string;
}
