import ProductCard from "@/components/products/product-card";
import { getAllProducts } from "@/services/product.service";
import { ProductI } from "@/types/products.type";

export default async function Products() {
  const response = await getAllProducts();
  const products: ProductI[] = response.data;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section aria-labelledby="products-heading">
        <div className="mb-5 flex items-center gap-2">
          <span
            aria-hidden="true"
            className="h-6 w-1 rounded-full bg-emerald-600"
          />
          <h1
            id="products-heading"
            className="text-xl font-semibold text-slate-900"
          >
            Featured Products
          </h1>
        </div>

        {products.length > 0 ? (
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
            {products.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-lg border border-slate-200 p-8 text-center text-sm text-slate-600">
            No products are available right now.
          </p>
        )}
      </section>
    </main>
  );
}
