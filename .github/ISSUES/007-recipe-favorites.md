# Issue #007: Recipe Favorites Feature Not Implemented

## Problem
Recipe schema has `isFavorite` field but UI lacks:
- Favorite toggle button on recipe cards
- Favorites filter in recipe list (button exists but not wired)
- Favorites section in dashboard

```tsx
// RecipeList.tsx - Filter button not functional
<Button variant="ghost" size="icon" className="text-muted-foreground">
  <Filter className="w-5 h-5" />
</Button>
```

## Impact
- `isFavorite` field is unused
- Users can't save favorite recipes
- Missing key engagement feature

## Proposed Solution

### UI Components Needed
1. **Favorite Button** - Heart icon toggle on RecipeCard
2. **Favorites Filter** - Toggle in RecipeList header
3. **Favorites Section** - Dashboard widget showing top favorites

### API
Already exists in `convex/recipes.ts`:
```typescript
export const toggleFavorite = mutation({...})
export const list = query({
  args: { favoritesOnly: v.optional(v.boolean()) },
  ...
})
```

## Acceptance Criteria
- [ ] Add favorite toggle button to RecipeCard
- [ ] Wire up Filter button to show favorites only
- [ ] Add "My Favorites" section to dashboard
- [ ] Show favorited status in recipe list
- [ ] Optimistic UI updates

## Priority
**Medium** - Field exists but unused

## Estimated Effort
4-6 hours
