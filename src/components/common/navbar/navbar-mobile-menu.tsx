import Link from "next/link";
import { Headset, Menu, X } from "lucide-react";

import { PrimaryLinks } from "./navbar-links";

export function MobileMenu() {
  return (
    <details className="group relative md:hidden">
      <summary className="grid size-9 cursor-pointer list-none place-items-center rounded-full text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700 [&::-webkit-details-marker]:hidden">
        <Menu aria-hidden="true" className="size-5 group-open:hidden" />
        <X aria-hidden="true" className="hidden size-5 group-open:block" />
        <span className="sr-only">Toggle navigation menu</span>
      </summary>
      <div className="absolute right-0 top-11 z-50 w-64 rounded-xl border border-slate-200 bg-white p-3 shadow-xl">
        <PrimaryLinks mobile />
        <Link
          href="mailto:support@freshcart.com"
          className="mt-1 flex items-center gap-2 rounded-md px-2 py-2 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
        >
          <Headset aria-hidden="true" className="size-4 text-emerald-600" />
          Support 24/7 Help
        </Link>
      </div>
    </details>
  );
}
