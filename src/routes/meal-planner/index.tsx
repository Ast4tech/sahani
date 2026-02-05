import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import type { Doc, Id } from "convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import {
	ChefHat,
	Clock,
	Loader2,
	Plus,
	Search,
	ShoppingCart,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/meal-planner/")({
	component: MealPlannerPage,
});

const MEAL_TYPES = ["breakfast", "lunch", "dinner"] as const;
type MealType = (typeof MEAL_TYPES)[number];

function getWeekDates(startDate: Date) {
	const days = [];
	const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
	for (let i = 0; i < 7; i++) {
		const date = new Date(startDate);
		date.setDate(startDate.getDate() + i);
		days.push({
			day: dayNames[date.getDay()],
			date: date.getDate(),
			fullDate: date.toISOString().split("T")[0],
			id: `day-${i}`,
		});
	}
	return days;
}

function formatDateRange(startDate: Date) {
	const endDate = new Date(startDate);
	endDate.setDate(startDate.getDate() + 6);
	const options: Intl.DateTimeFormatOptions = { month: "long", day: "numeric" };
	const start = startDate.toLocaleDateString("en-US", options);
	const end = endDate.toLocaleDateString("en-US", {
		...options,
		year: "numeric",
	});
	return `${start} - ${end}`;
}

function MealCard({
	meal,
	recipe,
	onAdd,
	isLoading,
}: {
	meal: Doc<"mealPlans"> | null;
	recipe: Doc<"recipes"> | null;
	onAdd: () => void;
	isLoading?: boolean;
}) {
	if (isLoading) {
		return (
			<div className="bg-white rounded-2xl p-4 min-h-[140px] flex items-center justify-center border border-[#E2E8F0]">
				<Loader2 className="w-6 h-6 text-[#13EC5B] animate-spin" />
			</div>
		);
	}

	if (!meal || !recipe) {
		return (
			<button
				type="button"
				onClick={onAdd}
				className="bg-white rounded-2xl p-4 min-h-[140px] flex items-center justify-center border-2 border-dashed border-[#E2E8F0] hover:border-[#13EC5B] hover:bg-[#13EC5B]/5 transition-all cursor-pointer group w-full"
			>
				<Plus className="w-6 h-6 text-[#A0AEC0] group-hover:text-[#13EC5B]" />
			</button>
		);
	}

	return (
		<div className="bg-white rounded-2xl p-3 border border-[#E2E8F0] hover:shadow-md transition-all cursor-pointer group">
			<div className="w-full h-24 rounded-xl bg-[#F8F9FA] mb-3 flex items-center justify-center overflow-hidden border border-[#E2E8F0]">
				{recipe.imageUrl ? (
					<img
						src={recipe.imageUrl}
						alt={recipe.name}
						className="w-full h-full object-cover group-hover:scale-105 transition-transform"
					/>
				) : (
					<ChefHat className="w-8 h-8 text-[#A0AEC0]" />
				)}
			</div>
			<h4 className="font-bold text-sm text-[#1A1A1A] truncate">
				{recipe.name}
			</h4>
			<p className="text-xs text-[#4A5568] mt-1 font-medium">{recipe.calories} kcal</p>
		</div>
	);
}

function RecipeQuickAdd({
	recipe,
	onAdd,
}: {
	recipe: Doc<"recipes">;
	onAdd: (recipeId: Id<"recipes">) => void;
}) {
	const totalTime =
		(recipe.prepTimeMinutes ?? 0) + (recipe.cookTimeMinutes ?? 0);

	return (
		<button
			type="button"
			onClick={() => onAdd(recipe._id)}
			className="flex items-center gap-3 p-3 bg-[#F8F9FA] rounded-xl hover:bg-[#F1F5F9] border border-transparent hover:border-[#E2E8F0] transition-all cursor-pointer w-full text-left"
		>
			<div className="w-12 h-12 rounded-lg bg-white border border-[#E2E8F0] flex items-center justify-center flex-shrink-0 overflow-hidden">
				{recipe.imageUrl ? (
					<img
						src={recipe.imageUrl}
						alt={recipe.name}
						className="w-full h-full object-cover"
					/>
				) : (
					<ChefHat className="w-6 h-6 text-[#A0AEC0]" />
				)}
			</div>
			<div className="flex-1 min-w-0">
				<h4 className="font-bold text-sm text-[#1A1A1A] truncate">{recipe.name}</h4>
				<div className="flex items-center gap-2 mt-1">
					<span className="text-[10px] font-bold text-[#13EC5B] bg-[#13EC5B]/10 px-1.5 py-0.5 rounded">
						{recipe.calories} kcal
					</span>
					{totalTime > 0 && (
						<span className="text-[10px] text-[#4A5568] font-medium flex items-center gap-1">
							<Clock className="w-3 h-3" />
							{totalTime}m
						</span>
					)}
				</div>
			</div>
		</button>
	);
}

