import { Button } from "@/components/ui/button";
import type { Doc } from "convex/_generated/dataModel";
import { ChefHat, Filter, Loader2, Search, SortAsc, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import { RECIPE_TAG_CATEGORIES, decodeTag } from "@/lib/recipe-tags";

// ── Filter Types ────────────────────────────────────────────────────────────
interface Filters {
  mealType: string[];
  cuisine: string[];
  dietary: string[];
  difficulty: string[];
  cookTime: string[];
  favoritesOnly: boolean;
}

const EMPTY_FILTERS: Filters = {
  mealType: [],
  cuisine: [],
  dietary: [],
  difficulty: [],
  cookTime: [],
  favoritesOnly: false,
};

const COOK_TIME_RANGES = [
  { id: "quick", label: "Quick (<15min)", max: 15 },
  { id: "medium", label: "Medium (15-45min)", min: 15, max: 45 },
  { id: "long", label: "Long (>45min)", min: 45 },
] as const;

type SortOption = "newest" | "alphabetical";

// ── Props ───────────────────────────────────────────────────────────────────
interface RecipeListProps {
  recipes: Doc<"recipes">[] | undefined;
  selectedRecipeId: string | null;
  onSelect: (id: string) => void;
  showFavoritesOnly?: boolean;
  onToggleFavorites?: () => void;
}

// ── Filter Popover ──────────────────────────────────────────────────────────
function FilterPopover({
  filters,
  onChange,
  onClear,
  onClose,
}: {
  filters: Filters;
  onChange: (f: Filters) => void;
  onClear: () => void;
  onClose: () => void;
}) {
  const toggleFilter = (category: keyof Omit<Filters, "favoritesOnly">, value: string) => {
    const current = filters[category];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange({ ...filters, [category]: updated });
  };

  const filterCategories = RECIPE_TAG_CATEGORIES.map((cat) => ({
    id: cat.id as keyof Omit<Filters, "favoritesOnly" | "cookTime">,
    label: cat.label,
    options: cat.tags.map((t) => String(t)),
  }));

  return (
    <div className="absolute top-full left-0 right-0 z-50 mt-2 bg-card border border-border rounded-2xl shadow-xl p-5 space-y-4 max-h-[70vh] overflow-y-auto">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-black text-foreground">Filters</h3>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={onClear} className="text-xs text-muted-foreground">
            Clear all
          </Button>
          <button type="button" onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {filterCategories.map((cat) => (
        <div key={cat.id}>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">{cat.label}</p>
          <div className="flex flex-wrap gap-1.5">
            {cat.options.map((opt) => {
              const isActive = filters[cat.id]?.includes(opt);
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggleFilter(cat.id, opt)}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all",
                    isActive
                      ? "bg-primary text-white"
                      : "bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary border border-border"
                  )}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Cook Time */}
      <div>
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Cook Time</p>
        <div className="flex flex-wrap gap-1.5">
          {COOK_TIME_RANGES.map((range) => {
            const isActive = filters.cookTime.includes(range.id);
            return (
              <button
                key={range.id}
                type="button"
                onClick={() => toggleFilter("cookTime", range.id)}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all",
                  isActive
                    ? "bg-primary text-white"
                    : "bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary border border-border"
                )}
              >
                {range.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Main Component ──────────────────────────────────────────────────────────
export function RecipeList({
  recipes,
  selectedRecipeId,
  onSelect,
  showFavoritesOnly,
  onToggleFavorites,
}: RecipeListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [showFilters, setShowFilters] = useState(false);
  const [sort, setSort] = useState<SortOption>("newest");

  const activeFilterCount = useMemo(() => {
    return (
      filters.mealType.length +
      filters.cuisine.length +
      filters.dietary.length +
      filters.difficulty.length +
      filters.cookTime.length +
      (filters.favoritesOnly ? 1 : 0)
    );
  }, [filters]);

  const activeChips = useMemo(() => {
    const chips: { label: string; category: keyof Omit<Filters, "favoritesOnly">; value: string }[] = [];
    for (const v of filters.mealType) chips.push({ label: v, category: "mealType", value: v });
    for (const v of filters.cuisine) chips.push({ label: v, category: "cuisine", value: v });
    for (const v of filters.dietary) chips.push({ label: v, category: "dietary", value: v });
    for (const v of filters.difficulty) chips.push({ label: v, category: "difficulty", value: v });
    for (const v of filters.cookTime) {
      const range = COOK_TIME_RANGES.find((r) => r.id === v);
      if (range) chips.push({ label: range.label, category: "cookTime", value: v });
    }
    return chips;
  }, [filters]);

  const removeChip = (category: keyof Omit<Filters, "favoritesOnly">, value: string) => {
    setFilters((f) => ({ ...f, [category]: f[category].filter((v) => v !== value) }));
  };

  // ── Client-side search + filter ─────────────────────────────────────────
  const filteredRecipes = useMemo(() => {
    if (!recipes) return undefined;

    let result = [...recipes];

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((r) => {
        const nameMatch = r.name.toLowerCase().includes(q);
        const descMatch = r.description?.toLowerCase().includes(q);
        const ingMatch = r.ingredients.some((ing) => ing.name.toLowerCase().includes(q));
        const tagMatch = r.tags?.some((t) => {
          const decoded = decodeTag(t);
          return decoded ? decoded.tag.toLowerCase().includes(q) : t.toLowerCase().includes(q);
        });
        return nameMatch || descMatch || ingMatch || tagMatch;
      });
    }

    // Favorites
    if (showFavoritesOnly) {
      result = result.filter((r) => r.isFavorite);
    }

    // Tag-based filters (mealType, cuisine, dietary, difficulty)
    const tagFilters = [
      ...filters.mealType.map((v) => `mealType:${v}`),
      ...filters.cuisine.map((v) => `cuisine:${v}`),
      ...filters.dietary.map((v) => `dietary:${v}`),
      ...filters.difficulty.map((v) => `difficulty:${v}`),
    ];
    if (tagFilters.length > 0) {
      result = result.filter((r) =>
        tagFilters.some((tf) => r.tags?.includes(tf))
      );
    }

    // Cook time filter
    if (filters.cookTime.length > 0) {
      result = result.filter((r) => {
        const totalTime = (r.prepTimeMinutes || 0) + (r.cookTimeMinutes || 0);
        return filters.cookTime.some((rangeId) => {
          const range = COOK_TIME_RANGES.find((rt) => rt.id === rangeId);
          if (!range) return false;
          const minOk = !("min" in range) || totalTime >= (range.min ?? 0);
          const maxOk = !("max" in range) || totalTime < (range.max ?? Infinity);
          return minOk && maxOk;
        });
      });
    }

    // Sort
    if (sort === "alphabetical") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      result.sort((a, b) => b.createdAt - a.createdAt);
    }

    return result;
  }, [recipes, searchQuery, filters, showFavoritesOnly, sort]);

  const totalCount = recipes?.length ?? 0;
  const filteredCount = filteredRecipes?.length ?? 0;
  const hasActiveFilters = activeFilterCount > 0 || searchQuery.trim().length > 0;

  return (
    <div className="w-[400px] border-r border-border bg-card flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border space-y-3">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-black text-foreground">Recipes</h1>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSort(sort === "newest" ? "alphabetical" : "newest")}
              className="h-8 w-8"
              title={sort === "newest" ? "Sort A-Z" : "Sort by newest"}
            >
              <SortAsc className={cn("w-4 h-4", sort === "alphabetical" && "text-primary")} />
            </Button>
            <Button
              variant={showFavoritesOnly ? "default" : "ghost"}
              size="icon"
              onClick={onToggleFavorites}
              className={cn("h-8 w-8", showFavoritesOnly && "bg-primary text-white")}
              title="Favorites"
            >
              ♥
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search recipes, ingredients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-3 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter button */}
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "text-xs font-bold rounded-lg",
              activeFilterCount > 0 && "border-primary text-primary"
            )}
          >
            <Filter className="w-3.5 h-3.5 mr-1.5" />
            Filters
            {activeFilterCount > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-primary text-white text-[10px] leading-none">
                {activeFilterCount}
              </span>
            )}
          </Button>

          {showFilters && (
            <FilterPopover
              filters={filters}
              onChange={setFilters}
              onClear={() => setFilters(EMPTY_FILTERS)}
              onClose={() => setShowFilters(false)}
            />
          )}
        </div>

        {/* Active chips */}
        {activeChips.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {activeChips.map((chip) => (
              <span
                key={`${chip.category}-${chip.value}`}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-primary/10 text-primary text-[10px] font-bold"
              >
                {chip.label}
                <button type="button" onClick={() => removeChip(chip.category, chip.value)} className="hover:text-red-500">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Result count */}
        {hasActiveFilters && (
          <p className="text-[10px] text-muted-foreground font-bold">
            Showing {filteredCount} of {totalCount} recipes
          </p>
        )}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredRecipes === undefined ? (
          <div className="flex justify-center py-10">
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
          </div>
        ) : filteredRecipes.length === 0 ? (
          <div className="text-center py-10">
            <ChefHat className="w-12 h-12 text-sahani-tertiary mx-auto mb-3" />
            <p className="text-foreground font-bold">
              {hasActiveFilters ? "No recipes match your filters" : "No recipes yet"}
            </p>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => { setFilters(EMPTY_FILTERS); setSearchQuery(""); }}
                className="mt-2 text-xs text-primary"
              >
                Clear all filters
              </Button>
            )}
          </div>
        ) : (
          filteredRecipes.map((recipe) => (
            <button
              key={recipe._id}
              type="button"
              onClick={() => onSelect(recipe._id)}
              className={cn(
                "w-full text-left p-3 rounded-2xl border transition-all flex gap-3 group",
                selectedRecipeId === recipe._id
                  ? "bg-primary/5 border-primary shadow-sm"
                  : "bg-card border-transparent hover:border-border hover:bg-secondary"
              )}
            >
              <div className="w-16 h-16 rounded-xl bg-secondary overflow-hidden flex-shrink-0 border border-border">
                {recipe.imageUrl ? (
                  <img
                    src={recipe.imageUrl}
                    alt={recipe.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ChefHat className="w-6 h-6 text-sahani-tertiary" />
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-foreground text-sm truncate">
                  {recipe.name}
                </h3>
                <p className="text-[11px] text-muted-foreground line-clamp-2 mt-0.5 leading-relaxed">
                  {recipe.description || "A delicious healthy recipe."}
                </p>
                <div className="flex gap-1.5 mt-1.5 flex-wrap">
                  {recipe.tags?.slice(0, 3).map((tag) => {
                    const decoded = decodeTag(tag);
                    const display = decoded ? decoded.tag : tag;
                    return (
                      <span
                        key={tag}
                        className="text-[9px] font-bold text-muted-foreground bg-secondary px-1.5 py-0.5 rounded border border-border"
                      >
                        {display}
                      </span>
                    );
                  })}
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
