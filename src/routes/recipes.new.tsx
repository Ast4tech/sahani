import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { PageLayout } from "@/components/sahani/PageLayout";
import { RecipeForm } from "@/components/recipes/RecipeForm";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/recipes/new")({
	component: CreateRecipePage,
});

function CreateRecipePage() {
	const { data: session, isPending: sessionPending } = authClient.useSession();
	const navigate = useNavigate();

	if (sessionPending) {
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

	return (
		<PageLayout userName={session.user.name}>
			<RecipeForm mode="create" />
		</PageLayout>
	);
}
