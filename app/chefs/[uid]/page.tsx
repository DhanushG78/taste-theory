import Stack, { contentstackConfigured } from "@/lib/contentstack";
import Link from "next/link";

export const revalidate = 60;

const getChef = async (uid: string) => {
  if (!contentstackConfigured || !Stack) return null;
  const Query = Stack.ContentType("chef").Query();
  Query.where("uid", uid);
  try {
    const result = await Query.toJSON().find();
    return result[0]?.[0] || null;
  } catch {
    return null;
  }
};

const getRecipesByChef = async (chefUid: string) => {
  if (!contentstackConfigured || !Stack) return [];
  const Query = Stack.ContentType("recipe").Query();
  Query.includeReference(["category", "chef"]);
  try {
    const result = await Query.toJSON().find();
    const allRecipes = result[0] || [];
    return allRecipes.filter((r: any) => 
      r.chef?.some((c: any) => c.uid === chefUid)
    );
  } catch {
    return [];
  }
};

export default async function ChefProfilePage({ params }: any) {
  const { uid } = await params;
  const [chef, chefRecipes] = await Promise.all([
    getChef(uid),
    getRecipesByChef(uid)
  ]);

  if (!chef) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center animate-fade-in-up">
        <h1 className="text-3xl font-bold text-stone-900">Chef Profile Not Found</h1>
        <Link href="/chefs" className="text-orange-500 mt-4 inline-block font-semibold hover:underline">
          Return to Chefs Archive
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 w-full animate-fade-in-up">
      <Link href="/chefs" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-stone-200 text-stone-600 hover:text-stone-900 shadow-sm hover:shadow transition-all duration-300 mb-8 group font-semibold">
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 group-hover:-translate-x-1 transition-transform" stroke="currentColor" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        Back to Chefs
      </Link>

      {/* Chef Profile Hero */}
      <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-[0_20px_50px_rgba(8,112,184,0.07)] border border-stone-200/60 mb-16 flex flex-col md:flex-row gap-12 items-center">
         <div className="relative w-48 h-48 md:w-64 md:h-64 shrink-0">
           <div className="absolute inset-0 bg-stone-100 rounded-full animate-pulse" />
           {chef.profile_image?.url ? (
             <img src={chef.profile_image.url} alt={chef.name} className="w-full h-full object-cover rounded-full shadow-2xl relative z-10 border-8 border-stone-50" />
           ) : (
             <img src={`https://ui-avatars.com/api/?name=${chef.name || chef.title}&size=300`} alt={chef.name} className="w-full h-full object-cover rounded-full shadow-2xl relative z-10 border-8 border-stone-50" />
           )}
         </div>
         <div className="text-center md:text-left space-y-6">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 border border-orange-200 text-orange-600 text-xs font-bold uppercase tracking-wider mb-2 shadow-sm">
             <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
             Executive Chef Profile
           </div>
           <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-stone-900 leading-[1.1]">
             {chef.name || chef.title}
           </h1>
           <p className="text-stone-500 text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
             {chef.bio}
           </p>
         </div>
      </div>

      {/* Chef's Recipes */}
      <div className="mb-10 border-b border-stone-200 pb-4">
        <h2 className="text-3xl font-extrabold text-stone-900">Recipes by {chef.name || chef.title}</h2>
      </div>

      {chefRecipes.length === 0 ? (
        <div className="text-center py-20 bg-stone-50 rounded-[2rem] border border-stone-200 border-dashed">
          <div className="text-5xl mb-4 opacity-40 grayscale">🍽️</div>
          <h3 className="text-xl font-bold text-stone-800">No recipes yet</h3>
          <p className="text-stone-500 mt-2 font-medium">This chef hasn't published any recipes.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {chefRecipes.map((recipe: any, index: number) => (
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
