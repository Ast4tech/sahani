# Issue #001: Dashboard Daily Tip is Hardcoded

## Problem
The daily tip on the dashboard is a static string that never changes:

```tsx
// src/components/dashboard/Dashboard.tsx:370
<p className="text-xs text-sahani-tertiary leading-relaxed font-medium">
  "Adding a source of vitamin C (like lemon) to your spinach helps your body absorb the iron more efficiently."
</p>
```

## Impact
- Users see the same tip every day, reducing engagement
- No personalization based on user goals or dietary preferences
- Missed opportunity for educational content

## Proposed Solutions

### Option A: Static Tips Array (Quick Win)
Create a curated list of 50+ nutrition tips that rotate daily.

### Option B: Tips Table with Admin Panel
- Create `dailyTips` table in Convex
- Store tip text, category, relevant dietary tags
- Query random tip daily or based on user's health goal
- Future: Admin panel to add/edit tips

### Option C: AI-Generated Tips (Future)
Integrate with AI API to generate personalized tips based on:
- User's meal history
- Nutritional gaps
- Seasonal ingredients
- Kenyan food focus

## Recommendation
**Option B** - Start with a tips table that allows:
1. Seeding 50+ tips at launch
2. Category-based filtering (e.g., "iron absorption", "hydration", "protein")
3. Easy expansion without code changes
4. Analytics on which tips users engage with

## Acceptance Criteria
- [ ] Create `dailyTips` table in Convex schema
- [ ] Seed with 50+ curated nutrition tips
- [ ] Update Dashboard to fetch random tip daily
- [ ] Ensure tip is different from previous day
- [ ] Optional: Categorize tips by user's health goal

## Priority
**Low** - Nice to have, not blocking functionality

## Estimated Effort
2-3 hours (mostly content curation)
