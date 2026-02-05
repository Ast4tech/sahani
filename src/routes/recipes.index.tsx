import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { createFileRoute } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";
import {
  ChefHat,
  Clock,
  Filter,
  Loader2,
  Minus,
  Plus,
  Star,
  Utensils,
} from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/recipes/")({
  component: RecipesPage,
});

function RecipesPage() {
  const { data: session, isPending: sessionPending } = authClient.useSession();
  const recipes = useQuery(api.recipes.list);
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);
  const [servings, setServings] = useState(1);

  const selectedRecipe = useMemo(() => {
    if (!recipes || !selectedRecipeId) return recipes?.[0] || null;
    return recipes.find((r) => r._id === selectedRecipeId) || recipes[0];
  }, [recipes, selectedRecipeId]);

  if (sessionPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F9FA]">
        <Loader2 className="w-8 h-8 text-[#13EC5B] animate-spin" />
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F9FA]">
        <p>Please log in to view recipes.</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      <Sidebar userName={session.user.name} activePath="/recipes" />

      <main className="flex-1 ml-64 flex overflow-hidden h-screen">
        {/* Column 2: Recipe List */}
        <div className="w-[400px] border-r border-[#E2E8F0] bg-white flex flex-col">
          <div className="p-6 flex items-center justify-between border-b border-[#E2E8F0]">
            <h1 className="text-xl font-black text-[#1A1A1A]">All Recipes</h1>
            <Button variant="ghost" size="icon" className="text-[#4A5568]">
              <Filter className="w-5 h-5" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {recipes === undefined ? (
              <div className="flex justify-center py-10">
                <Loader2 className="w-6 h-6 text-[#13EC5B] animate-spin" />
              </div>
            ) : recipes.length === 0 ? (
              <div className="text-center py-10">
                <ChefHat className="w-12 h-12 text-[#A0AEC0] mx-auto mb-3" />
                <p className="text-[#1A1A1A] font-bold">No recipes yet</p>
              </div>
            ) : (
              recipes.map((recipe) => (
                <button
                  key={recipe._id}
                  type="button"
                  onClick={() => setSelectedRecipeId(recipe._id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex gap-4 group ${
                    selectedRecipe?._id === recipe._id
                      ? "bg-[#13EC5B]/5 border-[#13EC5B] shadow-sm"
                      : "bg-white border-transparent hover:border-[#E2E8F0] hover:bg-[#F8F9FA]"
                  }`}
                >
                  <div className="w-20 h-20 rounded-xl bg-[#F8F9FA] overflow-hidden flex-shrink-0 border border-[#E2E8F0]">
                    {recipe.imageUrl ? (
                      <img
                        src={recipe.imageUrl}
                        alt={recipe.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ChefHat className="w-8 h-8 text-[#A0AEC0]" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-[#1A1A1A] truncate">
                      {recipe.name}
                    </h3>
                    <p className="text-xs text-[#4A5568] line-clamp-2 mt-1 leading-relaxed">
                      {recipe.description || "A delicious healthy recipe."}
                    </p>
                    <div className="flex gap-2 mt-2">
                      {recipe.tags?.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-bold text-[#4A5568] bg-[#F8F9FA] px-2 py-0.5 rounded border border-[#E2E8F0]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Column 3: Recipe Content */}
        <div className="flex-1 overflow-y-auto bg-white flex">
          {selectedRecipe ? (
            <>
              <div className="flex-1 p-10 max-w-3xl">
                <h2 className="text-4xl font-black text-[#1A1A1A] leading-tight mb-4">
                  {selectedRecipe.name}
                </h2>
                <p className="text-[#4A5568] leading-relaxed mb-8">
                  {selectedRecipe.description ||
                    "This recipe is the perfect way to enjoy a healthy and delicious meal. Using fresh ingredients and simple steps, you can create a restaurant-quality dish at home."}
                </p>

                <div className="grid grid-cols-4 gap-4 mb-10">
                  <div className="bg-[#F8F9FA] border border-[#E2E8F0] rounded-2xl p-4 text-center">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Utensils className="w-5 h-5 text-orange-500" />
                    </div>
                    <p className="text-[10px] font-bold text-[#A0AEC0] uppercase tracking-wider">
                      Kcals
                    </p>
                    <p className="text-lg font-black text-[#1A1A1A]">
                      {selectedRecipe.calories}
                    </p>
                  </div>
                  <div className="bg-[#F8F9FA] border border-[#E2E8F0] rounded-2xl p-4 text-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Clock className="w-5 h-5 text-blue-500" />
                    </div>
                    <p className="text-[10px] font-bold text-[#A0AEC0] uppercase tracking-wider">
                      Prep
                    </p>
                    <p className="text-lg font-black text-[#1A1A1A]">
                      {(selectedRecipe.prepTimeMinutes || 0) +
                        (selectedRecipe.cookTimeMinutes || 0)}
                      M
                    </p>
                  </div>
                  <div className="bg-[#F8F9FA] border border-[#E2E8F0] rounded-2xl p-4 text-center">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Utensils className="w-5 h-5 text-yellow-500" />
                    </div>
                    <p className="text-[10px] font-bold text-[#A0AEC0] uppercase tracking-wider">
                      Carbs
                    </p>
                    <p className="text-lg font-black text-[#1A1A1A]">
                      {selectedRecipe.carbs || 0}
                    </p>
                  </div>
                  <div className="bg-[#F8F9FA] border border-[#E2E8F0] rounded-2xl p-4 text-center">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Utensils className="w-5 h-5 text-[#13EC5B]" />
                    </div>
                    <p className="text-[10px] font-bold text-[#A0AEC0] uppercase tracking-wider">
                      Fat
                    </p>
                    <p className="text-lg font-black text-[#1A1A1A]">
                      {selectedRecipe.fat || 0}
                    </p>
                  </div>
                </div>

                <div className="mb-10">
                  <h3 className="text-2xl font-black text-[#1A1A1A] mb-6">
                    How to make it
                  </h3>
                  <div className="space-y-6">
                    {(
                      selectedRecipe.instructions?.split("\n") || [
                        "Start by preparing all your fresh ingredients.",
                        "Follow the combined steps to cook the meal to perfection.",
                        "Serve immediately and enjoy your healthy creation!",
                      ]
                    ).map((step, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0 text-orange-600 font-bold">
                          {String(i + 1).padStart(2, "0")}
                        </div>
                        <p className="text-[#4A5568] leading-relaxed pt-1">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-black text-[#1A1A1A]">
                      Reviews
                    </h3>
                    <span className="text-lg font-bold text-[#A0AEC0]">07</span>
                  </div>
                  <div className="space-y-4">
                    {[
                      {
                        name: "Khondokar Touhid Likhon",
                        rating: 5.0,
                        text: "This recipe is the perfect way to enjoy a healthy and delicious meal!",
                      },
                    ].map((review, i) => (
                      <div
                        key={i}
                        className="p-6 bg-[#F8F9FA] border border-[#E2E8F0] rounded-2xl"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200" />
                            <p className="font-bold text-[#1A1A1A]">
                              {review.name}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-bold text-[#1A1A1A]">
                              {review.rating.toFixed(1)}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-[#4A5568] leading-relaxed">
                          {review.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Side Panel: Ingredients & Nutrition */}
              <div className="w-[350px] p-10 bg-white border-l border-[#E2E8F0] hidden xl:block overflow-y-auto">
                <div className="relative mb-10 group">
                  <div className="aspect-square rounded-3xl bg-gray-100 overflow-hidden border border-[#E2E8F0]">
                    <img
                      src={
                        selectedRecipe.imageUrl ||
                        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
                      }
                      alt="Chef or Food"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="mb-10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-black text-[#1A1A1A]">
                      Ingredients
                    </h3>
                    <div className="flex items-center bg-[#F8F9FA] rounded-lg border border-[#E2E8F0] p-1">
                      <button
                        type="button"
                        onClick={() => setServings(Math.max(1, servings - 1))}
                        className="p-1 hover:text-[#13EC5B] transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-3 text-xs font-bold text-[#1A1A1A]">
                        {servings.toString().padStart(2, "0")}
                      </span>
                      <button
                        type="button"
                        onClick={() => setServings(servings + 1)}
                        className="p-1 hover:text-[#13EC5B] transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <ul className="space-y-4">
                    {(
                      selectedRecipe.ingredients || [
                        { name: "Fresh ingredients", amount: "Various" },
                      ]
                    ).map((ing, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#13EC5B]/20 flex items-center justify-center flex-shrink-0">
                          <div className="w-2 h-2 rounded-full bg-[#13EC5B]" />
                        </div>
                        <p className="text-sm text-[#4A5568]">
                          <span className="font-bold text-[#1A1A1A]">
                            {ing.amount} {ing.unit}{" "}
                          </span>
                          {ing.name}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-black text-[#1A1A1A] mb-6">
                    Nutrition Facts
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                          <Utensils className="w-4 h-4 text-orange-500" />
                        </div>
                        <p className="text-sm font-bold text-[#4A5568]">
                          Calories
                        </p>
                      </div>
                      <p className="font-black text-[#1A1A1A]">
                        {selectedRecipe.calories}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                          <Utensils className="w-4 h-4 text-blue-500" />
                        </div>
                        <p className="text-sm font-bold text-[#4A5568]">
                          Protein
                        </p>
                      </div>
                      <p className="font-black text-[#1A1A1A]">
                        {selectedRecipe.protein || 0}g
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center">
                          <Utensils className="w-4 h-4 text-yellow-500" />
                        </div>
                        <p className="text-sm font-bold text-[#4A5568]">
                          Total Fat
                        </p>
                      </div>
                      <p className="font-black text-[#1A1A1A]">
                        {selectedRecipe.fat || 0}g
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ChefHat className="w-16 h-16 text-[#A0AEC0] mx-auto mb-4" />
                <p className="text-[#4A5568] font-bold">
                  Select a recipe to view details
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
