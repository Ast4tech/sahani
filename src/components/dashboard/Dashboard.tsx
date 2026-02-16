import { Link } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { useMemo } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import {
	Activity,
	ArrowRight,
	ChefHat,
	Clock,
	Flame,
	Plus,
	ShoppingCart,
	Sparkles,
	Star,
	TrendingUp,
} from "lucide-react";

interface DashboardProps {
	userName: string;
	email: string;
}

export function Dashboard({ userName, email }: DashboardProps) {
	const todayStr = new Date().toISOString().split("T")[0];
	const nutritionTargets = useQuery(api.nutritionTargets.get);
	const dailyTotals = useQuery(api.nutritionTargets.calculateDailyTotals, {
		date: todayStr,
	});
	const mealPlans = useQuery(api.mealPlans.listByDate, { date: todayStr });
	const trendingRecipes = useQuery(api.recipes.list, {});
	const shoppingLists = useQuery(api.shoppingLists.list);

	const calorieTarget = nutritionTargets?.dailyCalories ?? 2000;
	const caloriesConsumed = Math.round(dailyTotals?.calories ?? 0);
	const caloriePercent = Math.min(100, Math.round((caloriesConsumed / calorieTarget) * 100));

	const proteinTarget = nutritionTargets?.proteinGrams ?? 150;
	const proteinConsumed = Math.round(dailyTotals?.protein ?? 0);
	const proteinPercent = Math.min(100, Math.round((proteinConsumed / proteinTarget) * 100));

	const carbsTarget = nutritionTargets?.carbsGrams ?? 250;
	const carbsConsumed = Math.round(dailyTotals?.carbs ?? 0);
	const fatTarget = nutritionTargets?.fatGrams ?? 65;
	// const fatConsumed = Math.round(dailyTotals?.fat ?? 0); // Unused variable in original code, keeping it commented out or removing it.
    // Wait, let's keep it if I use it later. But looking at the code, fatConsumed is not used in the render?
    // Let's check the render.
    // Ah, it is not used in the original render for rings. Only protein and carbs and hydration.
    // I will keep it for consistency or remove unused vars.

	const currentList = shoppingLists?.[0];
	const pendingShoppingItems = currentList?.items.filter(i => !i.checked).slice(0, 4) || [];

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

	// Fetch recipe details for nextMeal separately since we only have recipeId
	const nextRecipe = useQuery(api.recipes.get, nextMeal ? { id: nextMeal.recipeId } : "skip" as any);

	return (
		<div className="flex min-h-screen bg-[#F8F9FA]">
			<Sidebar userName={userName} activePath="/" />

			<main className="flex-1 ml-64 p-8">
				{/* Header */}
				<div className="flex items-center justify-between mb-10">
					<div>
						<h1 className="text-3xl font-black text-[#1A1A1A] tracking-tight">
							Good morning, {userName.split(" ")[0]}! 👋
						</h1>
						<p className="text-[#4A5568] font-medium mt-1">
							Ready to crush your nutrition goals today?
						</p>
					</div>
					<div className="flex items-center gap-3">
						<Link to="/meal-planner">
							<Button className="bg-white border border-[#E2E8F0] text-[#1A1A1A] hover:bg-[#F8F9FA] rounded-2xl px-6 h-12 font-bold shadow-sm">
								View Planner
							</Button>
						</Link>
						<Button className="bg-[#13EC5B] hover:bg-[#10B981] text-[#1A1A1A] rounded-2xl px-6 h-12 font-black shadow-lg shadow-[#13EC5B]/20 transition-all">
							<Plus className="w-5 h-5 mr-2" />
							Log Meal
						</Button>
					</div>
				</div>

				<div className="grid grid-cols-12 gap-8">
					{/* Left Column: Hero & Timeline */}
					<div className="col-span-8 space-y-8">
						{/* Hero: Today's Plate */}
						<div className="bg-[#1A1A1A] rounded-[40px] p-10 text-white relative overflow-hidden shadow-2xl group">
							<div className="absolute top-0 right-0 w-96 h-96 bg-[#13EC5B] rounded-full blur-[120px] opacity-20 -mr-40 -mt-40 transition-all group-hover:opacity-30" />
							
							<div className="relative z-10 flex gap-10 items-center">
								<div className="flex-1">
									<span className="text-[10px] font-black text-[#13EC5B] uppercase tracking-[0.2em] bg-[#13EC5B]/10 px-3 py-1.5 rounded-full mb-6 inline-block border border-[#13EC5B]/20">
										Next up on your plate
									</span>
									{nextRecipe ? (
										<>
											<h2 className="text-4xl font-black mb-4 leading-tight">{nextRecipe.name}</h2>
											<div className="flex items-center gap-6 mb-8 text-[#A0AEC0]">
												<div className="flex items-center gap-2">
													<Clock className="w-5 h-5 text-[#13EC5B]" />
													<span className="font-bold text-sm">{(nextRecipe.prepTimeMinutes || 0) + (nextRecipe.cookTimeMinutes || 0)} mins</span>
												</div>
												<div className="flex items-center gap-2">
													<Flame className="w-5 h-5 text-orange-500" />
													<span className="font-bold text-sm">{nextRecipe.calories} kcal</span>
												</div>
											</div>
											<Button className="bg-[#13EC5B] text-[#1A1A1A] font-black rounded-2xl h-14 px-10 hover:bg-[#10B981] shadow-xl shadow-[#13EC5B]/20">
												View Recipe Details
											</Button>
										</>
									) : (
										<>
											<h2 className="text-4xl font-black mb-4 leading-tight">No meal planned yet</h2>
											<p className="text-[#A0AEC0] font-medium mb-8 max-w-sm">
												You haven't assigned a recipe for your next meal. Let's find something healthy!
											</p>
											<Link to="/meal-planner">
												<Button className="bg-[#13EC5B] text-[#1A1A1A] font-black rounded-2xl h-14 px-10 hover:bg-[#10B981] shadow-xl shadow-[#13EC5B]/20">
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
						</div>

						{/* Timeline of Today */}
						<div>
							<h3 className="text-xl font-black text-[#1A1A1A] mb-6 flex items-center gap-2">
								<Activity className="w-5 h-5 text-[#13EC5B]" />
								Today's Timeline
							</h3>
							<div className="grid grid-cols-4 gap-4">
								{["breakfast", "lunch", "dinner", "snack"].map((type) => {
									const plan = mealPlans?.find(p => p.mealType === type);
									return (
										<div key={type} className="bg-white rounded-3xl p-5 border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all group">
											<p className="text-[10px] font-black text-[#A0AEC0] uppercase tracking-widest mb-3">{type}</p>
											{plan ? (
												<div className="space-y-3">
													<div className="w-full h-24 rounded-2xl bg-[#F8F9FA] border border-[#E2E8F0] overflow-hidden">
														<ChefHat className="w-8 h-8 text-[#A0AEC0] m-auto mt-8 opacity-20" />
													</div>
													<p className="text-sm font-black text-[#1A1A1A] line-clamp-1">Meal Logged</p>
												</div>
											) : (
												<Link to="/meal-planner" className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-[#E2E8F0] rounded-2xl hover:border-[#13EC5B] hover:bg-[#13EC5B]/5 transition-all">
													<Plus className="w-5 h-5 text-[#A0AEC0] group-hover:text-[#13EC5B]" />
													<span className="text-[10px] font-black text-[#A0AEC0] mt-1 group-hover:text-[#13EC5B]">ADD</span>
												</Link>
											)}
										</div>
									);
								})}
							</div>
						</div>

						{/* Trending Recipes */}
						<div>
							<div className="flex items-center justify-between mb-6">
								<h3 className="text-xl font-black text-[#1A1A1A] flex items-center gap-2">
									<TrendingUp className="w-5 h-5 text-[#13EC5B]" />
									New in the Kitchen
								</h3>
								<Link to="/recipes" className="text-xs font-black text-[#13EC5B] hover:underline uppercase tracking-wider">
									Explore All
								</Link>
							</div>
							<div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
								{trendingRecipes?.slice(0, 6).map((recipe) => (
									<div key={recipe._id} className="min-w-[240px] bg-white rounded-3xl border border-[#E2E8F0] shadow-sm overflow-hidden group hover:shadow-lg transition-all cursor-pointer">
										<div className="h-40 overflow-hidden relative">
											{recipe.imageUrl ? (
												<img src={recipe.imageUrl} alt={recipe.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
											) : (
												<div className="w-full h-full bg-[#F8F9FA] flex items-center justify-center">
													<ChefHat className="w-10 h-10 text-[#A0AEC0]" />
												</div>
											)}
											<div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg">
												<div className="flex items-center gap-1">
													<Star className="w-3 h-3 fill-[#13EC5B] text-[#13EC5B]" />
													<span className="text-[10px] font-black text-[#1A1A1A]">4.9</span>
												</div>
											</div>
										</div>
										<div className="p-5">
											<h4 className="font-black text-sm text-[#1A1A1A] mb-2 line-clamp-1">{recipe.name}</h4>
											<div className="flex items-center justify-between">
												<span className="text-[10px] font-bold text-[#A0AEC0] uppercase tracking-wider">{recipe.calories} kcal</span>
												<div className="w-6 h-6 rounded-full bg-[#13EC5B]/10 flex items-center justify-center text-[#13EC5B]">
													<ArrowRight className="w-3 h-3" />
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Right Column: Nutrition Rings & Shopping */}
					<div className="col-span-4 space-y-8">
						{/* Nutrition Stats */}
						<div className="bg-white rounded-[40px] p-8 border border-[#E2E8F0] shadow-sm">
							<h3 className="text-xl font-black text-[#1A1A1A] mb-8">Live Nutrition</h3>
							
							<div className="flex flex-col items-center mb-10 relative">
								{/* Simplified Progress Circle */}
								<div className="w-48 h-48 rounded-full border-[16px] border-[#F8F9FA] flex flex-col items-center justify-center relative overflow-hidden">
									{/* Actual Progress Overlay (Visual Representation) */}
									<div 
										className="absolute inset-0 border-[16px] border-[#13EC5B] rounded-full transition-all duration-1000"
										style={{ 
											clipPath: `polygon(50% 50%, 50% 0%, ${caloriePercent > 50 ? '100%' : '50%'} 0%, ${caloriePercent > 25 ? '100%' : '50%'} ${caloriePercent > 25 ? '100%' : '0%'}, ${caloriePercent > 75 ? '0%' : '100%'} 100%, 0% ${caloriePercent > 75 ? '0%' : '100%'}, 0% 0%, 50% 0%)` 
										}}
									/>
									<p className="text-[10px] font-black text-[#A0AEC0] uppercase tracking-[0.2em] mb-1 relative z-10">Calories</p>
									<p className="text-4xl font-black text-[#1A1A1A] relative z-10">{caloriesConsumed}</p>
									<p className="text-xs font-bold text-[#A0AEC0] relative z-10">of {calorieTarget}</p>
								</div>
							</div>

							<div className="space-y-6">
								<div>
									<div className="flex justify-between items-end mb-2">
										<p className="text-xs font-black text-[#1A1A1A] uppercase tracking-wider">Protein</p>
										<p className="text-sm font-black text-[#13EC5B]">{proteinConsumed}g / {proteinTarget}g</p>
									</div>
									<div className="h-2 bg-[#F8F9FA] rounded-full overflow-hidden">
										<div className="h-full bg-blue-500 rounded-full transition-all duration-700" style={{ width: `${proteinPercent}%` }} />
									</div>
								</div>
								<div>
									<div className="flex justify-between items-end mb-2">
										<p className="text-xs font-black text-[#1A1A1A] uppercase tracking-wider">Carbs</p>
										<p className="text-sm font-black text-[#13EC5B]">{carbsConsumed}g / {carbsTarget}g</p>
									</div>
									<div className="h-2 bg-[#F8F9FA] rounded-full overflow-hidden">
										<div className="h-full bg-amber-500 rounded-full transition-all duration-700" style={{ width: `${Math.min(100, (carbsConsumed / carbsTarget) * 100)}%` }} />
									</div>
								</div>
								<div>
									<div className="flex justify-between items-end mb-2">
										<p className="text-xs font-black text-[#1A1A1A] uppercase tracking-wider">Hydration</p>
										<p className="text-sm font-black text-[#13EC5B]">1.2L / 2.5L</p>
									</div>
									<div className="h-2 bg-[#F8F9FA] rounded-full overflow-hidden">
										<div className="h-full bg-cyan-400 rounded-full transition-all duration-700" style={{ width: '48%' }} />
									</div>
								</div>
							</div>
						</div>

						{/* Shopping List Shortcut */}
						<div className="bg-[#13EC5B]/5 border border-[#13EC5B]/10 rounded-[40px] p-8">
							<div className="flex items-center justify-between mb-6">
								<h3 className="font-black text-[#1A1A1A] flex items-center gap-2">
									<ShoppingCart className="w-5 h-5 text-[#13EC5B]" />
									Grocery List
								</h3>
								<Link to="/shopping" className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-[#13EC5B] shadow-sm hover:scale-110 transition-transform">
									<ArrowRight className="w-4 h-4" />
								</Link>
							</div>

							<div className="space-y-3">
								{pendingShoppingItems.length > 0 ? (
									pendingShoppingItems.map((item, idx) => (
										<div key={idx} className="bg-white p-4 rounded-2xl flex items-center gap-3 shadow-sm">
											<div className="w-5 h-5 rounded-full border-2 border-[#13EC5B]/30" />
											<p className="text-sm font-bold text-[#4A5568]">{item.name}</p>
										</div>
									))
								) : (
									<div className="text-center py-6">
										<p className="text-xs font-bold text-[#A0AEC0]">Your list is empty.</p>
									</div>
								)}
							</div>
						</div>

						{/* AI Insight Card */}
						<div className="bg-[#1A1A1A] rounded-[40px] p-8 text-white relative overflow-hidden">
							<Sparkles className="absolute -bottom-4 -right-4 w-24 h-24 text-[#13EC5B] opacity-10 rotate-12" />
							<h4 className="font-black flex items-center gap-2 mb-4">
								<Sparkles className="w-4 h-4 text-[#13EC5B]" />
								Daily Tip
							</h4>
							<p className="text-xs text-[#A0AEC0] leading-relaxed font-medium">
								"Adding a source of vitamin C (like lemon) to your spinach helps your body absorb the iron more efficiently."
							</p>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
