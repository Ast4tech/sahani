# Issue #002: Dashboard Hydration Tracking is Hardcoded

## Problem
The hydration MacroBar shows static values regardless of user:

```tsx
// src/components/dashboard/Dashboard.tsx:331
<MacroBar label="Hydration" value={1200} target={2500} color="cyan" />
```

This is misleading as it suggests tracking exists when it doesn't.

## Impact
- False impression of functionality
- Users may think hydration is being tracked automatically
- Missing feature gap in the health tracking ecosystem

## Proposed Solutions

### Option A: Hide Hydration (Quick Fix)
Remove or comment out the hydration bar until feature is implemented.

### Option B: Implement Full Water Tracking
**Frontend:**
- Add water logging UI (quick-add buttons: 250ml, 500ml, 750ml)
- Daily water intake visualization
- Weekly hydration trends

**Backend:**
- Create `waterLogs` table in Convex schema
```typescript
waterLogs: defineTable({
  userId: v.string(),
  amount: v.number(), // ml
  loggedAt: v.number(),
}).index('by_user_date', ['userId', 'loggedAt'])
```

- Queries: `getDailyTotal`, `getWeeklyStats`
- Mutations: `logWater`, `deleteLog`

### Option C: Integrate with Health APIs (Future)
- Apple HealthKit / Google Fit integration
- Smart water bottle APIs

## Recommendation
**Option B** - Implement full water tracking:
1. It's a core health metric users expect
2. Quick to implement (simple CRUD)
3. Complements existing nutrition features
4. Can leverage existing MacroBar component

## Acceptance Criteria
- [ ] Add `waterLogs` table to Convex schema
- [ ] Create water tracking queries and mutations
- [ ] Build water logging UI (quick-add + custom amount)
- [ ] Update Dashboard to show real hydration data
- [ ] Add weekly hydration chart to Nutrition page

## Priority
**Medium** - Currently misleading users

## Estimated Effort
4-6 hours
