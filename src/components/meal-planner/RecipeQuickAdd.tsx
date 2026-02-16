import type { Doc, Id } from "convex/_generated/dataModel";
import { ChefHat, Clock } from "lucide-react";

interface RecipeQuickAddProps {
	recipe: Doc<"recipes">;
	onAdd: (recipeId: Id<"recipes">) => void;
}

export function RecipeQuickAdd({
	recipe,
	onAdd,
}: RecipeQuickAddProps) {
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
