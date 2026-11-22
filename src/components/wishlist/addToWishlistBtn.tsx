"use client";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { ProductI } from "@/types/products.type";
import { toast } from "sonner";
import { addProductToWhishlist } from "@/actions/wishlist.action";
import { useRouter } from "next/navigation";

export default function AddToWishlistBtn({ product }: { product: ProductI }) {
  const router = useRouter();
  async function addToWishlist(id: string) {
    try {
      const response = await addProductToWhishlist(id);
      console.log(response);

      toast.success(response.message);
    } catch (error: any) {
      toast.error(error.message);
      router.push("/login");
    }
  }
  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="icon-lg"
        aria-label={`Add ${product.title} to wishlist`}
        className="rounded-full bg-white/90 text-slate-700 shadow-sm hover:bg-white hover:text-rose-500"
        onClick={() => addToWishlist(product._id)}
      >
        <Heart aria-hidden="true" />
      </Button>
    </>
  );
}
