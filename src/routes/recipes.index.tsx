import { PageLayout } from "@/components/sahani/PageLayout";
import { RecipeDetail } from "@/components/recipes/RecipeDetail";
import { RecipeList } from "@/components/recipes/RecipeList";
import { authClient } from "@/lib/auth-client";
import { createFileRoute } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/recipes/")({
  component: RecipesPage,
});

function RecipesPage() {
  const { data: session, isPending: sessionPending } = authClient.useSession();
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const recipes = useQuery(api.recipes.list, { favoritesOnly: showFavoritesOnly });
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);

  const selectedRecipe = useMemo(() => {
    if (!recipes || !selectedRecipeId) return recipes?.[0] || null;
    return recipes.find((r) => r._id === selectedRecipeId) || recipes[0];
  }, [recipes, selectedRecipeId]);

  if (sessionPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-secondary">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-secondary">
        <p>Please log in to view recipes.</p>
      </div>
    );
  }

  return (
    <PageLayout userName={session.user.name} className="p-0">
      <div className="flex overflow-hidden h-screen">
        {/* Column 2: Recipe List */}
        <RecipeList
          recipes={recipes}
          selectedRecipeId={selectedRecipe?._id ?? null}
          onSelect={setSelectedRecipeId}
          showFavoritesOnly={showFavoritesOnly}
          onToggleFavorites={() => setShowFavoritesOnly(!showFavoritesOnly)}
        />

        {/* Column 3: Recipe Content */}
        <div className="flex-1 overflow-y-auto bg-card flex">
          <RecipeDetail
            key={selectedRecipe?._id}
            recipe={selectedRecipe ?? null}
          />
        </div>
      </div>
    </PageLayout>
  );
}
