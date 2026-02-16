import { Button } from "@/components/ui/button";
import type { Doc } from "convex/_generated/dataModel";
import { ChefHat, Filter, Loader2 } from "lucide-react";

interface RecipeListProps {
  recipes: Doc<"recipes">[] | undefined;
  selectedRecipeId: string | null;
  onSelect: (id: string) => void;
}

export function RecipeList({ recipes, selectedRecipeId, onSelect }: RecipeListProps) {
  return (
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
              onClick={() => onSelect(recipe._id)}
              className={`w-full text-left p-4 rounded-2xl border transition-all flex gap-4 group ${
                selectedRecipeId === recipe._id
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
  );
}
