import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { LandingPage } from "@/components/landing/LandingPage";
import { PageLayout } from "@/components/sahani/PageLayout";

export const Route = createFileRoute("/")({
	component: RootPage,
});

function RootPage() {
	const navigate = useNavigate();
	const { data: session, isPending: sessionPending } = authClient.useSession();
	const userProfile = useQuery(
		api.userProfile.get,
		session?.user ? {} : "skip",
	);
	const getOrCreate = useMutation(api.userProfile.getOrCreate);

	// Existing data check — if no profile but user has data, create a completed profile
	const mealPlans = useQuery(
		api.mealPlans.listByDate,
		session?.user ? { date: new Date().toISOString().split("T")[0] } : "skip",
	);
	const recipes = useQuery(
		api.recipes.list,
		session?.user ? {} : "skip",
	);

	useEffect(() => {
		if (!session?.user || sessionPending) return;
		// Still loading profile
		if (userProfile === undefined) return;

		if (userProfile === null) {
			const hasExistingData =
				(mealPlans !== undefined && mealPlans.length > 0) ||
				(recipes !== undefined && recipes.length > 0);

			if (hasExistingData) {
				// Existing user with no profile — create a completed one (don't redirect)
				getOrCreate();
			} else {
				// New user — send to onboarding
				navigate({ to: "/onboarding" });
			}
		} else if (!userProfile.onboardingCompleted) {
			navigate({ to: "/onboarding" });
		}
	}, [session, sessionPending, userProfile, mealPlans, recipes, navigate, getOrCreate]);

	if (sessionPending || (session?.user && userProfile === undefined)) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-background">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
			</div>
		);
	}

	if (session?.user) {
		return (
			<PageLayout userName={session.user.name}>
				<Dashboard userName={session.user.name} email={session.user.email} />
			</PageLayout>
		);
	}

	return <LandingPage />;
}
