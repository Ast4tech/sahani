import { Link } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { SahaniCard } from "@/components/sahani/SahaniCard";
import { NutritionRing } from "@/components/sahani/NutritionRing";
import { MacroBar } from "@/components/sahani/MacroBar";
import { RecipeCard } from "@/components/sahani/RecipeCard";
import {
	Activity,
	ArrowRight,
	ChefHat,
	Clock,
	Flame,
	Plus,
	ShoppingCart,
	Sparkles,
	TrendingUp,
} from "lucide-react";

interface DashboardProps {
	userName: string;
	email: string;
}

export function Dashboard({ userName }: DashboardProps) {
  const todayStr = new Date().toISOString().split("T")[0];
  const nutritionTargets = useQuery(api.nutritionTargets.get);
  const dailyTotals = useQuery(api.nutritionTargets.calculateDailyTotals, {
    date: todayStr,
  });
  const mealPlans = useQuery(api.mealPlans.listByDate, { date: todayStr });
  const trendingRecipes = useQuery(api.recipes.list, {});
  const shoppingLists = useQuery(api.shoppingLists.list);
  const dailyTip = useQuery(api.dailyTips.getDaily);

	const calorieTarget = nutritionTargets?.dailyCalories ?? 2000;
	const caloriesConsumed = Math.round(dailyTotals?.calories ?? 0);

	const proteinTarget = nutritionTargets?.proteinGrams ?? 150;
	const proteinConsumed = Math.round(dailyTotals?.protein ?? 0);

	const carbsTarget = nutritionTargets?.carbsGrams ?? 250;
	const carbsConsumed = Math.round(dailyTotals?.carbs ?? 0);

	const currentList = shoppingLists?.[0];
	const pendingShoppingItems = currentList?.items.filter(i => !i.checked).slice(0, 4) || [];

	// Detect new users: no meal plans AND no recipes → show welcome state
	const isNewUser =
		mealPlans !== undefined &&
		trendingRecipes !== undefined &&
		mealPlans.length === 0 &&
		trendingRecipes.length === 0;

	const nextMeal = useMemo(() => {
		if (!mealPlans || mealPlans.length === 0) return null;
		const hour = new Date().getHours();
		let type: "breakfast" | "lunch" | "dinner" | "snack" = "breakfast";
		if (hour >= 10 && hour < 14) type = "lunch";
		else if (hour >= 14 && hour < 18) type = "snack";
		else if (hour >= 18) type = "dinner";

		const plan = mealPlans.find(p => p.mealType === type) || mealPlans[0];
		return plan;
	}, [mealPlans]);

	const nextRecipe = useQuery(api.recipes.get, nextMeal ? { id: nextMeal.recipeId } : "skip" as any);

	// Welcome state for new users
	if (isNewUser) {
		return (
			<>
				<div className="flex items-center justify-between mb-10">
					<div>
						<h1 className="text-3xl font-black text-foreground tracking-tight">
							Welcome to sahani, {userName.split(" ")[0]}! 🎉
						</h1>
						<p className="text-muted-foreground font-medium mt-1">
							Your personalised meal planning journey starts here.
						</p>
					</div>
				</div>

				<div className="grid grid-cols-12 gap-8">
					<div className="col-span-8 space-y-8">
						{/* Calorie target card */}
						<SahaniCard variant="hero" padding="lg">
							<div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-[120px] opacity-20 -mr-40 -mt-40" />
							<div className="relative z-10">
								<span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] bg-primary/10 px-3 py-1.5 rounded-full mb-6 inline-block border border-primary/20">
									Your plan is ready
								</span>
								<h2 className="text-4xl font-black mb-3 leading-tight">
									Targeting {calorieTarget.toLocaleString()} kcal/day
								</h2>
								<div className="flex gap-6 mb-8 text-sahani-tertiary text-sm font-bold">
									<span className="text-blue-400">{nutritionTargets?.proteinGrams ?? 150}g protein</span>
									<span className="text-amber-400">{nutritionTargets?.carbsGrams ?? 250}g carbs</span>
									<span className="text-rose-400">{nutritionTargets?.fatGrams ?? 65}g fat</span>
								</div>
								<p className="text-sahani-tertiary font-medium mb-8 max-w-sm">
									Start by adding some recipes to your collection, then build your first week of meals.
								</p>
								<div className="flex gap-4">
									<Link to="/meal-planner">
										<Button className="bg-primary text-primary-foreground font-black rounded-2xl h-14 px-10 hover:bg-sahani-green-hover shadow-xl shadow-primary/20">
											Plan This Week
										</Button>
									</Link>
									<Link to="/recipes">
										<Button variant="outline" className="rounded-2xl h-14 px-10 font-black border-white/20 text-white hover:bg-white/10">
											Browse Recipes
										</Button>
									</Link>
								</div>
							</div>
						</SahaniCard>

						{/* Suggested recipes */}
						<div>
							<div className="flex items-center justify-between mb-6">
								<h3 className="text-xl font-black text-foreground flex items-center gap-2">
									<TrendingUp className="w-5 h-5 text-primary" />
									Explore Recipes to Get Started
								</h3>
								<Link to="/recipes" className="text-xs font-black text-primary hover:underline uppercase tracking-wider">
									See All
								</Link>
							</div>
							<div className="flex gap-6 overflow-x-auto pb-4">
								{(trendingRecipes ?? []).slice(0, 3).map((recipe) => (
									<RecipeCard
										key={recipe._id}
										name={recipe.name}
										imageUrl={recipe.imageUrl}
										calories={recipe.calories}
										rating={4.9}
									/>
								))}
								{(trendingRecipes ?? []).length === 0 && (
									<Link
										to="/recipes/new"
										className="flex flex-col items-center justify-center w-48 h-64 rounded-3xl border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-all text-muted-foreground hover:text-primary"
									>
										<Plus className="w-8 h-8 mb-2" />
										<span className="text-sm font-bold">Add Your First Recipe</span>
									</Link>
								)}
							</div>
						</div>
					</div>

					{/* Right column */}
					<div className="col-span-4 space-y-8">
						<SahaniCard variant="default" className="rounded-[40px]">
							<h3 className="text-xl font-black text-foreground mb-8">Your Targets</h3>
							<NutritionRing value={0} target={calorieTarget} label="Calories" className="mb-10" />
							<div className="space-y-6">
								<MacroBar label="Protein" value={0} target={proteinTarget} color="blue" />
								<MacroBar label="Carbs" value={0} target={carbsTarget} color="amber" />
								<MacroBar label="Hydration" value={0} target={2500} color="cyan" />
							</div>
						</SahaniCard>

    <SahaniCard variant="dark" className="rounded-[40px]">
      <Sparkles className="absolute -bottom-4 -right-4 w-24 h-24 text-primary opacity-10 rotate-12" />
      <h4 className="font-black flex items-center gap-2 mb-4">
        <Sparkles className="w-4 h-4 text-primary" /> 
        Getting Started Tip
      </h4>
      <p className="text-xs text-sahani-tertiary leading-relaxed font-medium">
        Add a few recipes you love, then use the meal planner to assign them to your week. sahani will track your nutrition automatically.
      </p>
    </SahaniCard>
  </div>
</div>
</>);
  }

  // Get daily tip text (from Convex or fallback)
  const tipText = dailyTip?.text || "Adding a source of vitamin C (like lemon) to your spinach helps your body absorb the iron more efficiently.";

