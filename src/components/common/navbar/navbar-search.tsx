import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ProductSearch({ mobile = false }: { mobile?: boolean }) {
  return (
    <form
      action="/products"
      role="search"
      className={`flex h-10 items-center overflow-hidden rounded-full border border-slate-200 bg-white focus-within:border-emerald-500 ${
        mobile ? "w-full" : "min-w-0 flex-1"
      }`}
    >
      <label
        className="sr-only"
        htmlFor={mobile ? "mobile-search" : "desktop-search"}
      >
        Search for products, brands and more
      </label>
      <input
        id={mobile ? "mobile-search" : "desktop-search"}
        type="search"
        name="q"
        placeholder="Search for products, brands and more..."
        className="h-full min-w-0 flex-1 bg-transparent px-4 text-sm text-slate-800 outline-none placeholder:text-slate-400"
      />
      <Button
        type="submit"
        size="icon"
        aria-label="Search"
        className="mr-1 size-8 shrink-0 rounded-full bg-emerald-600 text-white hover:bg-emerald-700"
      >
        <Search aria-hidden="true" className="size-4" />
      </Button>
    </form>
  );
}
