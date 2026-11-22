"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Check,
  Heart,
  LoaderCircle,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { addProductToCart } from "@/actions/cart.actions";
import {
  getLoggedUserwishlist,
  removeProductFromwishlist,
} from "@/actions/wishlist.action";
import { CartContext } from "@/context/cartContext";
import type { wishlistDataI, wishlistI } from "@/types/wishlist.type";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(
    price,
  );
}

function getProductPrice(product: wishlistDataI) {
  return product.priceAfterDiscount !== undefined &&
    product.priceAfterDiscount < product.price
    ? product.priceAfterDiscount
    : product.price;
}

async function getWishlist(): Promise<wishlistDataI[]> {
  const response: wishlistI = await getLoggedUserwishlist();
  return response.data;
}

function ProductThumbnail({ product }: { product: wishlistDataI }) {
  return (
    <div className="relative grid size-14 shrink-0 place-items-center overflow-hidden rounded-lg bg-slate-50">
      <Image
        src={product.imageCover}
        alt={product.title}
        fill
        sizes="56px"
        className="object-contain p-1"
      />
    </div>
  );
}

function StockStatus({ inStock }: { inStock: boolean }) {
  return inStock ? (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
      <Check size={13} aria-hidden="true" />
      In Stock
    </span>
  ) : (
    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
      Out of Stock
    </span>
  );
}

