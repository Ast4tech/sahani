import { ChefHat, Plus, Sparkles } from "lucide-react";
import type { Doc } from "convex/_generated/dataModel";
import { MEAL_TYPES, type MealType } from "@/components/meal-planner/utils";
import { Button } from "@/components/ui/button";

interface DailyViewProps {
	selectedDate: string;
	mealPlanMap: Map<string, Doc<"mealPlans">>;
	recipeMap: Map<string, Doc<"recipes">>;
	selectedSlot: { date: string; mealType: MealType } | null;
	onSlotClick: (date: string, mealType: MealType) => void;
	consumed: { calories: number; protein: number; carbs: number; fat: number };
	targets: { calories: number; protein: number; carbs: number; fat: number };
}

export function DailyView({
	selectedDate,
	mealPlanMap,
	recipeMap,
	selectedSlot,
	onSlotClick,
	consumed,
	targets,
}: DailyViewProps) {
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
		<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
			<div className="space-y-6">
				{MEAL_TYPES.map((mealType) => {
					const colors = {
						breakfast: {
							bg: "bg-orange-50",
							text: "text-orange-500",
							iconBg: "bg-orange-100",
							label: "Breakfast",
						},
						lunch: {
							bg: "bg-blue-50",
							text: "text-blue-500",
							iconBg: "bg-blue-100",
							label: "Lunch",
						},
						dinner: {
							bg: "bg-indigo-50",
							text: "text-indigo-500",
							iconBg: "bg-indigo-100",
							label: "Dinner",
						},
						snack: {
							bg: "bg-purple-50",
							text: "text-purple-500",
							iconBg: "bg-purple-100",
							label: "Snack",
						},
					};
					const color = colors[mealType];
					const plan = mealPlanMap.get(`${selectedDate}-${mealType}`);
					const recipe = plan
						? (recipeMap.get(plan.recipeId as string) ?? null)
						: null;
					const isSelected =
						selectedSlot?.date === selectedDate &&
						selectedSlot?.mealType === mealType;

					return (
						<div
							key={mealType}
							className="bg-white rounded-3xl border border-[#E2E8F0] overflow-hidden shadow-sm hover:shadow-md transition-all group"
						>
							<div className="p-6 flex items-center justify-between border-b border-[#F8F9FA]">
								<div className="flex items-center gap-4">
									<div
										className={`w-10 h-10 ${color.iconBg} rounded-xl flex items-center justify-center border border-white shadow-sm`}
									>
										<ChefHat className={`w-5 h-5 ${color.text}`} />
									</div>
									<div>
										<h3 className="font-black text-[#1A1A1A] tracking-tight">
											{color.label}
										</h3>
										<p className="text-[10px] font-bold text-[#A0AEC0] uppercase tracking-widest">
											Planned Meal
										</p>
									</div>
								</div>
								<Button
									variant="ghost"
									size="sm"
									onClick={() => onSlotClick(selectedDate, mealType)}
									className={`rounded-xl font-bold ${
										isSelected
											? "bg-[#13EC5B] text-[#1A1A1A]"
											: "text-[#13EC5B] hover:bg-[#13EC5B]/10"
									}`}
								>
									{recipe ? "Change" : "Add"}
								</Button>
							</div>
							<div className="p-6">
								{recipe ? (
									<div className="flex gap-6">
										<div className="w-32 h-32 rounded-2xl bg-[#F8F9FA] overflow-hidden border border-[#E2E8F0] flex-shrink-0">
											{recipe.imageUrl ? (
												<img
													src={recipe.imageUrl}
													alt={recipe.name}
													className="w-full h-full object-cover"
												/>
											) : (
												<div className="w-full h-full flex items-center justify-center">
													<ChefHat className="w-8 h-8 text-[#A0AEC0]" />
												</div>
											)}
										</div>
										<div className="flex-1">
											<h4 className="text-xl font-black text-[#1A1A1A] leading-tight mb-2">
												{recipe.name}
											</h4>
											<p className="text-sm text-[#4A5568] font-medium line-clamp-2 mb-4">
												{recipe.description ||
													"A nutritious and delicious meal prepared specifically for your health goals."}
											</p>
											<div className="flex flex-wrap gap-2">
												<span className="text-[10px] font-black bg-orange-100 text-orange-600 px-2 py-1 rounded-lg">
													{recipe.calories} KCAL
												</span>
												{recipe.protein && (
													<span className="text-[10px] font-black bg-blue-100 text-blue-600 px-2 py-1 rounded-lg">
														{recipe.protein}G PROTEIN
													</span>
												)}
												{recipe.tags?.slice(0, 2).map((tag) => (
													<span
														key={tag}
														className="text-[10px] font-black bg-[#F8F9FA] text-[#4A5568] px-2 py-1 rounded-lg border border-[#E2E8F0]"
													>
														{tag.toUpperCase()}
													</span>
												))}
											</div>
										</div>
									</div>
								) : (
									<button
										type="button"
										onClick={() => onSlotClick(selectedDate, mealType)}
										className={`w-full py-12 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-all ${
											isSelected
												? "bg-[#13EC5B]/10 border-[#13EC5B] shadow-sm"
												: "bg-[#F8F9FA] border-[#E2E8F0] hover:border-[#13EC5B] hover:bg-white"
										}`}
									>
										<div
											className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-colors ${
												isSelected
													? "bg-[#13EC5B] text-white"
													: "bg-white text-[#A0AEC0]"
											}`}
										>
											<Plus className="w-6 h-6" />
										</div>
										<p
											className={`font-black text-sm ${
												isSelected ? "text-[#1A1A1A]" : "text-[#A0AEC0]"
											}`}
										>
											Assign a recipe for {color.label}
										</p>
									</button>
								)}
							</div>
						</div>
					);
				})}
			</div>

			<div className="space-y-8">
				<div className="bg-[#1A1A1A] rounded-[32px] p-8 text-white shadow-2xl relative overflow-hidden">
					<div className="absolute top-0 right-0 w-64 h-64 bg-[#13EC5B] rounded-full blur-[100px] opacity-20 -mr-32 -mt-32" />
					<h3 className="text-2xl font-black mb-2 relative z-10">
						Daily Summary
					</h3>
					<p className="text-[#A0AEC0] text-sm font-medium mb-8 relative z-10">
						Nutrition overview for{" "}
						{new Date(selectedDate).toLocaleDateString("en-US", {
							weekday: "long",
							month: "short",
							day: "numeric",
						})}
					</p>

					<div className="space-y-6 relative z-10">
						<div>
							<div className="flex items-end justify-between mb-2">
								<p className="text-sm font-black text-[#A0AEC0] uppercase tracking-widest">
									Calories
								</p>
								<p className="text-3xl font-black text-[#13EC5B]">
									{consumed.calories}{" "}
									<span className="text-sm text-white/50">
										/ {targets.calories}
									</span>
								</p>
							</div>
							<div className="h-3 bg-white/10 rounded-full overflow-hidden">
								<div
									className="h-full bg-[#13EC5B] rounded-full transition-all duration-1000"
									style={{ width: `${caloriePercent}%` }}
								/>
							</div>
						</div>

						<div className="grid grid-cols-3 gap-4 pt-4">
							<div className="bg-white/5 rounded-2xl p-4 border border-white/10">
								<p className="text-[10px] font-black text-[#A0AEC0] uppercase tracking-widest mb-1">
									Protein
								</p>
								<p className="text-xl font-black">{consumed.protein}g</p>
								<div className="h-1 bg-blue-500/20 rounded-full mt-2">
									<div
										className="h-full bg-blue-500 rounded-full"
										style={{ width: `${proteinPercent}%` }}
									/>
								</div>
							</div>
							<div className="bg-white/5 rounded-2xl p-4 border border-white/10">
								<p className="text-[10px] font-black text-[#A0AEC0] uppercase tracking-widest mb-1">
									Carbs
								</p>
								<p className="text-xl font-black">{consumed.carbs}g</p>
								<div className="h-1 bg-amber-500/20 rounded-full mt-2">
									<div
										className="h-full bg-amber-500 rounded-full"
										style={{ width: `${carbsPercent}%` }}
									/>
								</div>
							</div>
							<div className="bg-white/5 rounded-2xl p-4 border border-white/10">
								<p className="text-[10px] font-black text-[#A0AEC0] uppercase tracking-widest mb-1">
									Fat
								</p>
								<p className="text-xl font-black">{consumed.fat}g</p>
								<div className="h-1 bg-red-500/20 rounded-full mt-2">
									<div
										className="h-full bg-red-500 rounded-full"
										style={{ width: `${fatPercent}%` }}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-3xl border border-[#E2E8F0] p-8 shadow-sm">
					<h3 className="text-xl font-black text-[#1A1A1A] mb-6 tracking-tight flex items-center gap-2">
						<Sparkles className="w-5 h-5 text-[#13EC5B]" />
						AI Smart Suggestions
					</h3>
					<div className="space-y-4">
						<div className="p-4 bg-[#F8F9FA] rounded-2xl border border-[#E2E8F0] hover:border-[#13EC5B]/30 transition-colors">
							<p className="text-xs font-bold text-[#4A5568] leading-relaxed">
								"You're currently{" "}
								<span className="text-[#13EC5B] font-black">240kcal</span> below
								your target. Consider adding a handful of almonds as a snack to
								reach your healthy fats goal."
							</p>
						</div>
						<div className="p-4 bg-[#F8F9FA] rounded-2xl border border-[#E2E8F0] hover:border-[#13EC5B]/30 transition-colors">
							<p className="text-xs font-bold text-[#4A5568] leading-relaxed">
								"Your protein intake is excellent today! This will help with
								muscle recovery after your evening workout."
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
