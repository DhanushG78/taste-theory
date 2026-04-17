import Stack, { contentstackConfigured } from "@/lib/contentstack";
import Link from "next/link";

const getRecipesByCategory = async (name: string) => {
  if (!contentstackConfigured || !Stack) return [];

  const Query = Stack.ContentType("recipe").Query();
  Query.includeReference(["category", "chef"]);

  try {
    const result = await Query.toJSON().find();
    const recipes = result[0] || [];

    if (name.toLowerCase() === "all") {
      return recipes;
    }

    return recipes.filter((r: any) => 
      r.category?.some((c: any) => c.title?.toLowerCase() === name.toLowerCase())
    );
  } catch(error) {
    console.error("Error fetching category", error);
    return [];
  }
};

export default async function CategoryPage({ params }: any) {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);
  const recipes = await getRecipesByCategory(decodedName);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 w-full animate-fade-in-up">
      <div className="mb-16 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold capitalize mb-6 text-stone-900 tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">
            {decodedName}
          </span> Recipes
        </h1>
        <p className="text-stone-500 text-xl font-medium max-w-2xl mx-auto">
          Explore our collection of delicious {decodedName} dishes curated just for you.
        </p>
      </div>

      {recipes.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-[2rem] border border-stone-200 border-dashed shadow-sm">
          <div className="text-7xl mb-6 opacity-40 grayscale">🍽️</div>
          <h3 className="text-2xl font-bold text-stone-800">No recipes found</h3>
          <p className="text-stone-500 mt-3 font-medium text-lg">We couldn't find any recipes for this category.</p>
          <Link href="/" className="inline-block mt-8 px-8 py-4 bg-stone-900 text-white font-bold rounded-2xl hover:bg-stone-800 shadow-xl shadow-stone-900/20 transition-all hover:-translate-y-1">
            Browse All Recipes
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {recipes.map((recipe: any, index: number) => (
            <Link key={recipe.uid} href={`/recipe/${recipe.slug}`} className="group">
              <div 
                className="bg-white border border-stone-100 rounded-[2rem] overflow-hidden hover:border-orange-200 hover:shadow-[0_20px_40px_-15px_rgba(249,115,22,0.15)] shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 h-full flex flex-col group-hover:-translate-y-2 opacity-0 animate-[fade-in-up_0.6s_ease-out_forwards]"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="relative h-60 overflow-hidden">
                  <div className="absolute inset-0 bg-stone-100 animate-pulse" />
                  {recipe.recipe_image?.url && (
                    <img
                      src={recipe.recipe_image.url}
                      alt={recipe.recipe_name || "Recipe image"}
                      className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out z-10"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent z-20" />
                  
                  <div className="absolute bottom-4 left-4 z-30 flex gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-white bg-stone-900/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20">
                      {recipe.category?.[0]?.title || "Uncategorized"}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col z-30 bg-white relative">
                  <h2 className="text-xl font-bold text-stone-900 mb-4 group-hover:text-orange-600 transition-colors leading-tight">
                    {recipe.recipe_name}
                  </h2>
                  <div className="flex items-center justify-between gap-2 mt-auto pt-5 border-t border-stone-100/80 text-sm text-stone-500 font-bold">
                    <span className="flex items-center gap-2">
                       <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                       </div>
                       {recipe.cooking_time || "45 mins"}
                    </span>
                    <span className="flex items-center gap-2">
                       <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
                          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                       </div>
                       {recipe.servings || "4"} servings
                    </span>
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