function LoadingState() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-[#F8F9FA]">
			<div className="text-center">
				<Loader2 className="w-8 h-8 text-[#13EC5B] animate-spin mx-auto mb-4" />
				<p className="text-[#4A5568] font-medium">Loading your sahani planner...</p>
			</div>
		</div>
	);
}

function EmptyRecipesState() {
	return (
		<div className="text-center py-8 px-4 bg-[#F8F9FA] rounded-2xl border border-dashed border-[#E2E8F0]">
			<ChefHat className="w-12 h-12 text-[#A0AEC0] mx-auto mb-3" />
			<p className="text-[#1A1A1A] text-sm font-bold">No recipes yet</p>
			<p className="text-[#4A5568] text-xs mt-1">
				Create your first recipe to start planning!
			</p>
		</div>
	);
}

function MealPlannerPage() {
	const { data: session, isPending: sessionPending } = authClient.useSession();
	const navigate = useNavigate();

	const [filterTab, setFilterTab] = useState("All");
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedSlot, setSelectedSlot] = useState<{
		date: string;
		mealType: MealType;
	} | null>(null);

	const weekStart = useMemo(() => {
		const today = new Date();
		const dayOfWeek = today.getDay();
		const monday = new Date(today);
		monday.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1));
		monday.setHours(0, 0, 0, 0);
		return monday;
	}, []);

	const days = useMemo(() => getWeekDates(weekStart), [weekStart]);
	const startDate = days[0].fullDate;
	const endDate = days[6].fullDate;
	const todayStr = new Date().toISOString().split("T")[0];

	const recipes = useQuery(
		api.recipes.list,
		filterTab === "Favorites" ? { favoritesOnly: true } : {},
	);
	const mealPlans = useQuery(api.mealPlans.listByDateRange, {
		startDate,
		endDate,
	});
	const nutritionTargets = useQuery(api.nutritionTargets.get);
	const dailyTotals = useQuery(api.nutritionTargets.calculateDailyTotals, {
		date: todayStr,
	});

	const addMealPlan = useMutation(api.mealPlans.create);
	const generateShoppingList = useMutation(api.shoppingLists.generateFromMealPlan);

	const handleGenerateShoppingList = async () => {
		try {
			const listId = await generateShoppingList({
				startDate,
				endDate,
				name: `Shopping List: ${formatDateRange(weekStart).split(" - ")[0]}`,
			});
			navigate({ to: "/shopping" });
		} catch (error) {
			console.error("Failed to generate shopping list:", error);
			alert("Failed to generate shopping list. Please try again.");
		}
	};

	const filteredRecipes = useMemo(() => {
		if (!recipes) return [];
		if (!searchQuery) return recipes;
		return recipes.filter((r) =>
			r.name.toLowerCase().includes(searchQuery.toLowerCase()),
		);
	}, [recipes, searchQuery]);

	const mealPlanMap = useMemo(() => {
		const map = new Map<string, Doc<"mealPlans">>();
		if (mealPlans) {
			for (const plan of mealPlans) {
				map.set(`${plan.date}-${plan.mealType}`, plan);
			}
		}
		return map;
	}, [mealPlans]);

	const recipeMap = useMemo(() => {
		const map = new Map<string, Doc<"recipes">>();
		if (recipes) {
			for (const recipe of recipes) {
				map.set(recipe._id, recipe);
			}
		}
		return map;
	}, [recipes]);

	const handleAddRecipe = async (recipeId: Id<"recipes">) => {
		if (!selectedSlot) return;
		await addMealPlan({
			date: selectedSlot.date,
			mealType: selectedSlot.mealType,
			recipeId,
		});
		setSelectedSlot(null);
	};

	const handleSlotClick = (date: string, mealType: MealType) => {
		setSelectedSlot({ date, mealType });
	};

	if (sessionPending) {
		return <LoadingState />;
	}

	if (!session?.user) {
		navigate({ to: "/login" });
		return <LoadingState />;
	}

	const isLoading = recipes === undefined || mealPlans === undefined;
	const calorieTarget = nutritionTargets?.dailyCalories ?? 2000;
	const caloriesConsumed = Math.round(dailyTotals?.calories ?? 0);
	const caloriePercent = Math.min(
		100,
		Math.round((caloriesConsumed / calorieTarget) * 100),
	);

	const proteinTarget = nutritionTargets?.proteinGrams ?? 150;
	const proteinConsumed = Math.round(dailyTotals?.protein ?? 0);
	const proteinPercent = Math.min(
		100,
		Math.round((proteinConsumed / proteinTarget) * 100),
	);

	const carbsTarget = nutritionTargets?.carbsGrams ?? 250;
	const carbsConsumed = Math.round(dailyTotals?.carbs ?? 0);
	const carbsPercent = Math.min(
		100,
		Math.round((carbsConsumed / carbsTarget) * 100),
	);

	const fatTarget = nutritionTargets?.fatGrams ?? 65;
	const fatConsumed = Math.round(dailyTotals?.fat ?? 0);
	const fatPercent = Math.min(100, Math.round((fatConsumed / fatTarget) * 100));

	return (
		<div className="flex min-h-screen bg-[#F8F9FA]">
			<Sidebar userName={session.user.name} activePath="/meal-planner" />

			<main className="flex-1 ml-64 mr-80 p-8">
				<div className="flex items-start justify-between mb-8">
					<div>
						<h1 className="text-3xl font-black text-[#1A1A1A] tracking-tight">Weekly Planner</h1>
						<p className="text-sm text-[#4A5568] mt-1 font-medium">
							{formatDateRange(weekStart)}
						</p>
					</div>
					<div className="flex items-center gap-4">
						<div className="flex bg-white rounded-xl p-1 border border-[#E2E8F0] shadow-sm">
							<Button
								variant="ghost"
								size="sm"
								className="rounded-lg bg-[#F8F9FA] text-[#1A1A1A] font-bold"
							>
								Weekly
							</Button>
							<Button
								variant="ghost"
								size="sm"
								className="rounded-lg text-[#4A5568] font-bold hover:text-[#1A1A1A]"
							>
								Daily
							</Button>
						</div>
						<Button 
							onClick={handleGenerateShoppingList}
							className="bg-[#13EC5B] hover:bg-[#10B981] text-[#1A1A1A] rounded-xl px-6 font-bold shadow-lg shadow-[#13EC5B]/10 transition-all"
						>
							<ShoppingCart className="w-4 h-4 mr-2" />
							Generate Shopping List
						</Button>
					</div>
				</div>

				<div className="grid grid-cols-7 gap-4 mb-8">
					{days.map((day) => (
						<div
							key={day.id}
							className={`text-center py-4 rounded-2xl border transition-all ${
								day.fullDate === todayStr
									? "bg-[#13EC5B] text-[#1A1A1A] border-[#13EC5B] shadow-lg shadow-[#13EC5B]/20 scale-105 z-10"
									: "bg-white text-[#4A5568] border-[#E2E8F0] hover:border-[#13EC5B]/50"
							}`}
						>
							<p className={`text-[10px] font-bold uppercase tracking-widest ${
								day.fullDate === todayStr ? "text-[#1A1A1A]" : "text-[#A0AEC0]"
							}`}>
								{day.day}
							</p>
							<p className="text-2xl font-black mt-1">{day.date}</p>
						</div>
					))}
				</div>

				<div className="space-y-6">
					{MEAL_TYPES.map((mealType) => {
						const colors = {
							breakfast: { bg: "bg-orange-50", text: "text-orange-500", iconBg: "bg-orange-100" },
							lunch: { bg: "bg-blue-50", text: "text-blue-500", iconBg: "bg-blue-100" },
							dinner: { bg: "bg-indigo-50", text: "text-indigo-500", iconBg: "bg-indigo-100" },
						};
						const color = colors[mealType];

						return (
							<div key={mealType} className="flex gap-4">
								<div className="w-24 flex-shrink-0 pt-4 text-center">
									<div
										className={`w-12 h-12 ${color.iconBg} rounded-2xl flex items-center justify-center mb-2 mx-auto border border-white shadow-sm`}
									>
										<ChefHat className={`w-6 h-6 ${color.text}`} />
									</div>
									<p className="text-[10px] font-black text-[#A0AEC0] uppercase tracking-wider">
										{mealType}
									</p>
								</div>
								<div className="flex-1 grid grid-cols-7 gap-4">
									{days.map((day) => {
										const plan = mealPlanMap.get(`${day.fullDate}-${mealType}`);
										const recipe = plan
											? (recipeMap.get(plan.recipeId as string) ?? null)
											: null;
										return (
											<MealCard
												key={`${mealType}-${day.id}`}
												meal={plan ?? null}
												recipe={recipe}
												onAdd={() => handleSlotClick(day.fullDate, mealType)}
												isLoading={isLoading}
											/>
										);
									})}
								</div>
							</div>
						);
					})}
				</div>
			</main>

			<aside className="w-80 bg-white border-l border-[#E2E8F0] fixed right-0 h-full overflow-y-auto z-20 shadow-[-4px_0_12px_rgba(0,0,0,0.02)]">
				<div className="p-6">
					<h2 className="text-xl font-black text-[#1A1A1A] mb-6 tracking-tight">
						{selectedSlot ? `Add to ${selectedSlot.mealType}` : "Quick Add"}
					</h2>

					{selectedSlot && (
						<button
							type="button"
							onClick={() => setSelectedSlot(null)}
							className="text-xs font-bold text-[#13EC5B] hover:text-[#10B981] mb-6 flex items-center gap-1 transition-colors"
						>
							← Back to all recipes
						</button>
					)}

					<div className="relative mb-6">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0AEC0]" />
						<Input
							placeholder="Search recipes..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="pl-10 bg-[#F8F9FA] border-[#E2E8F0] rounded-xl h-11 focus-visible:ring-[#13EC5B]/50"
						/>
					</div>

					<div className="flex gap-2 mb-6">
						{["All", "Favorites", "Recent"].map((tab) => (
							<button
								type="button"
								key={tab}
								onClick={() => setFilterTab(tab)}
								className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
									filterTab === tab
										? "bg-[#13EC5B] text-[#1A1A1A] shadow-md shadow-[#13EC5B]/10"
										: "bg-[#F8F9FA] text-[#4A5568] hover:bg-[#E2E8F0]"
								}`}
							>
								{tab}
							</button>
						))}
					</div>

					<div className="space-y-3 mb-8">
						{recipes === undefined ? (
							<div className="flex justify-center py-8">
								<Loader2 className="w-6 h-6 text-[#13EC5B] animate-spin" />
							</div>
						) : filteredRecipes.length === 0 ? (
							<EmptyRecipesState />
						) : (
							filteredRecipes.map((recipe) => (
								<RecipeQuickAdd
									key={recipe._id}
									recipe={recipe}
									onAdd={selectedSlot ? handleAddRecipe : () => {}}
								/>
							))
						)}
					</div>

					<div className="pt-6 border-t border-[#E2E8F0]">
						<h3 className="text-lg font-black text-[#1A1A1A] mb-6 tracking-tight">
							Daily Nutrition Target
						</h3>

						<div className="bg-[#F8F9FA] rounded-2xl p-5 mb-6 border border-[#E2E8F0]">
							<div className="flex items-center justify-between mb-3">
								<div>
									<p className="text-[10px] font-black text-[#A0AEC0] uppercase tracking-wider">Calories</p>
									<p className="text-2xl font-black text-[#1A1A1A]">
										{caloriesConsumed.toLocaleString()}{" "}
										<span className="text-xs font-bold text-[#A0AEC0]">
											/ {calorieTarget.toLocaleString()}
										</span>
									</p>
								</div>
								<span className="text-sm font-black text-[#13EC5B] bg-[#13EC5B]/10 px-2 py-1 rounded-lg">
									{caloriePercent}%
								</span>
							</div>
							<div className="h-2.5 bg-[#E2E8F0] rounded-full overflow-hidden">
								<div
									className="h-full bg-[#13EC5B] rounded-full transition-all duration-500"
									style={{ width: `${caloriePercent}%` }}
								/>
							</div>
						</div>

						<div className="grid grid-cols-3 gap-3">
							<div className="text-center bg-[#F8F9FA] p-3 rounded-xl border border-[#E2E8F0]">
								<p className="text-[9px] font-black text-[#A0AEC0] uppercase tracking-wider mb-2">Protein</p>
								<div className="h-1.5 bg-blue-100 rounded-full overflow-hidden mb-2">
									<div
										className="h-full bg-blue-500 rounded-full"
										style={{ width: `${proteinPercent}%` }}
									/>
								</div>
								<p className="text-sm font-black text-[#1A1A1A]">
									{proteinConsumed}g
								</p>
							</div>
							<div className="text-center bg-[#F8F9FA] p-3 rounded-xl border border-[#E2E8F0]">
								<p className="text-[9px] font-black text-[#A0AEC0] uppercase tracking-wider mb-2">Carbs</p>
								<div className="h-1.5 bg-amber-100 rounded-full overflow-hidden mb-2">
									<div
										className="h-full bg-amber-500 rounded-full"
										style={{ width: `${carbsPercent}%` }}
									/>
								</div>
								<p className="text-sm font-black text-[#1A1A1A]">
									{carbsConsumed}g
								</p>
							</div>
							<div className="text-center bg-[#F8F9FA] p-3 rounded-xl border border-[#E2E8F0]">
								<p className="text-[9px] font-black text-[#A0AEC0] uppercase tracking-wider mb-2">Fat</p>
								<div className="h-1.5 bg-red-100 rounded-full overflow-hidden mb-2">
									<div
										className="h-full bg-red-500 rounded-full"
										style={{ width: `${fatPercent}%` }}
									/>
								</div>
								<p className="text-sm font-black text-[#1A1A1A]">
									{fatConsumed}g
								</p>
							</div>
						</div>
					</div>
				</div>
			</aside>
		</div>
	);
}
