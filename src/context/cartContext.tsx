"use client";
import { getLoggedUserCart } from "@/actions/cart.actions";
import { CartDataI, CartProductI } from "@/types/cart.type";
import { useSession } from "next-auth/react";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type cartContextType = {
  noOfCartItems: number;
  handleCart: () => void;
  setProduct: Dispatch<SetStateAction<CartProductI | null>>;
  product: CartProductI | null;
  setNoOfCartItems: Dispatch<SetStateAction<number>>;
};
export const CartContext = createContext<cartContextType | null>(null);
export default function CartContexProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [noOfCartItems, setNoOfCartItems] = useState(0);
  const { status } = useSession();
  const [product, setProduct] = useState<CartProductI | null>(null);

  async function handleCart() {
    try {
      const response: CartDataI = await getLoggedUserCart();
      const noOfItems = response.data.products.reduce(
        (acc, product) => acc + product.count,
        0,
      );
      setNoOfCartItems(noOfItems);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (status === "authenticated") {
      handleCart();
    }
  }, [status]);
  return (
    <>
      <CartContext.Provider
        value={{
          noOfCartItems,
          handleCart,
          setProduct,
          product,
          setNoOfCartItems,
        }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
}
