import { ChefHat } from "lucide-react";
import type { Doc } from "convex/_generated/dataModel";
import { MealCard } from "@/components/meal-planner/MealCard";
import { MEAL_TYPES, type MealType } from "@/components/meal-planner/utils";

interface WeeklyViewProps {
	days: {
		day: string;
		date: number;
		fullDate: string;
		id: string;
	}[];
	mealPlanMap: Map<string, Doc<"mealPlans">>;
	recipeMap: Map<string, Doc<"recipes">>;
	selectedSlot: { date: string; mealType: MealType } | null;
	onSlotClick: (date: string, mealType: MealType) => void;
	isLoading: boolean;
}

export function WeeklyView({
	days,
	mealPlanMap,
	recipeMap,
	selectedSlot,
	onSlotClick,
	isLoading,
}: WeeklyViewProps) {
	return (
		<div className="space-y-6">
			{MEAL_TYPES.map((mealType) => {
				const colors = {
					breakfast: {
						bg: "bg-orange-50",
						text: "text-orange-500",
						iconBg: "bg-orange-100",
					},
					lunch: {
						bg: "bg-blue-50",
						text: "text-blue-500",
						iconBg: "bg-blue-100",
					},
					dinner: {
						bg: "bg-indigo-50",
						text: "text-indigo-500",
						iconBg: "bg-indigo-100",
					},
					snack: {
						bg: "bg-purple-50",
						text: "text-purple-500",
						iconBg: "bg-purple-100",
					},
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
								const isSelected =
									selectedSlot?.date === day.fullDate &&
									selectedSlot?.mealType === mealType;
								return (
									<MealCard
										key={`${mealType}-${day.id}`}
										meal={plan ?? null}
										recipe={recipe}
										onAdd={() => onSlotClick(day.fullDate, mealType)}
										isLoading={isLoading}
										isSelected={isSelected}
									/>
								);
							})}
						</div>
					</div>
				);
			})}
		</div>
	);
}
