"use client";

import Link from "next/link";
import { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
  highlight?: boolean;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3.5 h-3.5 ${
            star <= Math.round(rating) ? "text-amber-400" : "text-slate-600"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs text-slate-400 ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function ProductCard({ product, highlight = false }: ProductCardProps) {
  const categoryColors: Record<string, string> = {
    Laptops: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    Desktops: "bg-violet-500/20 text-violet-300 border-violet-500/30",
    Monitors: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    Accessories: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    Cameras: "bg-pink-500/20 text-pink-300 border-pink-500/30",
    Audio: "bg-green-500/20 text-green-300 border-green-500/30",
  };

  const catStyle = categoryColors[product.category] || "bg-slate-500/20 text-slate-300 border-slate-500/30";

  return (
    <Link href={`/products/${product.id}`} className="block group">
      <div
        className={`relative rounded-2xl border transition-all duration-300 overflow-hidden h-full
          ${highlight
            ? "border-amber-500/50 bg-gradient-to-b from-amber-500/5 to-slate-900 shadow-lg shadow-amber-500/10"
            : "border-slate-700/50 bg-slate-900/80 hover:border-slate-500/70"
          }
          group-hover:shadow-xl group-hover:-translate-y-0.5`}
      >
        {/* Top color strip */}
        <div
          className={`h-1 w-full ${
            highlight ? "bg-gradient-to-r from-amber-400 to-orange-500" : "bg-gradient-to-r from-slate-700 to-slate-600"
          }`}
        />

        <div className="p-5">
          {/* Header */}
          <div className="flex items-start justify-between gap-2 mb-3">
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${catStyle}`}>
              {product.category}
            </span>
            {!product.inStock && (
              <span className="text-[11px] text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full">
                Out of stock
              </span>
            )}
          </div>

          {/* Name */}
          <h3 className="font-display text-lg font-bold text-white leading-tight mb-2 group-hover:text-amber-300 transition-colors">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-slate-400 leading-relaxed line-clamp-2 mb-4">
            {product.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {product.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-[11px] text-slate-500 bg-slate-800 px-2 py-0.5 rounded-md">
                #{tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <StarRating rating={product.rating} />
            <span className={`text-2xl font-display font-black ${highlight ? "text-amber-300" : "text-white"}`}>
              ${product.price.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
