import { Sidebar } from "@/components/Sidebar";
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
  const recipes = useQuery(api.recipes.list);
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);

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
        <RecipeList
          recipes={recipes}
          selectedRecipeId={selectedRecipe?._id ?? null}
          onSelect={setSelectedRecipeId}
        />

        {/* Column 3: Recipe Content */}
        <div className="flex-1 overflow-y-auto bg-white flex">
          <RecipeDetail
            key={selectedRecipe?._id}
            recipe={selectedRecipe ?? null}
          />
        </div>
      </main>
    </div>
  );
}
