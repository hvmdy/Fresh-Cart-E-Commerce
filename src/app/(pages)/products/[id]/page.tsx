import { getProductDetails } from "@/services/product.service";
import { ProductDetailsI } from "@/types/productDetails.type";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Heart,
  RotateCcw,
  Share2,
  ShieldCheck,
  Star,
  Truck,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ProductSlider from "@/components/products/ProductSlider";
import AddToCartDetailsBtn from "@/components/cart/addToCartDetailsBtn";
import ProductsCount from "@/components/cart/productsCount";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en", {
    maximumFractionDigits: 0,
  }).format(price);
}

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await getProductDetails(id);

  const product: ProductDetailsI = response.data;

  const effectivePrice =
    product.priceAfterDiscount !== undefined &&
    product.priceAfterDiscount < product.price
      ? product.priceAfterDiscount
      : product.price;
  const hasDiscount = effectivePrice < product.price;
  const discount = Math.round(
    ((product.price - effectivePrice) / product.price) * 100,
  );

  return (
    <>
      <section className="py-6">
        <div className="container mx-auto">
          <div className="breadcrumb">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/products">Products</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-bold">
                    {product.title}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="grid grid-cols-12 gap-4 py-6">
            <div className="col-span-12 lg:col-span-4">
              <ProductSlider images={product.images} />
            </div>
            <div className="details col-span-12 lg:col-span-8">
              <Card className="gap-0 rounded-2xl py-0 shadow-sm">
                <CardContent className="space-y-5 p-5 sm:p-7">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {product.category.name}
                    </span>
                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                      {product.brand.name}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h1 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                      {product.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                      <div
                        className="flex items-center text-amber-500"
                        aria-label={`${product.ratingsAverage} out of 5 stars`}
                      >
                        {[0, 1, 2, 3, 4].map((star) => (
                          <Star
                            key={star}
                            className={`size-4 ${
                              star < Math.round(product.ratingsAverage)
                                ? "fill-current"
                                : ""
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-medium">
                        {product.ratingsAverage.toFixed(1)}
                      </span>
                      <span className="text-muted-foreground">
                        ({product.ratingsQuantity} reviews)
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <p className="truncate text-xs font-bold text-gray-900  sm:text-3xl">
                      {formatPrice(effectivePrice)} EGP
                    </p>
                    {hasDiscount && (
                      <p className="text-lg text-gray-400 line-through">
                        {formatPrice(product.price)} EGP
                      </p>
                    )}
                    {discount ? (
                      <>
                        <span className="px-3 py-1 rounded-full font-medium bg-red-500 text-white text-sm ">
                          Save {discount}%
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="px-3 py-1 rounded-full font-medium bg-red-500 text-white text-sm hidden">
                          Save {discount}%
                        </span>
                      </>
                    )}
                  </div>

                  <div>
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium ${
                        product.quantity > 0
                          ? "bg-primary/10 text-primary"
                          : "bg-destructive/10 text-destructive"
                      }`}
                    >
                      <span
                        className={`size-2 rounded-full ${
                          product.quantity > 0 ? "bg-primary" : "bg-destructive"
                        }`}
                      />
                      {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>

                  <Separator />

                  {/* static part  */}
                  <p className="text-sm leading-6 text-muted-foreground">
                    Material Polyester Blend
                    <span className="mx-2 text-border">|</span>
                    Colour Name Beige
                    <span className="mx-2 text-border">|</span>
                    Department Women
                  </p>

                  {/* static part */}

                  <ProductsCount />

                  <div className="flex items-center justify-between rounded-xl bg-muted/50 px-4 py-3">
                    <span className="text-sm font-medium">Total Price:</span>
                    <span className="font-heading text-xl font-bold text-primary">
                      {product.priceAfterDiscount?.toFixed(2)} EGP
                    </span>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <AddToCartDetailsBtn
                      product={product}
                      productId={product._id}
                    />
                    <Button
                      size="lg"
                      className="h-12 gap-2 bg-foreground text-background hover:bg-foreground/90"
                      disabled={product.quantity < 1}
                    >
                      <Zap />
                      Buy Now
                    </Button>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" className="h-12 flex-1 gap-2">
                      <Heart />
                      Add to Wishlist
                    </Button>
                    <Button
                      variant="outline"
                      size="icon-lg"
                      className="h-12 w-12"
                      aria-label="Share product"
                    >
                      <Share2 />
                    </Button>
                  </div>

                  <Separator />

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Truck className="size-5" />
                      </span>
                      <div>
                        <p className="text-sm font-medium">Free Delivery</p>
                        <p className="text-xs text-muted-foreground">
                          Orders over $50
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <RotateCcw className="size-5" />
                      </span>
                      <div>
                        <p className="text-sm font-medium">30 Days Return</p>
                        <p className="text-xs text-muted-foreground">
                          Money back
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <ShieldCheck className="size-5" />
                      </span>
                      <div>
                        <p className="text-sm font-medium">Secure Payment</p>
                        <p className="text-xs text-muted-foreground">
                          100% Protected
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
