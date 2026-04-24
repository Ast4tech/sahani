# Issue #009: Recipe Servings Calculator

## Problem
RecipeDetail has a servings selector that only affects display, not ingredient amounts:

```tsx
// RecipeDetail.tsx:171-189
<div className="flex items-center bg-secondary rounded-lg border border-border p-1">
  <button onClick={() => setServings(Math.max(1, servings - 1))}>
    <Minus className="w-4 h-4" />
  </button>
  <span>{servings.toString().padStart(2, "0")}</span>
  <button onClick={() => setServings(servings + 1)}>
    <Plus className="w-4 h-4" />
  </button>
</div>
```

Ingredients list doesn't update when servings change!

## Impact
- Users must manually calculate scaled amounts
- Core meal planning functionality incomplete
- Frustrating user experience

## Proposed Solution

### Algorithm
```typescript
// Calculate scaled ingredient amounts
const scaleFactor = desiredServings / recipe.servings;

// Parse amount (handle fractions like "1/2", "2 1/3")
const scaledAmount = parseAmount(ingredient.amount) * scaleFactor;
```

### Smart Display
- Handle fractions (1/2, 1/4, 3/4)
- Round reasonably (avoid "2.333 cups")
- Show both original and scaled

### UI Update
```tsx
// Dynamic ingredient display
<li key={i}>
  <span className="font-bold">
    {formatAmount(ing.amount * scaleFactor)} {ing.unit}
  </span>
  {ing.name}
</li>
```

## Acceptance Criteria
- [ ] Parse ingredient amounts (fractions, decimals)
- [ ] Calculate scaled amounts when servings changes
- [ ] Format amounts nicely (fractions preferred)
- [ ] Update displayed ingredients dynamically
- [ ] Handle edge cases ("to taste", "as needed")

## Priority
**High** - Core functionality incomplete

## Estimated Effort
4-6 hours
