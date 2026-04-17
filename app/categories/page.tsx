import Stack, { contentstackConfigured } from "@/lib/contentstack";
import Link from "next/link";

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

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 w-full animate-fade-in-up">
      <div className="mb-16 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold capitalize mb-6 text-stone-900 tracking-tight">
          Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">Categories</span>
        </h1>
        <p className="text-stone-500 text-xl font-medium max-w-2xl mx-auto">
          Discover a wide range of delicious recipes organized for your taste.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {categories.map((category: any, i: number) => (
          <Link key={category.uid || i} href={`/category/${category.title.toLowerCase()}`} className="group relative block aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-stone-100">
            <div className="absolute inset-0 bg-stone-200 animate-pulse -z-10" />
            {category.category_image?.url ? (
              <img src={category.category_image.url} alt={category.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-rose-100"></div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/40 to-transparent"></div>
            <div className="absolute inset-x-0 bottom-0 p-8">
              <span className="font-extrabold text-white text-3xl tracking-wide block mb-2">{category.title}</span>
              <p className="text-stone-300 font-medium line-clamp-2">{category.description || "Explore delicious recipes in this category."}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
