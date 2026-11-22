"use client";
import { addProductToCart } from "@/actions/cart.actions";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useContext, useState } from "react";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { CartContext } from "@/context/cartContext";
import { useRouter } from "next/navigation";

export default function AddToCartBtn({ productId }: { productId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const { handleCart } = useContext(CartContext)!;
  const router = useRouter();
  async function addToCart(id: string) {
    setIsLoading(true);
    try {
      const response = await addProductToCart(id);
      toast.success(response.message);
      handleCart();
    } catch (error: any) {
      toast.error(error.message);
      router.push("/login");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Button
      type="button"
      size="icon-lg"
      className="size-10 shrink-0 rounded-full bg-emerald-600 text-white hover:bg-emerald-700"
      onClick={() => {
        addToCart(productId);
      }}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Plus aria-hidden="true" />
        </>
      )}
    </Button>
  );
}
