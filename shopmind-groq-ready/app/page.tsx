"use client";

import { useState, useEffect, useCallback } from "react";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import { Product } from "@/lib/products";

interface AskResult {
  products: Product[];
  summary: string;
  intent: string;
  total: number;
}

const CATEGORIES = ["All", "Laptops", "Desktops", "Monitors", "Accessories", "Cameras", "Audio"];

export default function HomePage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [aiResult, setAiResult] = useState<AskResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isAIMode, setIsAIMode] = useState(false);

  // Fetch all products on mount
  useEffect(() => {
    setIsFetching(true);
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        setAllProducts(data.products);
        setDisplayedProducts(data.products);
      })
      .catch(() => setError("Failed to load products."))
      .finally(() => setIsFetching(false));
  }, []);

  // Filter by category
  const handleCategoryChange = useCallback(
    (cat: string) => {
      setActiveCategory(cat);
      setIsAIMode(false);
      setAiResult(null);
      setError(null);

      if (cat === "All") {
        setDisplayedProducts(allProducts);
      } else {
        setDisplayedProducts(allProducts.filter((p) => p.category === cat));
      }
    },
    [allProducts]
  );

  // AI search
  const handleAskAI = useCallback(async (query: string) => {
    setIsLoading(true);
    setError(null);
    setAiResult(null);
    setIsAIMode(true);
    setActiveCategory("All");

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setAiResult(data);
      setDisplayedProducts(data.products);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to get AI response.";
      setError(message);
      setIsAIMode(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleClearAI = () => {
    setIsAIMode(false);
    setAiResult(null);
    setError(null);
    setDisplayedProducts(allProducts);
    setActiveCategory("All");
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-10">
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            AI-Powered Product Discovery
          </div>
          <h1 className="font-display text-5xl font-black text-white mb-3 tracking-tight">
            Shop<span className="text-amber-400">Mind</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Tell us what you need in plain English. Our AI finds the perfect match.
          </p>
        </header>

        {/* Search */}
        <div className="mb-10 max-w-2xl mx-auto">
          <SearchBar onSearch={handleAskAI} isLoading={isLoading} />
        </div>

        {/* AI Result Banner */}
        {isAIMode && aiResult && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
            <div className="flex items-start justify-between gap-3">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-amber-300 mb-0.5">
                    AI found {aiResult.total} result{aiResult.total !== 1 ? "s" : ""} for &ldquo;{aiResult.intent}&rdquo;
                  </p>
                  <p className="text-sm text-slate-300">{aiResult.summary}</p>
                </div>
              </div>
              <button
                onClick={handleClearAI}
                className="flex-shrink-0 text-slate-500 hover:text-white transition-colors"
                title="Clear AI search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm flex items-center gap-2">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
            {error}
          </div>
        )}

        {/* Category Filters (only in non-AI mode) */}
        {!isAIMode && (
          <div className="flex flex-wrap gap-2 mb-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                  ${activeCategory === cat
                    ? "bg-amber-500 text-slate-900 font-bold shadow-lg shadow-amber-500/25"
                    : "bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 border border-slate-700/50"
                  }`}
              >
                {cat}
              </button>
            ))}
            <div className="ml-auto text-sm text-slate-500 self-center">
              {displayedProducts.length} product{displayedProducts.length !== 1 ? "s" : ""}
            </div>
          </div>
        )}

        {/* Product Grid */}
        {isFetching ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-64 rounded-2xl bg-slate-800/50 animate-pulse border border-slate-700/30" />
            ))}
          </div>
        ) : displayedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                highlight={isAIMode}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-500">
            <svg className="w-12 h-12 mx-auto mb-3 opacity-30" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-lg font-medium">No products found</p>
            <p className="text-sm mt-1">Try a different query or browse all categories.</p>
            {isAIMode && (
              <button onClick={handleClearAI} className="mt-4 text-amber-400 hover:underline text-sm">
                ← Back to all products
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