export default function WishList() {
  const [products, setProducts] = useState<wishlistDataI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [removingProductId, setRemovingProductId] = useState<string | null>(
    null,
  );
  const [addingProductId, setAddingProductId] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const { handleCart } = useContext(CartContext)!;
  const router = useRouter();

  async function removeProduct(productId: string) {
    setRemovingProductId(productId);
    try {
      await removeProductFromwishlist(productId);
      setProducts((currentProducts) =>
        currentProducts.filter((product) => product._id !== productId),
      );
      toast.success("Removed from your wishlist");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to remove this product.",
      );
    } finally {
      setRemovingProductId(null);
    }
  }

  async function addToCart(productId: string) {
    setAddingProductId(productId);
    try {
      const response = await addProductToCart(productId);
      toast.success(response.message);
      handleCart();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to add this product.",
      );
      router.push("/login");
    } finally {
      setAddingProductId(null);
    }
  }

  useEffect(() => {
    let isActive = true;

    getWishlist()
      .then((wishlistProducts) => {
        if (isActive) setProducts(wishlistProducts);
      })
      .catch((error: unknown) => {
        if (isActive) {
          setLoadError(
            error instanceof Error
              ? error.message
              : "Unable to load your wishlist.",
          );
        }
      })
      .finally(() => {
        if (isActive) setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, [reloadKey]);

  const removeButton = (product: wishlistDataI, compact = false) => (
    <button
      className={`grid shrink-0 place-items-center rounded-md border border-slate-200 text-slate-500 transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 disabled:cursor-not-allowed disabled:opacity-50 ${
        compact ? "size-10" : "size-9"
      }`}
      type="button"
      aria-label={`Remove ${product.title} from wishlist`}
      disabled={removingProductId === product._id}
      onClick={() => void removeProduct(product._id)}
    >
      {removingProductId === product._id ? (
        <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
      ) : (
        <Trash2 size={compact ? 17 : 16} aria-hidden="true" />
      )}
    </button>
  );

  const addToCartButton = (product: wishlistDataI, compact = false) => (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-md bg-emerald-600 font-semibold text-white transition-colors hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-not-allowed disabled:opacity-60 ${
        compact ? "h-10 flex-1 px-3 text-sm" : "h-9 px-3 text-xs"
      }`}
      type="button"
      aria-label={`Add ${product.title} to cart`}
      disabled={addingProductId === product._id || product.quantity < 1}
      onClick={() => void addToCart(product._id)}
    >
      {addingProductId === product._id ? (
        <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
      ) : (
        <ShoppingCart size={compact ? 16 : 15} aria-hidden="true" />
      )}
      Add to Cart
    </button>
  );

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <nav
        className="flex items-center gap-2 text-sm text-slate-500"
        aria-label="Breadcrumb"
      >
        <Link className="transition-colors hover:text-emerald-700" href="/">
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <span className="font-medium text-slate-700">Wishlist</span>
      </nav>

      <div className="mb-6 mt-5 flex items-center gap-3 sm:mb-8">
        <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-rose-50 text-rose-500 sm:size-11">
          <Heart className="size-5 fill-current" aria-hidden="true" />
        </div>
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            My Wishlist
          </h1>
          <p className="mt-0.5 text-sm text-slate-500">
            {products.length} {products.length === 1 ? "item" : "items"} saved
          </p>
        </div>
      </div>

      {isLoading ? (
        <div
          className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-500"
          role="status"
        >
          <LoaderCircle
            className="size-7 animate-spin text-emerald-600"
            aria-hidden="true"
          />
          Loading your wishlist…
        </div>
      ) : loadError ? (
        <div
          className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-xl border border-red-200 bg-white px-5 text-center"
          role="alert"
        >
          <p className="font-medium text-red-700">{loadError}</p>
          <button
            className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
            type="button"
            onClick={() => {
              setIsLoading(true);
              setLoadError(null);
              setReloadKey((key) => key + 1);
            }}
          >
            Try again
          </button>
        </div>
      ) : products.length ? (
        <section
          className="overflow-hidden rounded-xl border border-slate-200 bg-white"
          aria-label="Saved products"
        >
          <div className="hidden grid-cols-[minmax(0,1.8fr)_minmax(110px,.7fr)_minmax(100px,.55fr)_minmax(170px,.8fr)] items-center gap-4 bg-slate-50 px-5 py-3 text-xs font-medium text-slate-500 md:grid">
            <span>Product</span>
            <span>Price</span>
            <span>Status</span>
            <span className="text-center">Actions</span>
          </div>

          <div className="hidden md:block">
            {products.map((product) => {
              const price = getProductPrice(product);
              const hasDiscount = price < product.price;

              return (
                <article
                  className="grid grid-cols-[minmax(0,1.8fr)_minmax(110px,.7fr)_minmax(100px,.55fr)_minmax(170px,.8fr)] items-center gap-4 border-t border-slate-100 px-5 py-3.5"
                  key={product._id}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <ProductThumbnail product={product} />
                    <div className="min-w-0">
                      <h2 className="line-clamp-2 text-sm font-medium leading-5 text-slate-800">
                        {product.title}
                      </h2>
                      <p className="mt-1 text-xs text-slate-500">
                        {product.category.name}
                      </p>
                    </div>
                  </div>

                  <div className="font-semibold text-slate-800">
                    <p>{formatPrice(price)} EGP</p>
                    {hasDiscount && (
                      <p className="mt-0.5 text-xs font-normal text-slate-400 line-through">
                        {formatPrice(product.price)} EGP
                      </p>
                    )}
                  </div>

                  <StockStatus inStock={product.quantity > 0} />

                  <div className="flex items-center justify-center gap-2">
                    {addToCartButton(product)}
                    {removeButton(product)}
                  </div>
                </article>
              );
            })}
          </div>

          <div className="divide-y divide-slate-100 md:hidden">
            {products.map((product) => {
              const price = getProductPrice(product);
              const hasDiscount = price < product.price;

              return (
                <article className="p-4" key={product._id}>
                  <div className="flex items-start gap-3">
                    <ProductThumbnail product={product} />
                    <div className="min-w-0 flex-1">
                      <h2 className="text-sm font-semibold leading-5 text-slate-800">
                        {product.title}
                      </h2>
                      <p className="mt-1 text-xs text-slate-500">
                        {product.category.name}
                      </p>
                      <div className="mt-2">
                        <StockStatus inStock={product.quantity > 0} />
                      </div>
                      <div className="mt-2 flex items-baseline gap-2">
                        <p className="text-sm font-bold text-slate-900">
                          {formatPrice(price)} EGP
                        </p>
                        {hasDiscount && (
                          <p className="text-xs text-slate-400 line-through">
                            {formatPrice(product.price)} EGP
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    {addToCartButton(product, true)}
                    {removeButton(product, true)}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ) : (
        <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-5 text-center">
          <Heart className="size-9 text-rose-400" aria-hidden="true" />
          <h2 className="mt-3 text-lg font-semibold text-slate-800">
            Your wishlist is empty
          </h2>
          <p className="mt-1 max-w-sm text-sm text-slate-500">
            Save products you like and they will be waiting for you here.
          </p>
        </div>
      )}

      <Link
        className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-emerald-700"
        href="/products"
      >
        Continue Shopping <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </div>
  );
}
