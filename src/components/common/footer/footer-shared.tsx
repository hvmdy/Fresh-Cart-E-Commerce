import Image from "next/image";
import Link from "next/link";
import { Camera, Mail, MapPin, Phone, Play, Send, ThumbsUp } from "lucide-react";

import freshcartLogo from "@/assets/freshcart-logo.49f1b44d.svg";

const footerGroups = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/products" },
      { label: "Categories", href: "/categories" },
      { label: "Brands", href: "/brands" },
      { label: "Electronics", href: "/categories" },
      { label: "Men's Fashion", href: "/categories" },
      { label: "Women's Fashion", href: "/categories" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "My Account", href: "/profile" },
      { label: "Order History", href: "/profile" },
      { label: "Wishlist", href: "/wishlist" },
      { label: "Shopping Cart", href: "/cart" },
      { label: "Sign In", href: "/login" },
      { label: "Create Account", href: "/register" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "mailto:support@freshcart.com" },
      { label: "Help Center", href: "mailto:support@freshcart.com?subject=Help" },
      {
        label: "Shipping Info",
        href: "mailto:support@freshcart.com?subject=Shipping",
      },
      {
        label: "Returns & Refunds",
        href: "mailto:support@freshcart.com?subject=Returns",
      },
      { label: "Track Order", href: "/profile" },
    ],
  },
  {
    title: "Legal",
    links: [
      {
        label: "Privacy Policy",
        href: "mailto:support@freshcart.com?subject=Privacy%20Policy",
      },
      {
        label: "Terms of Service",
        href: "mailto:support@freshcart.com?subject=Terms%20of%20Service",
      },
      {
        label: "Cookie Policy",
        href: "mailto:support@freshcart.com?subject=Cookie%20Policy",
      },
    ],
  },
] as const;

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/", Icon: ThumbsUp },
  { label: "Twitter", href: "https://twitter.com/", Icon: Send },
  { label: "Instagram", href: "https://www.instagram.com/", Icon: Camera },
  { label: "YouTube", href: "https://www.youtube.com/", Icon: Play },
];

export function FooterBrand() {
  return (
    <div className="max-w-72">
      <Link
        href="/"
        aria-label="FreshCart home"
        className="inline-flex rounded-md bg-white px-2 py-1"
      >
        <Image src={freshcartLogo} alt="FreshCart" width={142} height={28} />
      </Link>
      <p className="mt-4 text-xs leading-5 text-slate-400">
        FreshCart is your one-stop destination for quality products. From
        fashion to electronics, we bring you the best brands at competitive
        prices with a seamless shopping experience.
      </p>
      <address className="mt-4 space-y-2.5 not-italic">
        <a
          href="tel:+18001234567"
          className="flex items-center gap-2 text-xs text-slate-400 transition-colors hover:text-white"
        >
          <Phone aria-hidden="true" size={14} className="shrink-0 text-emerald-400" />
          <span>+1 (800) 123-4567</span>
        </a>
        <a
          href="mailto:support@freshcart.com"
          className="flex items-center gap-2 text-xs text-slate-400 transition-colors hover:text-white"
        >
          <Mail aria-hidden="true" size={14} className="shrink-0 text-emerald-400" />
          <span>support@freshcart.com</span>
        </a>
        <p className="flex items-start gap-2 text-xs leading-5 text-slate-400">
          <MapPin
            aria-hidden="true"
            size={14}
            className="mt-0.5 shrink-0 text-emerald-400"
          />
          <span>123 Commerce Street, New York, NY 10001</span>
        </p>
      </address>
      <div className="mt-4 flex gap-2">
        {socialLinks.map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="inline-flex size-8 items-center justify-center rounded-full bg-slate-800 text-slate-300 transition-colors hover:bg-emerald-600 hover:text-white"
          >
            <Icon aria-hidden="true" size={14} />
          </a>
        ))}
      </div>
    </div>
  );
}

export function FooterLinks({ className }: { className: string }) {
  return (
    <div className={`grid ${className}`}>
      {footerGroups.map((group) => (
        <nav key={group.title} aria-label={group.title}>
          <h2 className="mb-3 text-sm font-semibold text-white">{group.title}</h2>
          <ul className="space-y-2.5">
            {group.links.map(({ href, label }) => (
              <li key={label}>
                {href.startsWith("/") ? (
                  <Link
                    className="text-xs text-slate-400 transition-colors hover:text-white"
                    href={href}
                  >
                    {label}
                  </Link>
                ) : (
                  <a
                    className="text-xs text-slate-400 transition-colors hover:text-white"
                    href={href}
                  >
                    {label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
      ))}
    </div>
  );
}

export function FooterBottom({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex flex-col gap-3 py-4 text-[11px] text-slate-500 sm:flex-row sm:items-center sm:justify-between ${className}`}
    >
      <p>© {new Date().getFullYear()} FreshCart. All rights reserved.</p>
      <div
        className="flex items-center gap-4"
        role="group"
        aria-label="Accepted payment methods"
      >
        <span>Visa</span>
        <span>Mastercard</span>
        <span>PayPal</span>
      </div>
    </div>
  );
}
