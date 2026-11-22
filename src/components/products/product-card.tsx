import Image from "next/image";
import { Eye, Heart, Plus, RefreshCw, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { ProductI } from "@/types/products.type";
import Link from "next/link";
import AddToCartBtn from "../cart/addToCartBtn";
import AddToWishlistBtn from "../wishlist/addToWishlistBtn";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en", {
    maximumFractionDigits: 0,
  }).format(price);
}

export default function ProductCard({ product }: { product: ProductI }) {
  const effectivePrice =
    product.priceAfterDiscount !== undefined &&
    product.priceAfterDiscount < product.price
      ? product.priceAfterDiscount
      : product.price;
  const hasDiscount = effectivePrice < product.price;
  const discount = Math.round(
    ((product.price - effectivePrice) / product.price) * 100,
  );
  const rating = Math.max(0, Math.min(5, product.ratingsAverage));

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white transition-shadow hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-slate-50">
        <Image
          src={product.imageCover}
          alt={product.title}
          fill
          sizes="(max-width: 639px) 46vw, (max-width: 1023px) 30vw, (max-width: 1279px) 22vw, 18vw"
          className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
        />

        {hasDiscount && (
          <span className="absolute left-2 top-2 rounded-sm bg-rose-500 px-1.5 py-0.5 text-[10px] font-semibold text-white sm:text-xs">
            -{discount}%
          </span>
        )}

        <div className="absolute right-2 top-2 flex flex-col gap-1">
          <AddToWishlistBtn product={product} />
          <Button
            type="button"
            variant="ghost"
            size="icon-lg"
            aria-label={`Compare ${product.title}`}
            className="rounded-full bg-white/90 text-slate-700 shadow-sm hover:bg-white hover:text-emerald-700"
          >
            <RefreshCw aria-hidden="true" />
          </Button>
          <Link href={`/products/${product._id}`}>
            <Button
              type="button"
              variant="ghost"
              size="icon-lg"
              aria-label={`Quick view ${product.title}`}
              className="rounded-full bg-white/90 text-slate-700 shadow-sm hover:bg-white hover:text-emerald-700"
            >
              <Eye aria-hidden="true" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-2.5 sm:p-3">
        <p className="mb-1 truncate text-[10px] text-slate-500 sm:text-xs">
          {product.category.name}
        </p>
        <h2 className="line-clamp-2 min-h-9 text-xs font-medium leading-4 text-slate-800 sm:text-sm">
          {product.title}
        </h2>

        <div
          className="mt-1 flex items-center gap-1"
          aria-label={`${rating.toFixed(1)} out of 5 stars, ${product.ratingsQuantity} ratings`}
        >
          <span className="flex items-center" aria-hidden="true">
            {Array.from({ length: 5 }, (_, index) => (
              <Star
                key={index}
                className={`size-3 ${
                  index < Math.round(rating)
                    ? "fill-amber-400 text-amber-400"
                    : "text-slate-300"
                }`}
              />
            ))}
          </span>
          <span className="text-[10px] text-slate-500">
            {product.ratingsAverage}
          </span>
          <span className="text-[10px] text-slate-500">
            ({product.ratingsQuantity})
          </span>
        </div>

        <div className="mt-auto flex items-end justify-between gap-1 pt-2">
          <div className="min-w-0">
            <p className="truncate text-xs font-bold text-emerald-700 sm:text-xl">
              {formatPrice(effectivePrice)} EGP
            </p>
            {hasDiscount && (
              <p className="text-[10px] text-slate-400 line-through">
                {formatPrice(product.price)} EGP
              </p>
            )}
          </div>
          <AddToCartBtn productId={product._id} />
        </div>
      </div>
    </article>
  );
}
