"use client";
import {
  ArrowLeft,
  MoveRight,
  PackageOpen,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import CartItem from "@/components/cart/cartItem";
import OrderSummary from "@/components/cart/orderSummary";
import { clearUserCart, getLoggedUserCart } from "@/actions/cart.actions";
import { useContext, useEffect, useState } from "react";
import { CartDataI, CartProductI } from "@/types/cart.type";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { CartContext } from "@/context/cartContext";

export default function CartPage() {
  const [products, setProducts] = useState<CartProductI[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cartData, setCartData] = useState<CartDataI | null>(null);
  const { handleCart, noOfCartItems } = useContext(CartContext)!;
  async function getCart() {
    setIsLoading(true);
    try {
      const response: CartDataI = await getLoggedUserCart();

      setCartData(response);
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function clearCart() {
    try {
      const response = await clearUserCart();
      setProducts(response.data.products);
      toast.success(response.message);
      handleCart();
    } catch (error) {
      toast.error("Cant Clear Products");
    }
  }

  useEffect(() => {
    getCart();
  }, []);
  if (isLoading) {
    return (
      <>
        <div className="flex flex-col h-screen items-center justify-center gap-4">
          <h2 className="text-6xl">Loading....</h2>
          <Spinner className="size-7" />
        </div>
      </>
    );
  }

  if (products.length === 0) {
    return (
      <>
        <div className="container mx-auto my-auto">
          <div className="flex justify-center items-center flex-col gap-8 mb-3">
            <div className="p-9 rounded-full bg-gray-100 flex items-center justify-center">
              <PackageOpen size={45} color="gray" strokeWidth={3} />
            </div>
            <h2 className="font-bold text-2xl">Your cart is empty</h2>
          </div>
          <div className="flex justify-center items-center flex-col ">
            <p className="font-semibold text-lg text-gray-500 mb-1">
              Looks like you haven't added any thing to you cart yet.
            </p>
            <p className="font-semibold text-lg text-gray-500 mb-7">
              Start exploring our products!
            </p>
            <Link href={"/products"}>
              <Button className="p-6 rounded-xl">
                <p>Start Shopping</p>
                <MoveRight />
              </Button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="container mx-auto my-6 px-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-bold">Shopping Cart</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="my-6">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <ShoppingCart className="size-6" />
          </span>
          <h1 className="font-heading text-3xl font-bold">Shopping Cart</h1>
        </div>
        <p className="mt-2 text-muted-foreground">
          You have{" "}
          <span className="font-semibold text-primary">
            {noOfCartItems} item
          </span>{" "}
          in your cart
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 space-y-4 lg:col-span-8">
          {/* Cart items */}
          {products.map((product) => (
            <CartItem
              key={product._id}
              product={product}
              setProducts={setProducts}
              setCartData={setCartData}
            />
          ))}

          <Separator />
          <div className="flex items-center justify-between">
            <Link
              href="/products"
              className="flex items-center gap-2 text-primary hover:underline"
            >
              <ArrowLeft className="size-4" />
              Continue Shopping
            </Link>
            <Button
              variant="ghost"
              className="text-muted-foreground"
              onClick={() => clearCart()}
            >
              <Trash2 />
              Clear all items
            </Button>
          </div>
        </div>

        {/* Order summary */}
        <OrderSummary cartData={cartData} isCheckOut={false} />
      </div>
    </div>
  );
}
