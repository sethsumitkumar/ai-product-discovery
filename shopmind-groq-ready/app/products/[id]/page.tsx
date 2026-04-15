import { notFound } from "next/navigation";
import Link from "next/link";
import { products } from "@/lib/products";
import type { Metadata } from "next";

interface PageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = products.find((p) => p.id === params.id);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.name} — ShopMind`,
    description: product.description,
  };
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-5 h-5 ${star <= Math.round(rating) ? "text-amber-400" : "text-slate-600"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-slate-400 font-medium ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function ProductDetailPage({ params }: PageProps) {
  const product = products.find((p) => p.id === params.id);
  if (!product) notFound();

  // Related products (same category, exclude current)
  const related = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  const categoryColors: Record<string, string> = {
    Laptops: "from-blue-600 to-indigo-700",
    Desktops: "from-violet-600 to-purple-700",
    Monitors: "from-cyan-600 to-teal-700",
    Accessories: "from-orange-600 to-amber-700",
    Cameras: "from-pink-600 to-rose-700",
    Audio: "from-green-600 to-emerald-700",
  };
  const gradient = categoryColors[product.category] || "from-slate-600 to-slate-700";

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Ambient bg */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-10">
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors mb-8 text-sm font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back to Products
        </Link>

        {/* Main card */}
        <div className="rounded-3xl border border-slate-700/50 bg-slate-900/80 overflow-hidden mb-10">
          {/* Color header */}
          <div className={`h-2 w-full bg-gradient-to-r ${gradient}`} />

          <div className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-10">
              {/* Left */}
              <div>
                {/* Category badge */}
                <span className="inline-block text-xs font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full mb-4">
                  {product.category}
                </span>

                <h1 className="font-display text-4xl font-black text-white mb-4 leading-tight">
                  {product.name}
                </h1>

                <StarRating rating={product.rating} />

                <p className="text-slate-300 text-base leading-relaxed mt-6 mb-6">
                  {product.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-slate-400 bg-slate-800 border border-slate-700/50 px-3 py-1 rounded-lg"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right — price & CTA */}
              <div className="flex flex-col justify-center">
                <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6">
                  <div className="mb-6">
                    <p className="text-slate-500 text-sm mb-1">Price</p>
                    <p className="font-display text-5xl font-black text-amber-300">
                      ${product.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mb-6">
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${
                        product.inStock ? "bg-green-400" : "bg-red-400"
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        product.inStock ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>

                  <button
                    disabled={!product.inStock}
                    className="w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-200
                      bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400
                      disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed
                      text-slate-900 shadow-lg shadow-amber-500/20"
                  >
                    {product.inStock ? "Add to Cart" : "Notify Me"}
                  </button>

                  <Link
                    href="/"
                    className="mt-3 block text-center text-sm text-slate-400 hover:text-amber-400 transition-colors py-2"
                  >
                    ← Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div>
            <h2 className="font-display text-2xl font-bold text-white mb-6">
              More in <span className="text-amber-400">{product.category}</span>
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {related.map((rel) => (
                <Link key={rel.id} href={`/products/${rel.id}`} className="group block">
                  <div className="rounded-2xl border border-slate-700/50 bg-slate-900/80 p-5 hover:border-amber-500/30 transition-all duration-200 group-hover:-translate-y-0.5">
                    <div className={`h-1 w-full rounded-full bg-gradient-to-r ${gradient} mb-4`} />
                    <p className="font-display font-bold text-white group-hover:text-amber-300 transition-colors">
                      {rel.name}
                    </p>
                    <p className="text-slate-400 text-sm mt-1 mb-3 line-clamp-2">{rel.description}</p>
                    <p className="text-amber-300 font-black font-display text-xl">
                      ${rel.price.toLocaleString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
