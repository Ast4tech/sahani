# Issue #012: Recipe to Meal Planning Integration

## Problem
Recipes and meal planning are somewhat disconnected:
- No "Add to Meal Plan" from recipe detail
- No "Add to Shopping List" from recipe
- Can't see which recipes are in current meal plan
- No quick-add from recipe browser

## Current Flow
User must navigate separately to meal planner and manually select recipes.

## Proposed Solution

### Recipe Detail Actions
Add action buttons:
```tsx
// In RecipeDetail.tsx
<div className="flex gap-3 mt-8">
  <Button onClick={() => addToMealPlan(recipe)}>
    <Calendar className="w-4 h-4 mr-2" />
    Add to Meal Plan
  </Button>
  <Button variant="outline" onClick={() => addToShoppingList(recipe)}>
    <ShoppingCart className="w-4 h-4 mr-2" />
    Add Ingredients to List
  </Button>
</div>
```

### Quick Add Modal
- Select date and meal type
- Choose servings
- One-click add

### Recipe Card Actions
- Hover to show quick actions
- "+" button to quick add
- Heart for favorites

### Badge for Planned Recipes
Show badge on recipe cards that are in current week's meal plan.

## Acceptance Criteria
- [ ] Add "Add to Meal Plan" button in RecipeDetail
- [ ] Create quick-add modal for meal planning
- [ ] Add "Add to Shopping List" for recipe ingredients
- [ ] Show quick actions on RecipeCard hover
- [ ] Display "Planned" badge for recipes in current week
- [ ] Filter: "Show only unplanned recipes"

## Priority
**High** - Core workflow improvement

## Estimated Effort
6-8 hours
