"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { onEntryChange } from "@/lib/livePreview";

interface RecipeDetailClientProps {
  initialRecipe: any;
  slug: string;
}

/**
 * Fetches a single recipe by slug via the API route (client-safe).
 * Used by onEntryChange to keep the detail page in sync with draft edits.
 */
async function fetchRecipeBySlug(slug: string): Promise<any | null> {
  try {
    const isPreview = process.env.NEXT_PUBLIC_LIVE_PREVIEW_ENABLED === "true";
    const res = await fetch(`/api/recipes?slug=${encodeURIComponent(slug)}`, {
      ...(isPreview && { cache: "no-store" }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    // API returns array; find matching slug
    if (Array.isArray(data)) return data.find((r: any) => r.slug === slug) ?? null;
    return data ?? null;
  } catch {
    return null;
  }
}

export default function RecipeDetailClient({ initialRecipe, slug }: RecipeDetailClientProps) {
  const [recipe, setRecipe] = useState<any>(initialRecipe);

  // 🔥 Re-fetch on every Live Preview content change
  useEffect(() => {
    const fetchData = async () => {
      const updated = await fetchRecipeBySlug(slug);
      if (updated) setRecipe(updated);
    };

    onEntryChange(() => {
      fetchData();
    });
  }, [slug]);

  if (!recipe) return null;

  let stepCount = 0;

  const ingredientBlocks =
    recipe.content_sections
      ?.filter((block: any) => block.ingredients)
      .map((block: any) => block.ingredients) || [];

  const otherBlocks =
    recipe.content_sections?.filter((block: any) => !block.ingredients) || [];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 w-full animate-fade-in-up">
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-stone-200 text-stone-600 hover:text-stone-900 shadow-sm hover:shadow transition-all duration-300 mb-8 group font-semibold"
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 group-hover:-translate-x-1 transition-transform" stroke="currentColor" strokeWidth="2.5">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Back to recipes
      </Link>

      {/* Hero Image */}
      <div className="relative rounded-[2rem] overflow-hidden mb-12 shadow-[0_20px_50px_rgba(8,112,184,0.07)] border border-stone-200/60 bg-white">
        <div className="absolute inset-0 bg-stone-100 animate-pulse" />
        {recipe.recipe_image?.url && (
          <img
            src={recipe.recipe_image.url}
            className="w-full h-[400px] md:h-[600px] object-cover relative z-10"
            alt={recipe.recipe_name || "Recipe image"}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/40 to-transparent z-20" />

        <div className="absolute bottom-0 inset-x-0 p-8 md:p-12 z-30">
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="bg-orange-500 text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl shadow-lg">
              {recipe.category?.title || "Uncategorized"}
            </span>
            <span className="bg-white/95 backdrop-blur-md text-stone-800 text-xs font-bold px-4 py-2 rounded-xl shadow-lg flex items-center gap-1.5">
              {recipe.difficulty === "Easy" ? "🟢" : recipe.difficulty === "Medium" ? "🟡" : "🔴"}{" "}
              {recipe.difficulty || "Medium"}
            </span>
          </div>
          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-[1.1]">
            {recipe.recipe_name}
          </h1>
          <p className="text-lg md:text-xl text-stone-200 max-w-3xl font-medium leading-relaxed">
            {recipe.short_description}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-12">
        {/* Sidebar */}
        <div className="md:col-span-4 space-y-8">
          <div className="bg-white rounded-[2rem] p-8 border border-stone-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sticky top-28">
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-400 mb-8">Recipe Details</h3>
            <div className="space-y-8">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-2xl shadow-inner text-orange-500">⏱️</div>
                <div>
                  <div className="text-xs text-stone-500 font-bold uppercase tracking-wider mb-1">Cooking Time</div>
                  <div className="text-xl font-bold text-stone-900">{recipe.cooking_time || "45 mins"}</div>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-rose-50 flex items-center justify-center text-2xl shadow-inner text-rose-500">🍽️</div>
                <div>
                  <div className="text-xs text-stone-500 font-bold uppercase tracking-wider mb-1">Yields</div>
                  <div className="text-xl font-bold text-stone-900">{recipe.servings || "4"} servings</div>
                </div>
              </div>

              {recipe.chef?.[0] && (
                <div className="flex items-center gap-5 pt-8 border-t border-stone-100 mt-4">
                  <Link
                    href={`/chefs/${recipe.chef[0].uid}`}
                    className="w-16 h-16 rounded-full bg-stone-100 overflow-hidden shrink-0 shadow-inner group relative block border-2 border-transparent hover:border-orange-500 transition-all"
                  >
                    <img
                      src={recipe.chef[0].profile_image?.url || `https://ui-avatars.com/api/?name=${recipe.chef[0].name || recipe.chef[0].title}&background=random`}
                      alt={recipe.chef[0].name || recipe.chef[0].title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                  </Link>
                  <div>
                    <div className="text-xs text-stone-500 font-bold uppercase tracking-wider mb-1">Prepared by Chef</div>
                    <Link href={`/chefs/${recipe.chef[0].uid}`} className="text-lg font-bold text-stone-900 leading-tight hover:text-orange-600 transition-colors">
                      {recipe.chef[0].name || recipe.chef[0].title}
                    </Link>
                    {recipe.chef[0].bio && (
                      <div className="text-sm text-stone-500 mt-1 line-clamp-2 font-medium">{recipe.chef[0].bio}</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="md:col-span-8 space-y-12 mb-20">
          {ingredientBlocks.length > 0 && (
            <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-stone-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <h2 className="text-3xl font-bold flex items-center gap-4 mb-8 text-stone-900">
                <span className="text-4xl drop-shadow-md">🛒</span> Ingredients
              </h2>
              <ul className="text-xl text-stone-700 leading-relaxed space-y-3 font-medium">
                {ingredientBlocks.map((item: any, i: number) => (
                  <li key={i}>
                    {item?.ingredient_name || "Ingredient"} &ndash; {item?.quantity || ""}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {otherBlocks.map((block: any, index: number) => {
            if (block.step) {
              stepCount++;
              return (
                <div key={index} className="relative pl-14">
                  <div className="absolute left-[27px] top-14 bottom-[-48px] w-1 bg-stone-100 rounded-full"></div>
                  <div className="absolute left-0 top-3 w-14 h-14 rounded-full bg-white border-4 border-orange-100 flex items-center justify-center font-black text-xl text-orange-500 shadow-md z-10">
                    {stepCount}
                  </div>
                  <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-stone-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:scale-[1.01] transition-all duration-300">
                    <h2 className="text-2xl font-bold text-stone-900 mb-4">{block.step.step_title}</h2>
                    <p className="text-stone-600 leading-relaxed text-lg font-medium">{block.step.description}</p>
                  </div>
                </div>
              );
            }

            if (block.tips) {
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-orange-50 to-rose-50 p-8 md:p-10 rounded-[2rem] border border-orange-100 relative overflow-hidden mt-16 shadow-inner"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-20 transform translate-x-4 -translate-y-4">
                    <span className="text-9xl grayscale">💡</span>
                  </div>
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-orange-200 text-orange-600 text-sm font-bold uppercase tracking-wider mb-6 shadow-sm">
                      <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse"></span>
                      Pro Tip
                    </div>
                    <h4 className="text-2xl font-bold text-stone-900 mb-4">{block.tips.title}</h4>
                    <p className="text-stone-700 leading-relaxed text-lg font-medium">{block.tips.description}</p>
                  </div>
                </div>
              );
            }

            return null;
          })}
        </div>
      </div>
    </div>
  );
}
