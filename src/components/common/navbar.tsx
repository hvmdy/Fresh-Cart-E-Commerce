"use client";
import Link from "next/link";
import Image from "next/image";
import { Headset, Heart, ShoppingCart, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import freshcartLogo from "@/assets/freshcart-logo.49f1b44d.svg";
import { signOut, useSession } from "next-auth/react";
import { Spinner } from "../ui/spinner";
import { HeaderIconLink, PrimaryLinks } from "./navbar/navbar-links";
import { MobileMenu } from "./navbar/navbar-mobile-menu";
import { NavbarPromoBar } from "./navbar/navbar-promo-bar";
import { ProductSearch } from "./navbar/navbar-search";
import { Badge } from "../ui/badge";
import { useContext } from "react";
import { CartContext } from "@/context/cartContext";

export default function Navbar() {
  const session = useSession();
  const { noOfCartItems } = useContext(CartContext)!;
  function userSignOut() {
    signOut({ redirect: true, callbackUrl: "/login" });
  }
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white text-slate-900">
      <NavbarPromoBar
        sessionStatus={session.status}
        userName={session.data?.user?.name}
        onSignOut={userSignOut}
      />

      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-3 gap-y-3 px-4 py-3 sm:px-6 lg:flex-nowrap lg:gap-3 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label="FreshCart home"
        >
          <Image
            src={freshcartLogo}
            alt="FreshCart"
            width={160}
            height={31}
            priority
          />
        </Link>

        <div className="hidden min-w-0 flex-1 md:flex">
          <ProductSearch />
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-1 lg:ml-0">
          <div className="hidden lg:block">
            <PrimaryLinks />
          </div>

          <a
            href="mailto:support@freshcart.com"
            className="hidden shrink-0 items-center gap-1.5 rounded-md px-2 py-2 text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700 xl:flex"
          >
            <Headset aria-hidden="true" className="size-4 text-emerald-600" />
            <span className="text-xs leading-tight">
              Support
              <br />
              24/7 Help
            </span>
          </a>

          {session.status == "loading" ? (
            <Spinner />
          ) : session.status === "authenticated" ? (
            <>
              <HeaderIconLink href="/wishlist" label="Wishlist">
                <Heart aria-hidden="true" className="size-5" />
              </HeaderIconLink>

              <HeaderIconLink href="/cart" label="Shopping cart">
                <div className="relative">
                  <ShoppingCart aria-hidden="true" className="size-5" />
                  <Badge
                    variant="default"
                    className="absolute top-[-10px] right-[-10px] text-xs p-1.5"
                  >
                    {noOfCartItems}
                  </Badge>
                </div>
              </HeaderIconLink>

              <HeaderIconLink href="/profile" label="profile">
                <UserRound aria-hidden="true" className="size-5" />
              </HeaderIconLink>
              <Button variant="destructive" onClick={userSignOut}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                asChild
                className="h-10 w-[115px] gap-2 rounded-full bg-emerald-600 text-white hover:bg-emerald-700"
              >
                <Link href="/login">
                  <UserRound aria-hidden="true" className="size-4" />
                  Sign In
                </Link>
              </Button>
            </>
          )}

          <MobileMenu />
        </div>

        <div className="w-full md:hidden">
          <ProductSearch mobile />
        </div>
      </div>

      <div className="mx-auto hidden max-w-7xl px-4 pb-2 sm:px-6 lg:px-8 lg:hidden md:block">
        <PrimaryLinks />
      </div>
    </header>
  );
}
