import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";
import {
	Activity,
	ArrowRight,
	ChefHat,
	ChevronLeft,
	ChevronRight,
	Clock,
	Droplets,
	Flame,
	LayoutDashboard,
	PlayCircle,
	Plus,
	Search,
	ShoppingCart,
	Sparkles,
	Star,
	TrendingUp,
} from "lucide-react";
import { useId, useMemo, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/")({
	component: RootPage,
});

function RootPage() {
	const { data: session, isPending: sessionPending } = authClient.useSession();

	if (sessionPending) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-white">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#13EC5B]" />
			</div>
		);
	}

	if (session?.user) {
		return <Dashboard userName={session.user.name} email={session.user.email} />;
	}

	return <MealMasterLandingPage />;
}

// --- Dashboard Components ---

function Dashboard({ userName, email }: { userName: string; email: string }) {
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
	const fatConsumed = Math.round(dailyTotals?.fat ?? 0);

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

// --- Landing Page Component (Current index.tsx content) ---

function MealMasterLandingPage() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const howItWorksId = useId();
	const recipesId = useId();
	const pricingId = useId();

	return (
		<div className="min-h-screen bg-white">
			<link
				href="https://fonts.googleapis.com/icon?family=Material+Icons"
				rel="stylesheet"
			/>

			<nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#E2E8F0]">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16">
						<Link to="/" className="flex items-center gap-2">
							<div className="w-8 h-8 bg-[#13EC5B] rounded-lg flex items-center justify-center">
								<span className="material-icons text-white text-lg">
									restaurant_menu
								</span>
							</div>
							<span className="font-bold text-lg text-[#1A1A1A]">
								sahani
							</span>
						</Link>

						<div className="hidden md:flex items-center gap-8">
							{[
								{ label: "Features", href: "#features" },
								{ label: "How it Works", href: "#how-it-works" },
								{ label: "Recipes", href: "#recipes" },
								{ label: "Pricing", href: "#pricing" },
							].map((link) => (
								<a
									key={link.label}
									href={link.href}
									className="text-sm font-medium text-[#4A5568] hover:text-[#13EC5B] transition-colors"
								>
									{link.label}
								</a>
							))}
						</div>

						<div className="hidden md:flex items-center gap-4">
							<Link
								to="/login"
								className="text-sm font-medium text-[#4A5568] hover:text-[#13EC5B] transition-colors"
							>
								Login
							</Link>
							<Link to="/signup">
								<Button className="bg-[#13EC5B] hover:bg-[#10B981] text-white font-semibold rounded-lg px-5 py-2 text-sm">
									Sign Up
								</Button>
							</Link>
						</div>

						<button
							type="button"
							className="md:hidden p-2 rounded-lg hover:bg-[#F8F9FA]"
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						>
							<span className="material-icons text-[#4A5568]">
								{mobileMenuOpen ? "close" : "menu"}
							</span>
						</button>
					</div>
				</div>

				{mobileMenuOpen && (
					<div className="md:hidden bg-white border-t border-[#E2E8F0]">
						<div className="px-4 py-4 space-y-3">
							{[
								{ label: "Features", href: "#features" },
								{ label: "How it Works", href: "#how-it-works" },
								{ label: "Recipes", href: "#recipes" },
								{ label: "Pricing", href: "#pricing" },
							].map((link) => (
								<a
									key={link.label}
									href={link.href}
									className="block text-sm font-medium text-[#4A5568] hover:text-[#13EC5B] py-2"
									onClick={() => setMobileMenuOpen(false)}
								>
									{link.label}
								</a>
							))}
							<div className="pt-3 border-t border-[#E2E8F0] space-y-3">
								<Link
									to="/login"
									className="block text-sm font-medium text-[#4A5568] hover:text-[#13EC5B] py-2"
								>
									Login
								</Link>
								<Link to="/signup" className="block">
									<Button className="w-full bg-[#13EC5B] hover:bg-[#10B981] text-white font-semibold rounded-lg">
										Sign Up
									</Button>
								</Link>
							</div>
						</div>
					</div>
				)}
			</nav>

			<section className="pt-24 pb-16 lg:pt-28 lg:pb-20 px-4 sm:px-6 lg:px-8 bg-white">
				<div className="max-w-7xl mx-auto">
					<div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
						<div>
							<p className="text-xs font-medium text-[#13EC5B] uppercase tracking-wider mb-4">
								Welcome to the future of eating
							</p>
							<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A1A1A] leading-tight mb-6">
								Eat Better,
								<br />
								<span className="text-[#13EC5B]">Stress Less.</span>
							</h1>
							<p className="text-base text-[#4A5568] mb-8 max-w-md">
								Custom meal plans tailored to your lifestyle. Save 5+ hours on
								grocery shopping and cooking every single week.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 mb-8">
								<Link to="/signup">
									<Button className="bg-[#13EC5B] hover:bg-[#10B981] text-white font-semibold rounded-lg px-6 py-3 text-sm">
										Start Planning Free
									</Button>
								</Link>
								<Button
									variant="outline"
									className="border-[#E2E8F0] text-[#1A1A1A] hover:bg-[#F8F9FA] rounded-lg px-6 py-3 text-sm"
								>
									<PlayCircle className="w-4 h-4 mr-2" />
									See how it works
								</Button>
							</div>
							<div className="flex items-center gap-3">
								<div className="flex -space-x-2">
									{[1, 2, 3].map((i) => (
										<div
											key={i}
											className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 border-2 border-white flex items-center justify-center"
										/>
									))}
								</div>
								<p className="text-sm text-[#A0AEC0]">
									Joined by{" "}
									<span className="text-[#1A1A1A] font-medium">10,000+</span>{" "}
									healthy eaters
								</p>
							</div>
						</div>

						<div className="relative">
							<div className="relative rounded-2xl overflow-hidden shadow-lg">
								<img
									src="https://images.unsplash.com/photo-1547592180-85f173990554?w=600&h=500&fit=crop"
									alt="Healthy meal prep bowls with various fresh ingredients"
									className="w-full h-auto object-cover"
								/>
							</div>
							<div className="absolute -bottom-4 left-4 bg-white rounded-lg shadow-lg px-4 py-3 flex items-center gap-3">
								<div className="w-10 h-10 bg-[#F8F9FA] rounded-full flex items-center justify-center">
									<span className="material-icons text-[#13EC5B] text-lg">
										timer
									</span>
								</div>
								<div>
									<p className="text-xs text-[#A0AEC0]">AVG COOK TIME</p>
									<p className="text-sm font-semibold text-[#1A1A1A]">
										15-20 Mins
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section
				id={howItWorksId}
				className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white"
			>
				<div className="max-w-7xl mx-auto">
					<div className="text-center max-w-2xl mx-auto mb-12">
						<h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-4">
							The smarter way to eat
						</h2>
						<p className="text-base text-[#4A5568]">
							We handle the planning, so you can enjoy the cooking. Three simple
							steps to a healthier you.
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-6">
						{[
							{
								icon: "calendar_month",
								number: "1",
								title: "Plan",
								description:
									"Choose your diet and personal health goals with our AI-powered smart meal planner.",
							},
							{
								icon: "shopping_cart",
								number: "2",
								title: "Shop",
								description:
									"Get an automated, sorted grocery list sent to your phone or delivered to your door.",
							},
							{
								icon: "restaurant",
								number: "3",
								title: "Cook",
								description:
									"Follow simple, chef-tested recipes with step-by-step instructions and video guides.",
							},
						].map((step) => (
							<div
								key={step.number}
								className="bg-[#F8F9FA] rounded-xl p-6 text-left"
							>
								<div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 shadow-sm">
									<span className="material-icons text-[#13EC5B] text-xl">
										{step.icon}
									</span>
								</div>
								<h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
									{step.number}. {step.title}
								</h3>
								<p className="text-sm text-[#4A5568] leading-relaxed">
									{step.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<footer className="bg-white border-t border-[#E2E8F0] py-12">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid md:grid-cols-4 gap-8 mb-8">
						<div className="col-span-2">
							<div className="flex items-center gap-2 mb-4">
								<div className="w-8 h-8 bg-[#13EC5B] rounded-lg flex items-center justify-center">
									<span className="material-icons text-white text-lg">
										restaurant_menu
									</span>
								</div>
								<span className="font-bold text-lg text-[#1A1A1A]">
									sahani
								</span>
							</div>
							<p className="text-sm text-[#4A5568] max-w-xs leading-relaxed">
								Making healthy eating accessible, sustainable, and enjoyable for
								everyone. Join our community and change your life today.
							</p>
						</div>
						<div>
							<h4 className="font-semibold text-[#1A1A1A] mb-4 text-sm">
								Product
							</h4>
							<ul className="space-y-2 text-sm">
								<li>
									<Link
										to="/meal-planner"
										className="text-[#4A5568] hover:text-[#13EC5B] transition-colors"
									>
										Meal Planner
									</Link>
								</li>
								<li>
									<span className="text-[#4A5568] hover:text-[#13EC5B] transition-colors cursor-pointer">
										Grocery List
									</span>
								</li>
								<li>
									<span className="text-[#4A5568] hover:text-[#13EC5B] transition-colors cursor-pointer">
										Recipe Index
									</span>
								</li>
								<li>
									<a
										href="#pricing"
										className="text-[#4A5568] hover:text-[#13EC5B] transition-colors"
									>
										Pro Pricing
									</a>
								</li>
							</ul>
						</div>
						<div>
							<h4 className="font-semibold text-[#1A1A1A] mb-4 text-sm">
								Company
							</h4>
							<ul className="space-y-2 text-sm">
								<li>
									<span className="text-[#4A5568] hover:text-[#13EC5B] transition-colors cursor-pointer">
										About Us
									</span>
								</li>
								<li>
									<span className="text-[#4A5568] hover:text-[#13EC5B] transition-colors cursor-pointer">
										Careers
									</span>
								</li>
								<li>
									<span className="text-[#4A5568] hover:text-[#13EC5B] transition-colors cursor-pointer">
										Privacy Policy
									</span>
								</li>
								<li>
									<span className="text-[#4A5568] hover:text-[#13EC5B] transition-colors cursor-pointer">
										Terms of Service
									</span>
								</li>
							</ul>
						</div>
					</div>

					<div className="border-t border-[#E2E8F0] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
						<p className="text-xs text-[#A0AEC0]">
							© 2024 sahani Inc. All rights reserved.
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
