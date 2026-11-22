"use client";
import React from "react";
import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer/footer";
import { Toaster } from "sonner";
import AuthContextProvider from "@/context/authContext";
import CartContexProvider from "@/context/cartContext";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
export default function ProviderComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthContextProvider>
      <CartContexProvider>
        <Provider store={store}>
          <Navbar />
          <Toaster position="top-center" duration={3000} richColors />
          <main className="flex flex-1 flex-col">{children}</main>
          <Footer />
        </Provider>
      </CartContexProvider>
    </AuthContextProvider>
  );
}
