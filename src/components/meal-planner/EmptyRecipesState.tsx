import { ChefHat } from "lucide-react";

export function EmptyRecipesState() {
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
