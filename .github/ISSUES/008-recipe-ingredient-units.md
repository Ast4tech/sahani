# Issue #008: Recipe Ingredient Units Need Dropdown

## Problem
Ingredient unit is a free text field:

```tsx
// recipes.new.tsx:302-307
<div className="w-24">
  <Input
    placeholder="Unit"
    {...register(`ingredients.${index}.unit` as const)}
    className="h-11 border-border"
  />
</div>
```

Users can type anything: "cup", "cups", "Cup", "c", "C" - leading to inconsistency.

## Impact
- Inconsistent data quality
- Shopping list aggregation is harder
- Auto-scaling servings is unreliable
- Poor user experience

## Proposed Solution

### Standardized Units
Create dropdown with common units:
- Volume: tsp, tbsp, cup, pint, quart, gallon, ml, l
- Weight: oz, lb, g, kg
- Count: piece, slice, clove, bunch, can, package
- Custom: "to taste", "as needed"

### UI
Replace text input with searchable Select component:
```tsx
<Select {...register(`ingredients.${index}.unit`)}>
  <SelectTrigger>
    <SelectValue placeholder="Unit" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup label="Volume">
      <SelectItem value="tsp">tsp</SelectItem>
      <SelectItem value="tbsp">tbsp</SelectItem>
      <SelectItem value="cup">cup</SelectItem>
      ...
    </SelectGroup>
    <SelectGroup label="Weight">
      <SelectItem value="g">g</SelectItem>
      <SelectItem value="kg">kg</SelectItem>
      ...
    </SelectGroup>
  </SelectContent>
</Select>
```

## Acceptance Criteria
- [ ] Create unit options constant with categories
- [ ] Replace unit input with Select dropdown
- [ ] Group units by type (Volume, Weight, Count)
- [ ] Support custom unit entry for edge cases
- [ ] Update existing recipes to standardized units (migration)

## Priority
**Medium** - Data quality improvement

## Estimated Effort
3-4 hours
