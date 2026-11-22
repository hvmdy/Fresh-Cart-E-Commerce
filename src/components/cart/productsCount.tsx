"use client";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import { ProductDetailsI } from "@/types/productDetails.type";
import { updateCartProductQuantity } from "@/actions/cart.actions";
import { useContext, useState } from "react";
import { toast } from "sonner";
import { CartProductI } from "@/types/cart.type";
import { CartContext } from "@/context/cartContext";

export default function ProductsCount() {
  const { setProduct, product } = useContext(CartContext)!;
  async function updateProductQuantity(id: string, count: number) {
    try {
      const response = await updateCartProductQuantity(id, count);
      console.log(response);
      setProduct(response.data.products);
      toast.success(response.message);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="space-y-2">
        <p className="text-sm font-medium">Quantity</p>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex h-11 items-center rounded-lg border border-input">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Decrease quantity "
              disabled={product?.count == 1}
              onClick={() => {
                if (product?._id && product.count != null) {
                  updateProductQuantity(product._id, product.count - 1);
                }
              }}
            >
              <Minus />
            </Button>
            <span className="min-w-10 text-center">1</span>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Increase quantity"
              onClick={() => {
                if (product?.product._id && product.count != null) {
                  updateProductQuantity(product.product._id, product.count + 1);
                }
              }}
            >
              <Plus />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
