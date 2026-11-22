"use client";
import { Card, CardContent } from "../ui/card";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

import { CartDataI, CartProductI } from "@/types/cart.type";
import Image from "next/image";
import {
  removeProductFromCart,
  updateCartProductQuantity,
} from "@/actions/cart.actions";
import { toast } from "sonner";
import { useContext } from "react";
import { CartContext } from "@/context/cartContext";

export default function CartItem({
  product,
  setProducts,
  setCartData,
}: {
  product: CartProductI;
  setProducts: (products: CartProductI[]) => void;
  setCartData: (cartData: CartDataI) => void | null;
}) {
  const quantityButtonDisabledStyles =
    "disabled:pointer-events-auto disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:opacity-100 disabled:hover:bg-muted disabled:hover:text-muted-foreground";

  const { handleCart } = useContext(CartContext)!;

  async function deletItem(id: string) {
    try {
      const response = await removeProductFromCart(id);
      setProducts(response.data.products);
      toast.success(response.message);
      setCartData(response);
      handleCart();
    } catch (error) {
      toast.error("Error in Delete Product");
    }
  }

  async function updateProductQuantity(id: string, count: number) {
    try {
      const response = await updateCartProductQuantity(id, count);
      setProducts(response.data.products);
      toast.success(response.message);
      setCartData(response);
      handleCart();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Card className="rounded-2xl py-0 shadow-sm">
        <CardContent className="flex flex-col gap-4 p-5 sm:flex-row">
          <div className="flex size-28 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
            <Image
              src={product.product.imageCover}
              alt={product.product.title}
              width={200}
              height={200}
            />
          </div>

          <div className="flex-1 space-y-3">
            <div>
              <h2 className="text-lg font-semibold">{product.product.title}</h2>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <span className="rounded-full bg-primary/10 px-3 py-0.5 text-primary">
                  {product.product.category.name}
                </span>
                <span>SKU: 5CA0A1</span>
              </div>
            </div>

            <p className="font-bold text-primary">
              {product.price} EGP{" "}
              <span className="text-sm font-normal text-muted-foreground">
                per unit
              </span>
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 rounded-lg border border-input p-1">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Decrease quantity"
                  className={quantityButtonDisabledStyles}
                  disabled={product.count == 1}
                  onClick={() =>
                    updateProductQuantity(
                      product.product._id,
                      product.count - 1,
                    )
                  }
                >
                  <Minus />
                </Button>
                <span className="min-w-6 text-center font-medium">
                  {product.count}
                </span>
                <Button
                  size="icon-sm"
                  aria-label="Increase quantity"
                  className={quantityButtonDisabledStyles}
                  onClick={() =>
                    updateProductQuantity(
                      product.product._id,
                      product.count + 1,
                    )
                  }
                >
                  <Plus />
                </Button>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Total</p>
                  <p className="text-xl font-bold">
                    {product.price * product.count}{" "}
                    <span className="text-sm font-normal text-muted-foreground">
                      EGP
                    </span>
                  </p>
                </div>
                <Button
                  variant="destructive"
                  size="icon-lg"
                  aria-label="Remove Woman Shawl"
                  onClick={() => deletItem(product.product._id)}
                >
                  <Trash2 />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
