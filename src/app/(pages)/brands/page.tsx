import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

export default async function Brands() {
  const session = await getServerSession(authOptions);
  return <div>Brands</div>;
}
