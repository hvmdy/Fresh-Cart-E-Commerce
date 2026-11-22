import { Card, CardContent } from "../ui/card";
import { Lock, Package, ShoppingBag, Tag, Truck } from "lucide-react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { CartDataI } from "@/types/cart.type";
import { useContext } from "react";
import { CartContext } from "@/context/cartContext";
import Link from "next/link";
import Image from "next/image";

export default function OrderSummary({
  cartData,
  isCheckOut,
}: {
  cartData: CartDataI | null;
  isCheckOut: boolean;
}) {
  const { noOfCartItems } = useContext(CartContext)!;
  return (
    <>
      <div className="col-span-12 lg:col-span-4">
        <Card className="gap-0 overflow-hidden rounded-2xl py-0 shadow-sm">
          <div className="bg-primary p-5 text-primary-foreground">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <ShoppingBag className="size-5" />
              Order Summary
            </h2>
            <p className="mt-1 text-sm">{noOfCartItems} item in your cart</p>
          </div>

          <CardContent className="space-y-4 p-5">
            {isCheckOut ? (
              <div className="h-72 overflow-y-auto px-4">
                {cartData?.data.products.map((product) => (
                  <div
                    className="bg-gray-100 rounded-2xl my-2 p-3"
                    key={product._id}
                  >
                    <div className="flex justify-between items-center">
                      <Image
                        className="w-[10%]"
                        src={product.product.imageCover}
                        alt={product.product.title}
                        width={200}
                        height={200}
                      />
                      <div className="flex flex-col">
                        <h2>
                          {product.product.title
                            .split(" ")
                            .slice(0, 2)
                            .join(" ")}
                        </h2>
                        <p>
                          {product.count} x {product.price}
                        </p>
                      </div>
                      <h2 className="font-bold">
                        {product.count * product.price} EGP
                      </h2>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2 rounded-xl bg-orange-50 p-4">
                <p className="flex items-center gap-2 text-sm">
                  <Truck className="size-4 text-orange-500" />
                  Free EGP for free shipping
                </p>
                <div className="h-2 rounded-full bg-orange-100">
                  <div className="h-full w-full rounded-full bg-orange-500" />
                </div>
              </div>
            )}

            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{cartData?.data.totalCartPrice} EGP</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>Free</span>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <span className="font-semibold">Total</span>
              <span className="text-2xl font-bold">
                {cartData?.data.totalCartPrice}{" "}
                <span className="text-sm font-normal text-muted-foreground">
                  EGP
                </span>
              </span>
            </div>

            {isCheckOut ? (
              <>
                <Button size="lg" className="h-12 w-full mt-8">
                  <Package size={32} color="white" />
                  Place Order
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" className="h-12 w-full border-dashed">
                  <Tag />
                  Apply Promo Code
                </Button>

                <Link href={"/checkout"}>
                  <Button size="lg" className="h-12 w-full">
                    <Lock />
                    Secure Checkout
                  </Button>
                </Link>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
