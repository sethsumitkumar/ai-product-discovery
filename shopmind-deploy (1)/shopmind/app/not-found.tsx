import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="text-center">
        <p className="font-display text-8xl font-black text-amber-400/20 mb-2">404</p>
        <h2 className="font-display text-2xl font-bold text-white mb-3">Product Not Found</h2>
        <p className="text-slate-400 mb-6 text-sm">
          That product doesn&apos;t exist or may have been removed.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-xl text-sm transition-colors"
        >
          ← Back to Store
        </Link>
      </div>
    </div>
  );
}
