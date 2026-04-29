# Recipe Creation Redesign — Design

## Architecture

### Shared RecipeForm Component
- `src/components/recipes/RecipeForm.tsx`
- Props: `mode: "create" | "edit"`, `initialData?: RecipeFormData`
- Uses `react-hook-form` + `zod` (existing stack)
- Wizard state managed via local `useState` (step index)

### Wizard Steps
1. **Basics** — Name, description, image upload, prep/cook time, servings
2. **Ingredients** — Dynamic list with autocomplete, amount, unit dropdown, drag-to-reorder
3. **Instructions** — Structured step cards with text + optional image, drag-to-reorder
4. **Nutrition & Tags** — Calories/protein/carbs/fat, predefined tag categories

### Routes
- `/recipes/new` → `<RecipeForm mode="create" />`
- `/recipes/:id/edit` → `<RecipeForm mode="edit" initialData={recipe} />`
- New route file: `src/routes/recipes.$id.edit.tsx`

### Image Upload
- Convex file storage (`ctx.storage`)
- New mutations: `recipes.generateUploadUrl`, update recipe with `storageId`
- Frontend: drag-and-drop zone with preview, progress indicator
- Accept: JPG, PNG, WebP. Max 5MB.

### Schema Changes (Convex)

```typescript
// New field on recipes table (Phase 2)
steps: v.optional(v.array(v.object({
  text: v.string(),
  imageStorageId: v.optional(v.string()),
  order: v.number(),
}))),

// Keep `instructions` field for backward compat
// New field for main image
imageStorageId: v.optional(v.string()),
```

### Ingredient Autocomplete
- New query: `recipes.listAllIngredients` — distinct ingredient names across all users' recipes
- Frontend: combobox with fuzzy matching (existing ingredients)
- New ingredients added to pool automatically on recipe save

### Tags System
- Predefined categories as constants:
  - Meal Type: Breakfast, Lunch, Dinner, Snack
  - Cuisine: Kenyan, East African, International
  - Dietary: Vegan, Vegetarian, Gluten-Free, Dairy-Free
  - Difficulty: Easy, Medium, Hard
- Multi-select chip UI per category
- Schema: `tags` field remains `v.array(v.string())`, store as `"mealType:breakfast"` format

### Drag-to-Reorder
- `@dnd-kit/core` + `@dnd-kit/sortable`
- Applied to both ingredients list and instruction steps
- Grip handle icon on each row/card

## Dependencies
- Phase 1: No new deps (Convex storage is built-in)
- Phase 2: `@dnd-kit/core`, `@dnd-kit/sortable`
