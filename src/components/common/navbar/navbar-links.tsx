import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { navLinks } from "@/components/common/nav-links";
import { Button } from "@/components/ui/button";

export function HeaderIconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Button
      asChild
      variant="ghost"
      size="icon"
      aria-label={label}
      className="size-9 shrink-0 rounded-full text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
}

export function PrimaryLinks({ mobile = false }: { mobile?: boolean }) {
  return (
    <nav aria-label={mobile ? "Mobile navigation" : "Primary navigation"}>
      <ul
        className={
          mobile ? "grid gap-1" : "flex shrink-0 items-center gap-3 xl:gap-4"
        }
      >
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="flex items-center gap-1 whitespace-nowrap rounded-md px-2 py-2 text-sm font-medium text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700"
            >
              {link.label}
              {link.label === "Categories" && (
                <ChevronDown
                  aria-hidden="true"
                  className="size-3.5 text-slate-500"
                />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
