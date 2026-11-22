import Link from "next/link";
import {
  Gift,
  LogOut,
  Mail,
  Phone,
  Truck,
  UserPlus,
  UserRound,
} from "lucide-react";

import { Spinner } from "@/components/ui/spinner";

export function NavbarPromoBar({
  sessionStatus,
  userName,
  onSignOut,
}: {
  sessionStatus: "loading" | "authenticated" | "unauthenticated";
  userName?: string | null;
  onSignOut: () => void;
}) {
  return (
    <div className="border-b border-slate-100 bg-slate-50 text-xs text-slate-600">
      <div className="mx-auto flex min-h-9 max-w-7xl items-center justify-center gap-4 px-4 sm:justify-between sm:px-6 lg:px-8 ">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <Truck aria-hidden="true" className="size-3.5 text-emerald-600" />
            Free Shipping on Orders 500 EGP
          </span>
          <span className="hidden items-center gap-1.5 whitespace-nowrap sm:flex">
            <Gift aria-hidden="true" className="size-3.5 text-emerald-600" />
            New Arrivals Daily
          </span>
        </div>
        <div className="hidden items-center gap-4 lg:flex">
          <a
            href="tel:+18001234567"
            className="flex items-center gap-1.5 hover:text-emerald-700"
          >
            <Phone aria-hidden="true" className="size-3.5" />
            +1 (800) 123-4567
          </a>
          <a
            href="mailto:support@freshcart.com"
            className="flex items-center gap-1.5 hover:text-emerald-700"
          >
            <Mail aria-hidden="true" className="size-3.5" />
            support@freshcart.com
          </a>
          {sessionStatus === "loading" ? (
            <Spinner />
          ) : sessionStatus === "authenticated" ? (
            <>
              <Link
                href="/products"
                className="flex items-center gap-1.5 hover:text-emerald-700"
              >
                <UserRound aria-hidden="true" className="size-3.5" />
                {userName}
              </Link>
              <button
                type="button"
                onClick={onSignOut}
                className="flex items-center gap-1.5 hover:text-red-700"
              >
                <LogOut aria-hidden="true" className="size-3.5" />
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="flex items-center gap-1.5 hover:text-emerald-700"
              >
                <UserRound aria-hidden="true" className="size-3.5" />
                Sign In
              </Link>
              <Link
                href="/register"
                className="flex items-center gap-1.5 hover:text-emerald-700"
              >
                <UserPlus aria-hidden="true" className="size-3.5" />
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
