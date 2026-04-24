# Issue #010: Recipe Categories & Tags System

## Problem
Current tag system is basic:
- Free text input (comma-separated)
- No predefined categories
- No filtering by category
- Tags not displayed prominently

```tsx
// recipes.new.tsx:179-187
<div className="space-y-2">
  <Label htmlFor="tags">Tags (comma separated)</Label>
  <Input
    id="tags"
    placeholder="Vegan, Breakfast, Quick"
    {...register("tags")}
  />
</div>
```

## Impact
- Hard to browse recipes by type
- No structured categorization
- Missing key discovery feature
- Kenyan recipe focus not highlighted

## Proposed Solution

### Hierarchical Categories
```typescript
// Predefined categories for Kenyan recipes
const RECIPE_CATEGORIES = [
  {
    id: 'breakfast',
    name: 'Breakfast',
    icon: 'Sunrise',
    subcategories: ['Porridges', 'Eggs', 'Breads']
  },
  {
    id: 'main-course',
    name: 'Main Course',
    icon: 'UtensilsCrossed',
    subcategories: ['Rice Dishes', 'Maize Dishes', 'Legume Dishes', 'Meat & Fish']
  },
  {
    id: 'sides',
    name: 'Sides & Vegetables',
    icon: 'Leaf',
    subcategories: ['Vegetables', 'Salads', 'Relishes']
  },
  {
    id: 'snacks',
    name: 'Snacks & Street Food',
    icon: 'Cookie',
    subcategories: ['Mandazi', 'Samosa', 'Samosas', 'Other']
  },
  {
    id: 'beverages',
    name: 'Beverages',
    icon: 'Coffee',
    subcategories: ['Tea', 'Coffee', 'Fresh Juices']
  },
];
```

### Features
- Category dropdown in recipe form
- Subcategory selection
- Category badges on recipe cards
- Filter recipes by category
- Category page with featured recipes

### Schema Update
```typescript
recipes: defineTable({
  // ...existing fields
  category: v.optional(v.string()),
  subcategory: v.optional(v.string()),
  tags: v.optional(v.array(v.string())), // keep for freeform tags
})
```

## Acceptance Criteria
- [ ] Create RECIPE_CATEGORIES constant
- [ ] Add category/subcategory to schema
- [ ] Update recipe form with category dropdown
- [ ] Display category badge on RecipeCard
- [ ] Add category filter to recipe list
- [ ] Seed existing recipes with appropriate categories
- [ ] Create category browsing page

## Priority
**Medium** - Important for discovery

## Estimated Effort
8-10 hours