return (
		<>
			{/* Header */}
			<div className="flex items-center justify-between mb-10">
				<div>
					<h1 className="text-3xl font-black text-foreground tracking-tight">
						Good morning, {userName.split(" ")[0]}! 👋
					</h1>
					<p className="text-muted-foreground font-medium mt-1">
						Ready to crush your nutrition goals today?
					</p>
				</div>
				<div className="flex items-center gap-3">
					<Link to="/meal-planner">
						<Button className="bg-card border border-border text-foreground hover:bg-secondary rounded-2xl px-6 h-12 font-bold shadow-sm">
							View Planner
						</Button>
					</Link>
					<Button className="bg-primary hover:bg-sahani-green-hover text-primary-foreground rounded-2xl px-6 h-12 font-black shadow-lg shadow-primary/20 transition-all">
						<Plus className="w-5 h-5 mr-2" />
						Log Meal
					</Button>
				</div>
			</div>

			<div className="grid grid-cols-12 gap-8">
				{/* Left Column: Hero & Timeline */}
				<div className="col-span-8 space-y-8">
					{/* Hero: Today's Plate */}
					<SahaniCard variant="hero" padding="lg" className="group">
						<div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-[120px] opacity-20 -mr-40 -mt-40 transition-all group-hover:opacity-30" />
						<div className="relative z-10 flex gap-10 items-center">
							<div className="flex-1">
								<span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] bg-primary/10 px-3 py-1.5 rounded-full mb-6 inline-block border border-primary/20">
									Next up on your plate
								</span>
								{nextRecipe ? (
									<>
										<h2 className="text-4xl font-black mb-4 leading-tight">{nextRecipe.name}</h2>
										<div className="flex items-center gap-6 mb-8 text-sahani-tertiary">
											<div className="flex items-center gap-2">
												<Clock className="w-5 h-5 text-primary" />
												<span className="font-bold text-sm">{(nextRecipe.prepTimeMinutes || 0) + (nextRecipe.cookTimeMinutes || 0)} mins</span>
											</div>
											<div className="flex items-center gap-2">
												<Flame className="w-5 h-5 text-orange-500" />
												<span className="font-bold text-sm">{nextRecipe.calories} kcal</span>
											</div>
										</div>
										<Button className="bg-primary text-primary-foreground font-black rounded-2xl h-14 px-10 hover:bg-sahani-green-hover shadow-xl shadow-primary/20">
											View Recipe Details
										</Button>
									</>
								) : (
									<>
										<h2 className="text-4xl font-black mb-4 leading-tight">No meal planned yet</h2>
										<p className="text-sahani-tertiary font-medium mb-8 max-w-sm">
											You haven't assigned a recipe for your next meal. Let's find something healthy!
										</p>
										<Link to="/meal-planner">
											<Button className="bg-primary text-primary-foreground font-black rounded-2xl h-14 px-10 hover:bg-sahani-green-hover shadow-xl shadow-primary/20">
												Choose a Meal
											</Button>
										</Link>
									</>
								)}
							</div>
							<div className="w-72 h-72 rounded-[32px] bg-white/5 border border-white/10 overflow-hidden relative shadow-2xl">
								{nextRecipe?.imageUrl ? (
									<img src={nextRecipe.imageUrl} alt={nextRecipe.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
								) : (
									<div className="w-full h-full flex items-center justify-center opacity-20">
										<ChefHat className="w-24 h-24 text-white" />
									</div>
								)}
							</div>
						</div>
					</SahaniCard>

					{/* Timeline of Today */}
					<div>
						<h3 className="text-xl font-black text-foreground mb-6 flex items-center gap-2">
							<Activity className="w-5 h-5 text-primary" />
							Today's Timeline
						</h3>
						<div className="grid grid-cols-4 gap-4">
							{["breakfast", "lunch", "dinner", "snack"].map((type) => {
								const plan = mealPlans?.find(p => p.mealType === type);
								return (
									<SahaniCard key={type} variant="default" padding="sm" className="group">
										<p className="text-[10px] font-black text-sahani-tertiary uppercase tracking-widest mb-3">{type}</p>
										{plan ? (
											<div className="space-y-3">
												<div className="w-full h-24 rounded-2xl bg-secondary border border-border overflow-hidden">
													<ChefHat className="w-8 h-8 text-sahani-tertiary m-auto mt-8 opacity-20" />
												</div>
												<p className="text-sm font-black text-foreground line-clamp-1">Meal Logged</p>
											</div>
										) : (
											<Link to="/meal-planner" className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-border rounded-2xl hover:border-primary hover:bg-primary/5 transition-all">
												<Plus className="w-5 h-5 text-sahani-tertiary group-hover:text-primary" />
												<span className="text-[10px] font-black text-sahani-tertiary mt-1 group-hover:text-primary">ADD</span>
											</Link>
										)}
									</SahaniCard>
								);
							})}
						</div>
					</div>

					{/* Trending Recipes */}
					<div>
						<div className="flex items-center justify-between mb-6">
							<h3 className="text-xl font-black text-foreground flex items-center gap-2">
								<TrendingUp className="w-5 h-5 text-primary" />
								New in the Kitchen
							</h3>
							<Link to="/recipes" className="text-xs font-black text-primary hover:underline uppercase tracking-wider">
								Explore All
							</Link>
						</div>
						<div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
							{trendingRecipes?.slice(0, 6).map((recipe) => (
								<RecipeCard
									key={recipe._id}
									name={recipe.name}
									imageUrl={recipe.imageUrl}
									calories={recipe.calories}
									rating={4.9}
								/>
							))}
						</div>
					</div>
				</div>

				{/* Right Column: Nutrition Rings & Shopping */}
				<div className="col-span-4 space-y-8">
					{/* Nutrition Stats */}
					<SahaniCard variant="default" className="rounded-[40px]">
						<h3 className="text-xl font-black text-foreground mb-8">Live Nutrition</h3>
						<NutritionRing
							value={caloriesConsumed}
							target={calorieTarget}
							label="Calories"
							className="mb-10"
						/>
						<div className="space-y-6">
							<MacroBar label="Protein" value={proteinConsumed} target={proteinTarget} color="blue" />
							<MacroBar label="Carbs" value={carbsConsumed} target={carbsTarget} color="amber" />
							<MacroBar label="Hydration" value={1200} target={2500} color="cyan" />
						</div>
					</SahaniCard>

					{/* Shopping List Shortcut */}
					<SahaniCard variant="tip">
						<div className="flex items-center justify-between mb-6">
							<h3 className="font-black text-foreground flex items-center gap-2">
								<ShoppingCart className="w-5 h-5 text-primary" />
								Grocery List
							</h3>
							<Link to="/shopping" className="w-8 h-8 rounded-xl bg-card flex items-center justify-center text-primary shadow-sm hover:scale-110 transition-transform">
								<ArrowRight className="w-4 h-4" />
							</Link>
						</div>
						<div className="space-y-3">
							{pendingShoppingItems.length > 0 ? (
								pendingShoppingItems.map((item, idx) => (
									<div key={idx} className="bg-card p-4 rounded-2xl flex items-center gap-3 shadow-sm">
										<div className="w-5 h-5 rounded-full border-2 border-primary/30" />
										<p className="text-sm font-bold text-muted-foreground">{item.name}</p>
									</div>
								))
							) : (
								<div className="text-center py-6">
									<p className="text-xs font-bold text-sahani-tertiary">Your list is empty.</p>
								</div>
							)}
						</div>
					</SahaniCard>

    {/* Daily Tip */}
    <SahaniCard variant="dark" className="rounded-[40px]">
      <Sparkles className="absolute -bottom-4 -right-4 w-24 h-24 text-primary opacity-10 rotate-12" />
      <h4 className="font-black flex items-center gap-2 mb-4">
        <Sparkles className="w-4 h-4 text-primary" />
        Daily Tip
      </h4>
      <p className="text-xs text-sahani-tertiary leading-relaxed font-medium">
        {tipText}
      </p>
    </SahaniCard>
				</div>
			</div>
		</>
	);
}
