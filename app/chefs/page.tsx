import Stack, { contentstackConfigured } from "@/lib/contentstack";
import Link from "next/link";

export const revalidate = 60; // ISR for better performance

const getChefs = async () => {
  if (!contentstackConfigured || !Stack) return [];

  const Query = Stack.ContentType("chef").Query();

  try {
    const result = await Query.toJSON().find();
    return result[0] || [];
  } catch (error) {
    console.error("Error fetching chefs:", error);
    return [];
  }
};

export default async function ChefsPage() {
  const chefs = await getChefs();

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 w-full animate-fade-in-up">
      <div className="mb-16 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold capitalize mb-6 text-stone-900 tracking-tight">
          Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">Master Chefs</span>
        </h1>
        <p className="text-stone-500 text-xl font-medium max-w-2xl mx-auto">
          The brilliant minds behind the most exquisite recipes on Taste Theory.
        </p>
      </div>

      {chefs.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-[2rem] border border-stone-200 border-dashed shadow-sm">
          <div className="text-7xl mb-6 opacity-40 grayscale">👨‍🍳</div>
          <h3 className="text-2xl font-bold text-stone-800">No chefs found</h3>
          <p className="text-stone-500 mt-3 font-medium text-lg">We couldn't find any chefs enrolled yet.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {chefs.map((chef: any, index: number) => (
            <Link 
              key={chef.uid}
              href={`/chefs/${chef.uid}`}
              className="bg-white border border-stone-100 rounded-[2rem] overflow-hidden hover:border-orange-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_-15px_rgba(249,115,22,0.15)] transition-all duration-500 h-full flex flex-col group hover:-translate-y-2 opacity-0 animate-[fade-in-up_0.6s_ease-out_forwards]"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="relative h-64 overflow-hidden bg-stone-100 flex items-center justify-center p-6">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 to-rose-100/50 z-0"></div>
                {chef.profile_image?.url ? (
                  <img
                    src={chef.profile_image.url}
                    alt={chef.name || "Chef"}
                    className="w-40 h-40 object-cover rounded-full shadow-2xl border-4 border-white transform group-hover:scale-110 transition-transform duration-700 ease-out z-10"
                  />
                ) : (
                  <img
                    src={`https://ui-avatars.com/api/?name=${chef.name || chef.title}&background=random&size=200`}
                    alt={chef.name || "Chef"}
                    className="w-40 h-40 object-cover rounded-full shadow-2xl border-4 border-white transform group-hover:scale-110 transition-transform duration-700 ease-out z-10"
                  />
                )}
              </div>

              <div className="p-8 flex-1 flex flex-col z-30 bg-white relative text-center">
                <div className="inline-flex items-center gap-1.5 self-center px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-xs font-bold uppercase tracking-wider mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                  Executive Chef
                </div>
                <h2 className="text-3xl font-bold text-stone-900 mb-4 group-hover:text-orange-600 transition-colors leading-tight">
                  {chef.name || chef.title}
                </h2>
                <p className="text-stone-500 text-base mb-6 flex-1 font-medium leading-relaxed">
                  {chef.bio || "An experienced culinary expert with a passion for bringing out the best flavors."}
                </p>
                <div className="mt-auto pt-6 border-t border-stone-100 flex justify-center">
                   <div className="text-stone-400 group-hover:text-orange-500 transition-colors font-bold text-sm tracking-wide flex justify-center items-center gap-1.5 group-hover:underline">
                      View Profile <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 ml-0.5" stroke="currentColor" strokeWidth="3"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
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
