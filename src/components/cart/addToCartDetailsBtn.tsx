"use client";
import { addProductToCart } from "@/actions/cart.actions";
import { CartContext } from "@/context/cartContext";
import { ProductDetailsI } from "@/types/productDetails.type";
import { ShoppingCart } from "lucide-react";

import { useContext, useState } from "react";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { Button } from "../ui/button";

export default function AddToCartDetailsBtn({
  product,
  productId,
}: {
  product: ProductDetailsI;
  productId: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { handleCart } = useContext(CartContext)!;
  async function addToCart(id: string) {
    setIsLoading(true);
    try {
      const response = await addProductToCart(id);
      toast.success(response.message);
      handleCart();
    } catch (error) {
      toast.error("Product failed to add to you cart");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      {/* <Button className="h-12 gap-2" disabled={product.quantity < 1}>
        <ShoppingCart />
        Add to Cart
      </Button> */}
      <Button
        type="button"
        className="h-12 gap-2"
        disabled={product.quantity < 1}
        onClick={() => {
          addToCart(productId);
        }}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <ShoppingCart />
            Add to Cart
          </>
        )}
      </Button>
    </>
  );
}
