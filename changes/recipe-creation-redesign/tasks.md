# Recipe Creation Redesign — Tasks

## Phase 1: Wizard + Edit Mode + Image Upload

### P1-1: Create shared RecipeForm wizard component
- [x] Extract form logic from `recipes.new.tsx` into `src/components/recipes/RecipeForm.tsx`
- [x] Add `mode` prop (`create` | `edit`) and `initialData` prop
- [x] Implement 4-step wizard with progress bar (Basics → Ingredients → Instructions → Nutrition)
- [x] Add step validation — can't advance if current step has errors
- [x] Back/Next/Submit navigation

### P1-2: Wire up create route to new form
- [x] Update `src/routes/recipes.new.tsx` to use `<RecipeForm mode="create" />`
- [x] Verify existing create flow still works

### P1-3: Add edit route and page
- [x] Create `src/routes/recipes.$id.edit.tsx`
- [x] Fetch recipe data, pass as `initialData` to `<RecipeForm mode="edit" />`
- [x] Call `api.recipes.update` on submit
- [x] Add "Edit" button to `RecipeDetail.tsx`

### P1-4: Image upload via Convex storage
- [x] Add `generateUploadUrl` mutation in `convex/recipes.ts`
- [x] Add `imageStorageId` field to recipes schema
- [x] Create `ImageUpload` component (drag-and-drop zone, preview, progress)
- [x] Replace URL input with `ImageUpload` in wizard Step 1
- [x] Update `RecipeCard` and `RecipeDetail` to resolve storage URLs
- [x] Keep `imageUrl` as fallback for seed/legacy recipes

## Phase 2: Steps Builder + DnD + Autocomplete + Tags

### P2-1: Structured instruction step builder
- [x] Add `steps` field to Convex schema (array of `{text, imageStorageId?, order}`)
- [x] Create `StepBuilder` component — numbered cards, each with text area + optional image upload
- [x] Add/remove steps, auto-number
- [x] Replace plain textarea in wizard Step 3
- [x] Update `RecipeDetail` to render steps (fall back to `instructions` string)
- [ ] Migration: parse existing `instructions` strings into steps for seed data

### P2-2: Drag-to-reorder
- [x] Install `@dnd-kit/core` + `@dnd-kit/sortable`
- [x] Add sortable wrapper to ingredients list in wizard Step 2
- [x] Add sortable wrapper to step cards in wizard Step 3
- [x] Grip handle UI on each draggable item
- [x] Update `order` fields on drop

### P2-3: Ingredient autocomplete
- [x] Add `recipes.listAllIngredients` query — distinct names from all recipes
- [x] Create combobox component with fuzzy search
- [x] Replace ingredient name `<Input>` with combobox in wizard Step 2
- [x] Allow typing new ingredients (not locked to existing list)

### P2-4: Predefined tag categories
- [x] Create `src/lib/recipe-tags.ts` with category constants (Meal Type, Cuisine, Dietary, Difficulty)
- [x] Create `TagSelector` component — multi-select chips grouped by category
- [x] Replace free-text tags input in wizard Step 4
- [x] Store as prefixed strings: `"mealType:breakfast"` etc.
- [ ] Update recipe list filtering to use categories
- [ ] Migrate existing seed recipe tags to new format
