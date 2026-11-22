import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

interface userData {
  name: string;
  email: string;
  role: string;
}

declare module "next-auth" {
  interface User {
    user: userData;
    token: string;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    user: userData;
  }
}
