import type { Doc } from "convex/_generated/dataModel";
import { ChefHat, Loader2, Plus } from "lucide-react";

interface MealCardProps {
	meal: Doc<"mealPlans"> | null;
	recipe: Doc<"recipes"> | null;
	onAdd: () => void;
	isLoading?: boolean;
	isSelected?: boolean;
}

export function MealCard({
	meal,
	recipe,
	onAdd,
	isLoading,
	isSelected,
}: MealCardProps) {
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
				className={`bg-white rounded-2xl p-4 min-h-[140px] flex items-center justify-center border-2 border-dashed transition-all cursor-pointer group w-full ${
					isSelected 
						? "border-[#13EC5B] bg-[#13EC5B]/10 shadow-md ring-2 ring-[#13EC5B]/20" 
						: "border-[#E2E8F0] hover:border-[#13EC5B] hover:bg-[#13EC5B]/5"
				}`}
			>
				<Plus className={`w-6 h-6 transition-colors ${isSelected ? "text-[#13EC5B]" : "text-[#A0AEC0] group-hover:text-[#13EC5B]"}`} />
			</button>
		);
	}

	return (
		<div 
			onClick={onAdd}
			className={`bg-white rounded-2xl p-3 border transition-all cursor-pointer group ${
				isSelected 
					? "border-[#13EC5B] shadow-lg ring-2 ring-[#13EC5B]/20 bg-[#13EC5B]/5" 
					: "border-[#E2E8F0] hover:shadow-md"
			}`}
		>
			<div className="w-full h-24 rounded-xl bg-[#F8F9FA] mb-3 flex items-center justify-center overflow-hidden border border-[#E2E8F0]">
				{recipe.imageUrl ? (
					<img
						src={recipe.imageUrl}
						alt={recipe.name}
						className={`w-full h-full object-cover transition-transform ${isSelected ? 'scale-110' : 'group-hover:scale-105'}`}
					/>
				) : (
					<ChefHat className={`w-8 h-8 transition-colors ${isSelected ? 'text-[#13EC5B]' : 'text-[#A0AEC0]'}`} />
				)}
			</div>
			<h4 className="font-bold text-sm text-[#1A1A1A] truncate">
				{recipe.name}
			</h4>
			<p className="text-xs text-[#4A5568] mt-1 font-medium">{recipe.calories} kcal</p>
		</div>
	);
}
