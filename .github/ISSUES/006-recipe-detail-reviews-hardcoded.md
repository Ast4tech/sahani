# Issue #006: Recipe Detail Reviews are Hardcoded

## Problem
Recipe reviews section displays fake/hardcoded review data:

```tsx
// src/components/recipes/RecipeDetail.tsx:117-146
<div className="space-y-4">
  {[{
    name: "Khondokar Touhid Likhon",
    rating: 5.0,
    text: "This recipe is the perfect way to enjoy a healthy and delicious meal!",
  }].map((review, i) => (
    <div key={i} className="p-6 bg-secondary border border-border rounded-2xl">
      {/* review display */}
    </div>
  ))}
</div>
```

Additionally, the review count is hardcoded:
```tsx
<span className="text-lg font-bold text-sahani-tertiary">07</span>
```

## Impact
- Users see fake reviews
- No actual review system exists
- Misleading "07" review count
- Reviews are a key trust signal for recipes

## Proposed Solution

### Database Schema
```typescript
// Add to schema.ts
recipeReviews: defineTable({
  recipeId: v.id('recipes'),
  userId: v.string(),
  rating: v.number(), // 1-5
  text: v.optional(v.string()),
  createdAt: v.number(),
}).index('by_recipe', ['recipeId'])
 .index('by_user', ['userId'])
```

### Features
- Star rating input (1-5)
- Optional text review
- User can edit/delete their review
- Display average rating and count
- Sort by newest/most helpful (future)

## Acceptance Criteria
- [ ] Create `recipeReviews` table
- [ ] Add mutations: `addReview`, `updateReview`, `deleteReview`
- [ ] Add query: `getRecipeReviews`
- [ ] Build review form component
- [ ] Update RecipeDetail to display real reviews
- [ ] Update review count dynamically
- [ ] Show "Be the first to review" if none

## Priority
**Medium** - Currently showing fake data

## Estimated Effort
6-8 hours
