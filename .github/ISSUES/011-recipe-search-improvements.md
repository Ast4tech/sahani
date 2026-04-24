# Issue #011: Recipe Search & Discovery Improvements

## Problem
Current search is basic text matching on recipe name:

```typescript
// convex/recipes.ts:54-70
export const search = query({
  args: { query: v.string() },
  handler: async (ctx, args) => {
    const results = await ctx.db
      .query('recipes')
      .withSearchIndex('search_name', (q) =>
        q.search('name', args.query)
      )
      .collect()
    return results.filter(r => r.userId === undefined || r.userId === user._id)
  },
})
```

## Limitations
- Only searches recipe names
- No filter by category, calories, time
- No sort options
- No "fuzzy" matching
- No search suggestions
- No recent searches

## Proposed Solution

### Enhanced Search
```typescript
export const search = query({
  args: {
    query: v.string(),
    filters: v.optional(v.object({
      category: v.optional(v.string()),
      maxCalories: v.optional(v.number()),
      maxTime: v.optional(v.number()), // minutes
      tags: v.optional(v.array(v.string())),
      favoritesOnly: v.optional(v.boolean()),
    })),
    sortBy: v.optional(v.union(
      v.literal('relevance'),
      v.literal('newest'),
      v.literal('calories_asc'),
      v.literal('time_asc'),
    )),
  },
  // ...
})
```

### Search Index Expansion
```typescript
// Add search index for description and tags
.searchIndex('search_full', {
  searchField: 'name',
  filterFields: ['category', 'tags', 'calories'],
})
```

### UI Features
- [ ] Search input with suggestions
- [ ] Filter chips (Category, Calories, Time)
- [ ] Sort dropdown (Relevance, Newest, Calories, Time)
- [ ] Recent searches
- [ ] Popular searches
- [ ] Empty state with suggested recipes

## Acceptance Criteria
- [ ] Expand search to include description and tags
- [ ] Add filter UI for category, calories, time
- [ ] Implement sort options
- [ ] Add search suggestions
- [ ] Save recent searches
- [ ] Empty state with recommendations

## Priority
**Medium** - Important for recipe discovery

## Estimated Effort
8-12 hours
