import { Button } from "@/components/ui/button";
import type { Doc } from "convex/_generated/dataModel";
import { ChefHat, Filter, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface RecipeListProps {
  recipes: Doc<"recipes">[] | undefined;
  selectedRecipeId: string | null;
  onSelect: (id: string) => void;
  showFavoritesOnly?: boolean;
  onToggleFavorites?: () => void;
}

export function RecipeList({
  recipes,
  selectedRecipeId,
  onSelect,
  showFavoritesOnly,
  onToggleFavorites,
}: RecipeListProps) {
  return (
    <div className="w-[400px] border-r border-border bg-card flex flex-col">
      <div className="p-6 flex items-center justify-between border-b border-border">
        <h1 className="text-xl font-black text-foreground">
          {showFavoritesOnly ? "Favorite Recipes" : "All Recipes"}
        </h1>
        <Button
          variant={showFavoritesOnly ? "default" : "ghost"}
          size="icon"
          onClick={onToggleFavorites}
          className={cn(
            "transition-colors",
            showFavoritesOnly && "bg-primary text-primary-foreground"
          )}
          aria-label={showFavoritesOnly ? "Show all recipes" : "Show favorites only"}
        >
          <Filter className="w-5 h-5" />
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {recipes === undefined ? (
          <div className="flex justify-center py-10">
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
          </div>
        ) : recipes.length === 0 ? (
          <div className="text-center py-10">
            <ChefHat className="w-12 h-12 text-sahani-tertiary mx-auto mb-3" />
            <p className="text-foreground font-bold">No recipes yet</p>
          </div>
        ) : (
          recipes.map((recipe) => (
            <button
              key={recipe._id}
              type="button"
              onClick={() => onSelect(recipe._id)}
              className={`w-full text-left p-4 rounded-2xl border transition-all flex gap-4 group ${
                selectedRecipeId === recipe._id
                  ? "bg-primary/5 border-primary shadow-sm"
                  : "bg-card border-transparent hover:border-border hover:bg-secondary"
              }`}
            >
              <div className="w-20 h-20 rounded-xl bg-secondary overflow-hidden flex-shrink-0 border border-border">
                {recipe.imageUrl ? (
                  <img
                    src={recipe.imageUrl}
                    alt={recipe.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ChefHat className="w-8 h-8 text-sahani-tertiary" />
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-foreground truncate">
                  {recipe.name}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
                  {recipe.description || "A delicious healthy recipe."}
                </p>
                <div className="flex gap-2 mt-2">
                  {recipe.tags?.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-bold text-muted-foreground bg-secondary px-2 py-0.5 rounded border border-border"
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
