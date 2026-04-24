# Issue #003: Recipe Rating is Hardcoded to 4.9

## Problem
All recipe cards display a hardcoded 4.9 rating:

```tsx
// src/components/dashboard/Dashboard.tsx:138, 310
<RecipeCard
  key={recipe._id}
  name={recipe.name}
  imageUrl={recipe.imageUrl}
  calories={recipe.calories}
  rating={4.9}  // ← HARDCODED
/>
```

## Impact
- Users see fake/uniform ratings
- No actual rating system exists
- Reduces trust in the platform

## Proposed Solutions

### Option A: Remove Ratings (Quick Fix)
Remove the rating display from RecipeCard until feature is built.

### Option B: Implement Full Rating System
**Database:**
- Add `rating` and `ratingCount` fields to `recipes` table
- OR create separate `recipeRatings` table for user-level tracking

**Features:**
- Star rating UI on recipe detail page
- Average rating calculation
- User's own rating display
- Rating distribution (5-star histogram)

**Anti-Gaming:**
- One rating per user per recipe
- Users can update their rating
- Public recipes rated by all users
- User recipes rated by community

## Recommendation
**Option B** - Full rating system:
1. Ratings significantly increase engagement
2. Helps users discover quality recipes
3. Motivates recipe creators
4. Standard feature users expect

## Acceptance Criteria
- [ ] Add rating fields to `recipes` schema OR create `recipeRatings` table
- [ ] Create rating mutations (rateRecipe, updateRating)
- [ ] Build star rating UI component
- [ ] Update RecipeCard to display real average rating
- [ ] Add rating section to RecipeDetail page
- [ ] Calculate and cache average ratings

## Priority
**Medium** - Currently displaying fake data

## Estimated Effort
6-8 hours
