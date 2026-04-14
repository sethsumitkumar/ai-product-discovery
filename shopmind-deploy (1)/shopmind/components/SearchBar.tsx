"use client";

import { useState, FormEvent } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
  placeholder?: string;
}

export default function SearchBar({ onSearch, isLoading, placeholder }: SearchBarProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim()) onSearch(value.trim());
  };

  const suggestions = [
    "Budget laptops under $500",
    "Best gaming setup",
    "Good for photography",
    "Wireless audio",
  ];

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative group">
          {/* Glow effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-sm" />

          <div className="relative flex items-center bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
            {/* AI icon */}
            <div className="flex-shrink-0 pl-4 pr-3">
              <svg className="w-5 h-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>

            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={placeholder || "Ask anything... 'Best laptop for gaming under $1000'"}
              className="flex-1 bg-transparent py-4 pr-4 text-white placeholder-slate-500 text-sm focus:outline-none"
              disabled={isLoading}
            />

            <button
              type="submit"
              disabled={isLoading || !value.trim()}
              className="flex-shrink-0 m-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 disabled:from-slate-600 disabled:to-slate-600 disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl transition-all duration-200 flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Thinking...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Ask AI
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Quick suggestions */}
      <div className="flex flex-wrap gap-2 mt-3">
        <span className="text-xs text-slate-600">Try:</span>
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => {
              setValue(s);
              onSearch(s);
            }}
            disabled={isLoading}
            className="text-xs text-slate-400 hover:text-amber-400 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-amber-500/30 px-3 py-1 rounded-full transition-all duration-200 disabled:opacity-50"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
