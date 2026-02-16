import { Loader2 } from "lucide-react";

export function LoadingState() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-[#F8F9FA]">
			<div className="text-center">
				<Loader2 className="w-8 h-8 text-[#13EC5B] animate-spin mx-auto mb-4" />
				<p className="text-[#4A5568] font-medium">Loading your sahani planner...</p>
			</div>
		</div>
	);
}
