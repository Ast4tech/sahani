import * as React from "react";
import { ArrowRight, ChefHat, Heart, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RecipeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  name: string;
  imageUrl?: string;
  calories: number;
  rating?: number;
  isFavorite?: boolean;
  onFavoriteToggle?: (id: string) => void;
}

function RecipeCard({
  id,
  name,
  imageUrl,
  calories,
  rating,
  isFavorite,
  onFavoriteToggle,
  className,
  ...props
}: RecipeCardProps) {
  const [optimisticFavorite, setOptimisticFavorite] = React.useState(isFavorite);

  // Sync with prop changes
  React.useEffect(() => {
    setOptimisticFavorite(isFavorite);
  }, [isFavorite]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOptimisticFavorite(!optimisticFavorite);
    onFavoriteToggle?.(id);
  };

  return (
		<div
			className={cn(
				"min-w-[240px] bg-card rounded-3xl border border-border shadow-sm overflow-hidden group hover:shadow-lg transition-all cursor-pointer",
				className,
			)}
			{...props}
		>
			<div className="h-40 overflow-hidden relative">
				{imageUrl ? (
					<img
						src={imageUrl}
						alt={name}
						className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
					/>
				) : (
					<div className="w-full h-full bg-secondary flex items-center justify-center">
						<ChefHat className="w-10 h-10 text-sahani-tertiary" />
					</div>
				)}
      {/* Favorite button - top left */}
      <button
        onClick={handleClick}
        className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-sm hover:scale-110 transition-transform z-10"
        aria-label={optimisticFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart
          className={cn(
            "w-4 h-4 transition-colors",
            optimisticFavorite ? "fill-rose-500 text-rose-500" : "text-sahani-tertiary"
          )}
        />
      </button>
      {rating !== undefined && (
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg">
						<div className="flex items-center gap-1">
							<Star className="w-3 h-3 fill-primary text-primary" />
							<span className="text-[10px] font-black text-foreground">
								{rating.toFixed(1)}
							</span>
						</div>
					</div>
				)}
			</div>
			<div className="p-5">
				<h4 className="font-black text-sm text-foreground mb-2 line-clamp-1">
					{name}
				</h4>
				<div className="flex items-center justify-between">
					<span className="text-[10px] font-bold text-sahani-tertiary uppercase tracking-wider">
						{calories} kcal
					</span>
					<div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
						<ArrowRight className="w-3 h-3" />
					</div>
				</div>
			</div>
		</div>
	);
}

export { RecipeCard };
export type { RecipeCardProps };
