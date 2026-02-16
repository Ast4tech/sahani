import { Loader2, Search } from "lucide-react";
import type { Doc, Id } from "convex/_generated/dataModel";
import { Input } from "@/components/ui/input";
import { RecipeQuickAdd } from "@/components/meal-planner/RecipeQuickAdd";
import { EmptyRecipesState } from "@/components/meal-planner/EmptyRecipesState";
import type { MealType } from "@/components/meal-planner/utils";

interface PlannerSidebarProps {
	selectedSlot: { date: string; mealType: MealType } | null;
	onClearSlot: () => void;
	searchQuery: string;
	onSearchChange: (q: string) => void;
	filterTab: string;
	onFilterTabChange: (tab: string) => void;
	recipes: Doc<"recipes">[] | undefined;
	filteredRecipes: Doc<"recipes">[];
	onAddRecipe: (recipeId: Id<"recipes">) => void;
	consumed: { calories: number; protein: number; carbs: number; fat: number };
	targets: { calories: number; protein: number; carbs: number; fat: number };
}

export function PlannerSidebar({
	selectedSlot,
	onClearSlot,
	searchQuery,
	onSearchChange,
	filterTab,
	onFilterTabChange,
	recipes,
	filteredRecipes,
	onAddRecipe,
	consumed,
	targets,
}: PlannerSidebarProps) {
	const caloriePercent = Math.min(
		100,
		Math.round((consumed.calories / targets.calories) * 100),
	);
	const proteinPercent = Math.min(
		100,
		Math.round((consumed.protein / targets.protein) * 100),
	);
	const carbsPercent = Math.min(
		100,
		Math.round((consumed.carbs / targets.carbs) * 100),
	);
	const fatPercent = Math.min(
		100,
		Math.round((consumed.fat / targets.fat) * 100),
	);

	return (
		<aside className="w-80 bg-white border-l border-[#E2E8F0] fixed right-0 h-full overflow-y-auto z-20 shadow-[-4px_0_12px_rgba(0,0,0,0.02)]">
			<div className="p-6">
				<h2 className="text-xl font-black text-[#1A1A1A] mb-6 tracking-tight">
					{selectedSlot ? `Add to ${selectedSlot.mealType}` : "Quick Add"}
				</h2>

				{selectedSlot && (
					<button
						type="button"
						onClick={onClearSlot}
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
						onChange={(e) => onSearchChange(e.target.value)}
						className="pl-10 bg-[#F8F9FA] border-[#E2E8F0] rounded-xl h-11 focus-visible:ring-[#13EC5B]/50"
					/>
				</div>

				<div className="flex gap-2 mb-6">
					{["All", "Favorites", "Recent"].map((tab) => (
						<button
							type="button"
							key={tab}
							onClick={() => onFilterTabChange(tab)}
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
								onAdd={selectedSlot ? onAddRecipe : () => {}}
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
								<p className="text-[10px] font-black text-[#A0AEC0] uppercase tracking-wider">
									Calories
								</p>
								<p className="text-2xl font-black text-[#1A1A1A]">
									{consumed.calories.toLocaleString()}{" "}
									<span className="text-xs font-bold text-[#A0AEC0]">
										/ {targets.calories.toLocaleString()}
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
							<p className="text-[9px] font-black text-[#A0AEC0] uppercase tracking-wider mb-2">
								Protein
							</p>
							<div className="h-1.5 bg-blue-100 rounded-full overflow-hidden mb-2">
								<div
									className="h-full bg-blue-500 rounded-full"
									style={{ width: `${proteinPercent}%` }}
								/>
							</div>
							<p className="text-sm font-black text-[#1A1A1A]">
								{consumed.protein}g
							</p>
						</div>
						<div className="text-center bg-[#F8F9FA] p-3 rounded-xl border border-[#E2E8F0]">
							<p className="text-[9px] font-black text-[#A0AEC0] uppercase tracking-wider mb-2">
								Carbs
							</p>
							<div className="h-1.5 bg-amber-100 rounded-full overflow-hidden mb-2">
								<div
									className="h-full bg-amber-500 rounded-full"
									style={{ width: `${carbsPercent}%` }}
								/>
							</div>
							<p className="text-sm font-black text-[#1A1A1A]">
								{consumed.carbs}g
							</p>
						</div>
						<div className="text-center bg-[#F8F9FA] p-3 rounded-xl border border-[#E2E8F0]">
							<p className="text-[9px] font-black text-[#A0AEC0] uppercase tracking-wider mb-2">
								Fat
							</p>
							<div className="h-1.5 bg-red-100 rounded-full overflow-hidden mb-2">
								<div
									className="h-full bg-red-500 rounded-full"
									style={{ width: `${fatPercent}%` }}
								/>
							</div>
							<p className="text-sm font-black text-[#1A1A1A]">
								{consumed.fat}g
							</p>
						</div>
					</div>
				</div>
			</div>
		</aside>
	);
}
