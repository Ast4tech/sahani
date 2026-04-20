import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import { Loader2, Salad, Scale, Dumbbell } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

type HealthGoal = "eat_healthy" | "lose_weight" | "build_muscle";

const GOALS: { id: HealthGoal; label: string; desc: string; Icon: React.ElementType }[] = [
	{
		id: "eat_healthy",
		label: "Eat Healthier",
		desc: "Build balanced, nutritious habits",
		Icon: Salad,
	},
	{
		id: "lose_weight",
		label: "Lose Weight",
		desc: "Calorie-smart meals that satisfy",
		Icon: Scale,
	},
	{
		id: "build_muscle",
		label: "Build Muscle",
		desc: "High-protein plans for gains",
		Icon: Dumbbell,
	},
];

const FOOD_EXCLUSIONS: { id: string; label: string; emoji: string }[] = [
	{ id: "gluten", label: "Gluten", emoji: "🌾" },
	{ id: "dairy", label: "Dairy", emoji: "🥛" },
	{ id: "nuts", label: "Nuts", emoji: "🥜" },
	{ id: "meat", label: "Meat", emoji: "🥩" },
	{ id: "shellfish", label: "Shellfish", emoji: "🦐" },
	{ id: "eggs", label: "Eggs", emoji: "🥚" },
	{ id: "soy", label: "Soy", emoji: "🫘" },
	{ id: "fish", label: "Fish", emoji: "🐟" },
];

export const Route = createFileRoute("/onboarding")({
	component: OnboardingPage,
});

