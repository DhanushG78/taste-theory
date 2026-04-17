"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

export default function RecipeClient({ initialRecipes }: { initialRecipes: any[] }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    return [
      "All",
      ...Array.from(new Set(initialRecipes.map((r) => r.category?.[0]?.title).filter(Boolean))),
    ];
  }, [initialRecipes]);

  const filteredData = useMemo(() => {
    let data = initialRecipes;

    if (activeCategory !== "All") {
      data = data.filter((r) => r.category?.some((c: any) => c.title === activeCategory));
    }

    if (search) {
      const lowerSearch = search.toLowerCase();
      data = data.filter(
        (r) =>
          r.recipe_name?.toLowerCase().includes(lowerSearch) ||
          r.short_description?.toLowerCase().includes(lowerSearch)
      );
    }

    return data;
  }, [initialRecipes, search, activeCategory]);

  return (
    <div className="space-y-10">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-stone-100">
        <div className="relative w-full md:w-[28rem] flex-shrink-0 group">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-stone-400 group-focus-within:text-orange-500 transition-colors">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search for a craving..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-14 pr-5 py-4 bg-stone-50 border border-transparent rounded-2xl focus:outline-none focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-orange-200 text-stone-800 placeholder-stone-400 transition-all font-medium"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto w-full pb-2 md:pb-0 scrollbar-hide snap-x items-center px-2">
          {categories.map((cat, i) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={i}
                className={`snap-start whitespace-nowrap px-6 py-3 rounded-2xl cursor-pointer font-bold transition-all duration-300 text-sm tracking-wide ${
                  isActive
                    ? "bg-stone-900 text-white shadow-xl shadow-stone-900/20 scale-105"
                    : "bg-transparent text-stone-500 hover:text-stone-900 hover:bg-stone-100"
                }`}
                onClick={() => setActiveCategory(cat as string)}
              >
                {cat as string}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      {filteredData.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 border-dashed shadow-sm">
          <div className="text-6xl mb-4 opacity-50 grayscale">🍽️</div>
          <h3 className="text-xl font-bold text-stone-800">No recipes found</h3>
          <p className="text-stone-500 mt-2 font-medium">Try adjusting your search or category filters.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredData.map((recipe: any, index: number) => (
            <Link key={recipe.uid} href={`/recipe/${recipe.slug}`} className="group">
              <div 
                className="bg-white border border-stone-100 rounded-[2rem] overflow-hidden hover:border-orange-200 hover:shadow-[0_20px_40px_-15px_rgba(249,115,22,0.15)] shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 h-full flex flex-col group-hover:-translate-y-2 opacity-0 animate-[fade-in-up_0.6s_ease-out_forwards]"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-stone-100 animate-pulse" />
                  {recipe.recipe_image?.url && (
                    <img
                      src={recipe.recipe_image.url}
                      alt={recipe.recipe_name || "Recipe image"}
                      className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out z-10"
                      loading="lazy"
                    />
                  )}
                  {/* Subtle fade overlay for contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent z-20" />
                  
                  {/* Floating badgers */}
                  <div className="absolute top-4 right-4 z-30">
                    <span className="bg-white/95 backdrop-blur-sm border border-stone-100 text-stone-800 text-xs px-3 py-1.5 rounded-full font-bold flex items-center gap-1 shadow-lg">
                      {recipe.difficulty === "Easy" ? "🟢" : recipe.difficulty === "Medium" ? "🟡" : "🔴"} 
                      {recipe.difficulty || "Medium"}
                    </span>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 z-30 flex gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-white bg-stone-900/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20">
                      {recipe.category?.[0]?.title || "Uncategorized"}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col z-30 bg-white relative">
                  <h2 className="text-xl font-bold text-stone-900 mb-2 group-hover:text-orange-600 transition-colors leading-tight">
                    {recipe.recipe_name}
                  </h2>
                  
                  <p className="text-stone-500 text-sm line-clamp-2 mb-6 flex-1 leading-relaxed font-medium">
                    {recipe.short_description}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-5 border-t border-stone-100/80 text-sm text-stone-500 font-bold">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2.5">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                      </div>
                      {recipe.cooking_time || "45 mins"}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
                        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2.5">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                      </div>
                      {recipe.servings || "4"} servings
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
