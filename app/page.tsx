import Stack, { contentstackConfigured } from "@/lib/contentstack";
import RecipeClient from "./RecipeClient";
import Link from "next/link";

export const revalidate = 60; // Revalidate every 60 seconds

const getRecipes = async () => {
  if (!contentstackConfigured || !Stack) return [];
  const Query = Stack.ContentType("recipe").Query();
  Query.includeReference(["category", "chef"]);
  
  try {
    const result = await Query.toJSON().find();
    return result[0] || [];
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};

const getCategories = async () => {
  if (!contentstackConfigured || !Stack) return [];
  const Query = Stack.ContentType("category").Query();
  
  try {
    const result = await Query.toJSON().find();
    return result[0] || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export default async function Home() {
  const [recipes, categories] = await Promise.all([
    getRecipes(),
    getCategories()
  ]);
  
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* Hero Section */}
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
        <div className="space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 border border-orange-200 text-orange-600 text-xs font-bold uppercase tracking-wider mb-2 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
            Fresh Recipes Daily
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-stone-900 leading-[1.1]">
            Master the <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">Culinary Arts</span>
          </h1>
          <p className="text-stone-500 max-w-xl text-lg md:text-xl font-medium mx-auto lg:mx-0">
            Discover, learn, and cook perfect meals with our premium recipe collection. 
            Detailed step-by-step guides for every culinary adventurer.
          </p>
          <div className="pt-4 flex gap-4 justify-center lg:justify-start">
            <a href="#recipes" className="px-8 py-4 bg-stone-900 text-white rounded-2xl font-bold hover:bg-stone-800 shadow-xl shadow-stone-900/20 transition-all hover:-translate-y-1">
              Explore Recipes
            </a>
          </div>
        </div>
        <div className="relative rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(249,115,22,0.15)] h-[400px] lg:h-[550px] border-4 border-white transform lg:rotate-2 hover:rotate-0 transition-transform duration-700">
          <img 
            src="/hero.png" 
            alt="Delicious culinary dish" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-stone-900/40 via-transparent to-transparent"></div>
        </div>
      </div>

      {/* Categories Section */}
      {categories.length > 0 && (
        <div className="mb-24">
          <div className="flex items-center justify-between mb-10 border-b border-stone-200 pb-4">
            <h2 className="text-3xl font-extrabold text-stone-900">Featured Categories</h2>
            <Link href="/category/all" className="text-orange-500 font-bold hover:text-orange-600 transition-colors flex items-center gap-1">
              View All <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="3"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {categories.slice(0, 5).map((category: any, i: number) => (
              <Link key={category.uid || i} href={`/category/${category.title.toLowerCase()}`} className="group relative block aspect-square rounded-[2rem] overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-500 border border-stone-100">
                <div className="absolute inset-0 bg-stone-200 animate-pulse -z-10" />
                {category.category_image?.url ? (
                  <img src={category.category_image.url} alt={category.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-rose-100"></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent"></div>
                <div className="absolute inset-x-0 bottom-0 p-6 text-center">
                  <span className="font-extrabold text-white text-xl tracking-wide">{category.title}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Recipes Section */}
      <div id="recipes" className="pt-8 mb-10 border-b border-stone-200 pb-4">
        <h2 className="text-3xl font-extrabold text-stone-900">Latest Recipes</h2>
      </div>
      
      <RecipeClient initialRecipes={recipes} />
    </div>
  );
}