function OnboardingPage() {
	const navigate = useNavigate();
	const { data: session, isPending: sessionPending } = authClient.useSession();

	const upsertProfile = useMutation(api.userProfile.upsert);
	const seedNutrition = useMutation(api.nutritionTargets.seedFromGoal);

	const [selectedGoal, setSelectedGoal] = useState<HealthGoal | null>(null);
	const [selectedFoods, setSelectedFoods] = useState<Set<string>>(new Set());
	const [isSubmitting, setIsSubmitting] = useState(false);

	// Auth guard — redirect unauthenticated users after session resolves
	useEffect(() => {
		if (!sessionPending && !session?.user) {
			navigate({ to: "/login" });
		}
	}, [sessionPending, session, navigate]);

	// Show spinner while session is loading or while redirecting
	if (sessionPending || !session?.user) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-secondary">
				<Loader2 className="w-8 h-8 text-primary animate-spin" />
			</div>
		);
	}

	const toggleFood = (id: string) => {
		setSelectedFoods((prev) => {
			const next = new Set(prev);
			if (next.has(id)) next.delete(id);
			else next.add(id);
			return next;
		});
	};

	const completeOnboarding = async (goal: HealthGoal, foods: string[]) => {
		setIsSubmitting(true);
		try {
			await upsertProfile({
				healthGoal: goal,
				foodsToAvoid: foods,
				onboardingCompleted: true,
			});
			await seedNutrition({ healthGoal: goal });
			navigate({ to: "/" });
		} catch (err) {
			console.error("Failed to complete onboarding", err);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleSubmit = () => {
		if (!selectedGoal) return;
		completeOnboarding(selectedGoal, Array.from(selectedFoods));
	};

	const handleSkip = () => {
		completeOnboarding("eat_healthy", []);
	};

	return (
		<div className="min-h-screen bg-secondary font-['Manrope',sans-serif]">
			{/* Header */}
			<header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-border bg-card/80 backdrop-blur-md px-10 py-3">
				<Link to="/" className="flex items-center gap-2">
					<div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
						<span className="material-icons text-white text-lg">restaurant_menu</span>
					</div>
					<span className="font-bold text-lg text-foreground">sahani</span>
				</Link>
			</header>

			<main className="flex min-h-screen pt-[64px] items-start justify-center py-12 px-6">
				<div className="w-full max-w-[560px]">
					{/* Progress */}
					<div className="flex flex-col gap-3 mb-10">
						<div className="flex gap-6 justify-between items-center">
							<p className="text-foreground text-base font-bold leading-normal">
								Step 2: Personalise Your Plan
							</p>
							<p className="text-foreground text-sm font-medium leading-normal">2 / 2</p>
						</div>
						<div className="rounded-full bg-border h-2 overflow-hidden">
							<div className="h-2 rounded-full bg-primary w-full" />
						</div>
						<p className="text-muted-foreground text-sm font-medium">
							Almost there! This helps us tailor your recipes.
						</p>
					</div>

					{/* Heading */}
					<div className="mb-8">
						<h2 className="text-foreground tracking-tight text-3xl font-black leading-tight">
							What's your main goal?
						</h2>
						<p className="text-muted-foreground mt-2">
							We'll set up your nutrition targets automatically.
						</p>
					</div>

					{/* Goal Cards */}
					<div className="grid grid-cols-3 gap-4 mb-10">
						{GOALS.map(({ id, label, desc, Icon }) => {
							const isActive = selectedGoal === id;
							return (
								<button
									key={id}
									type="button"
									onClick={() => setSelectedGoal(id)}
									className={`flex flex-col items-center gap-3 p-5 rounded-2xl border-2 text-center transition-all ${
										isActive
											? "border-primary bg-primary/10 shadow-md shadow-primary/10"
											: "border-border bg-card hover:border-primary/50 hover:bg-primary/5"
									}`}
								>
									<div
										className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
											isActive ? "bg-primary text-white" : "bg-secondary text-muted-foreground"
										}`}
									>
										<Icon className="w-6 h-6" />
									</div>
									<div>
										<p className={`text-sm font-black leading-tight ${isActive ? "text-primary" : "text-foreground"}`}>
											{label}
										</p>
										<p className="text-[11px] text-muted-foreground mt-1 font-medium leading-tight">{desc}</p>
									</div>
								</button>
							);
						})}
					</div>

					{/* Food Exclusions */}
					<div className="mb-10">
						<h3 className="text-foreground font-black mb-1">
							Any foods to avoid?{" "}
							<span className="text-muted-foreground font-medium text-sm">(optional)</span>
						</h3>
						<p className="text-muted-foreground text-sm mb-4">
							Select anything you don't eat. We'll keep these out of your recommendations.
						</p>
						<div className="flex flex-wrap gap-3">
							{FOOD_EXCLUSIONS.map(({ id, label, emoji }) => {
								const isSelected = selectedFoods.has(id);
								return (
									<button
										key={id}
										type="button"
										onClick={() => toggleFood(id)}
										className={`flex items-center gap-2 px-4 py-2.5 rounded-full border-2 text-sm font-bold transition-all ${
											isSelected
												? "border-primary bg-primary/10 text-primary"
												: "border-border bg-card text-foreground hover:border-primary/50"
										}`}
									>
										<span>{emoji}</span>
										{label}
									</button>
								);
							})}
						</div>
					</div>

					{/* Actions */}
					<div className="flex flex-col gap-3">
						<Button
							onClick={handleSubmit}
							disabled={!selectedGoal || isSubmitting}
							className="w-full h-14 bg-primary text-foreground font-black tracking-[0.015em] hover:bg-sahani-green-hover shadow-lg shadow-primary/20 disabled:opacity-50 transition-colors rounded-xl"
						>
							{isSubmitting ? (
								<span className="flex items-center gap-2">
									<Loader2 className="h-5 w-5 animate-spin" />
									Setting up your plan...
								</span>
							) : (
								"Let's go →"
							)}
						</Button>
						<button
							type="button"
							onClick={handleSkip}
							disabled={isSubmitting}
							className="text-sm text-muted-foreground font-medium hover:text-foreground transition-colors py-2"
						>
							Skip for now — I'll set this up later
						</button>
					</div>
				</div>
			</main>
		</div>
	);
}

export default OnboardingPage;
