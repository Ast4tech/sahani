import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import type { Doc, Id } from "convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { ShoppingCart } from "lucide-react";
import { useMemo, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { LoadingState } from "@/components/meal-planner/LoadingState";
import {
	formatDateRange,
	getWeekDates,
	type MealType,
} from "@/components/meal-planner/utils";
import { WeeklyView } from "@/components/meal-planner/WeeklyView";
import { DailyView } from "@/components/meal-planner/DailyView";
import { PlannerSidebar } from "@/components/meal-planner/PlannerSidebar";

export const Route = createFileRoute("/meal-planner/")({
	component: MealPlannerPage,
});

function MealPlannerPage() {
	const { data: session, isPending: sessionPending } = authClient.useSession();
	const navigate = useNavigate();

	const [filterTab, setFilterTab] = useState("All");
	const [searchQuery, setSearchQuery] = useState("");
	const [viewMode, setViewMode] = useState<"weekly" | "daily">("weekly");
	const [selectedDate, setSelectedDate] = useState(
		new Date().toISOString().split("T")[0],
	);
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
		date: viewMode === "daily" ? selectedDate : todayStr,
	});

	const addMealPlan = useMutation(api.mealPlans.create);
	const generateShoppingList = useMutation(
		api.shoppingLists.generateFromMealPlan,
	);

	const handleGenerateShoppingList = async () => {
		try {
			await generateShoppingList({
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

	const consumed = {
		calories: Math.round(dailyTotals?.calories ?? 0),
		protein: Math.round(dailyTotals?.protein ?? 0),
		carbs: Math.round(dailyTotals?.carbs ?? 0),
		fat: Math.round(dailyTotals?.fat ?? 0),
	};

	const targets = {
		calories: nutritionTargets?.dailyCalories ?? 2000,
		protein: nutritionTargets?.proteinGrams ?? 150,
		carbs: nutritionTargets?.carbsGrams ?? 250,
		fat: nutritionTargets?.fatGrams ?? 65,
	};

	return (
		<div className="flex min-h-screen bg-[#F8F9FA]">
			<Sidebar userName={session.user.name} activePath="/meal-planner" />

			<main className="flex-1 ml-64 mr-80 p-8">
				<div className="flex items-start justify-between mb-8">
					<div>
						<h1 className="text-3xl font-black text-[#1A1A1A] tracking-tight">
							Weekly Planner
						</h1>
						<p className="text-sm text-[#4A5568] mt-1 font-medium">
							{formatDateRange(weekStart)}
						</p>
					</div>
					<div className="flex items-center gap-4">
						<div className="flex bg-white rounded-xl p-1 border border-[#E2E8F0] shadow-sm">
							<Button
								variant="ghost"
								size="sm"
								onClick={() => setViewMode("weekly")}
								className={`rounded-lg font-bold transition-all ${
									viewMode === "weekly"
										? "bg-[#F8F9FA] text-[#1A1A1A]"
										: "text-[#4A5568] hover:text-[#1A1A1A]"
								}`}
							>
								Weekly
							</Button>
							<Button
								variant="ghost"
								size="sm"
								onClick={() => setViewMode("daily")}
								className={`rounded-lg font-bold transition-all ${
									viewMode === "daily"
										? "bg-[#F8F9FA] text-[#1A1A1A]"
										: "text-[#4A5568] hover:text-[#1A1A1A]"
								}`}
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

				<div className="flex gap-4 mb-8">
					<div className="w-24 flex-shrink-0" />{" "}
					{/* Spacer to align with meal labels */}
					<div className="flex-1 grid grid-cols-7 gap-4">
						{days.map((day) => {
							const isSelected =
								viewMode === "daily"
									? selectedDate === day.fullDate
									: day.fullDate === todayStr;
							return (
								<button
									key={day.id}
									type="button"
									onClick={() => {
										if (viewMode === "daily") setSelectedDate(day.fullDate);
									}}
									className={`text-center py-4 rounded-2xl border transition-all cursor-pointer ${
										isSelected
											? "bg-[#13EC5B] text-[#1A1A1A] border-[#13EC5B] shadow-lg shadow-[#13EC5B]/20 scale-105 z-10"
											: "bg-white text-[#4A5568] border-[#E2E8F0] hover:border-[#13EC5B]/50"
									}`}
								>
									<p
										className={`text-[10px] font-bold uppercase tracking-widest ${
											isSelected ? "text-[#1A1A1A]" : "text-[#A0AEC0]"
										}`}
									>
										{day.day}
									</p>
									<p className="text-2xl font-black mt-1">{day.date}</p>
								</button>
							);
						})}
					</div>
				</div>

				{viewMode === "weekly" ? (
					<WeeklyView
						days={days}
						mealPlanMap={mealPlanMap}
						recipeMap={recipeMap}
						selectedSlot={selectedSlot}
						onSlotClick={handleSlotClick}
						isLoading={isLoading}
					/>
				) : (
					<DailyView
						selectedDate={selectedDate}
						mealPlanMap={mealPlanMap}
						recipeMap={recipeMap}
						selectedSlot={selectedSlot}
						onSlotClick={handleSlotClick}
						consumed={consumed}
						targets={targets}
					/>
				)}
			</main>

			<PlannerSidebar
				selectedSlot={selectedSlot}
				onClearSlot={() => setSelectedSlot(null)}
				searchQuery={searchQuery}
				onSearchChange={setSearchQuery}
				filterTab={filterTab}
				onFilterTabChange={setFilterTab}
				recipes={recipes}
				filteredRecipes={filteredRecipes}
				onAddRecipe={handleAddRecipe}
				consumed={consumed}
				targets={targets}
			/>
		</div>
	);
}
