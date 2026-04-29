import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import type { Id } from "convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import { PageLayout } from "@/components/sahani/PageLayout";
import { RecipeForm } from "@/components/recipes/RecipeForm";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/recipes/$id/edit")({
	component: EditRecipePage,
});

function EditRecipePage() {
	const { id } = Route.useParams();
	const { data: session, isPending: sessionPending } = authClient.useSession();
	const navigate = useNavigate();
	const recipe = useQuery(api.recipes.get, { id: id as Id<"recipes"> });

	if (sessionPending || recipe === undefined) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-secondary">
				<Loader2 className="w-8 h-8 text-primary animate-spin" />
			</div>
		);
	}

	if (!session?.user) {
		navigate({ to: "/login" });
		return null;
	}

	if (!recipe) {
		return (
			<PageLayout userName={session.user.name}>
				<div className="flex items-center justify-center min-h-[400px]">
					<p className="text-muted-foreground font-bold">Recipe not found.</p>
				</div>
			</PageLayout>
		);
	}

	return (
		<PageLayout userName={session.user.name}>
			<RecipeForm
				mode="edit"
				initialData={{
					_id: recipe._id,
					name: recipe.name,
					description: recipe.description ?? "",
					prepTimeMinutes: recipe.prepTimeMinutes ?? 0,
					cookTimeMinutes: recipe.cookTimeMinutes ?? 0,
					servings: recipe.servings ?? 1,
					calories: recipe.calories,
					protein: recipe.protein ?? 0,
					carbs: recipe.carbs ?? 0,
					fat: recipe.fat ?? 0,
					imageUrl: recipe.imageUrl ?? "",
					tags: recipe.tags?.join(", ") ?? "",
					ingredients: recipe.ingredients,
					instructions: recipe.instructions ?? "",
					imageStorageId: (recipe as any).imageStorageId,
				}}
			/>
		</PageLayout>
	);
}
