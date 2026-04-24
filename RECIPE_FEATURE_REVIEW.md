# Recipe Feature Review & Improvement Plan

## Executive Summary

**Status:** Core recipe functionality is complete but has several UX gaps and hardcoded data issues.

**Priority Issues:**
1. 🔴 Recipe ratings hardcoded (fake 4.9)
2. 🔴 Reviews are hardcoded (single fake review)
3. 🔴 Servings calculator doesn't scale ingredients
4. 🟡 Instructions need rich text editor
5. 🟡 Image upload instead of URL
6. 🟡 Favorites feature not wired up
7. 🟢 Ingredient units are free text
8. 🟢 No categories/tags system
9. 🟢 Search is basic name-only
10. 🟢 Recipe → Meal Plan integration missing

---

## Detailed Review

### ✅ What's Working Well

| Feature | Status | Notes |
|---------|--------|-------|
| Recipe CRUD | ✅ | Create, read, update, delete with auth |
| Ingredient management | ✅ | Dynamic add/remove ingredients |
| Nutrition fields | ✅ | Calories, protein, carbs, fat |
| Recipe list view | ✅ | Nice card layout with images |
| Recipe detail view | ✅ | Split view with ingredients panel |
| Auth integration | ✅ | Users can only see own + public recipes |
| Favorites backend | ✅ | `isFavorite` field exists, mutations ready |
| Search index | ✅ | Convex search index on name |
| Servings UI | ✅ | Counter exists (but non-functional) |

### ❌ Hardcoded Data Issues

| Location | Issue | Priority |
|----------|-------|----------|
| Dashboard | Recipe rating hardcoded to 4.9 | 🔴 High |
| RecipeDetail | Reviews section hardcoded | 🔴 High |
| RecipeDetail | Review count hardcoded to "07" | 🔴 High |
| Dashboard | Daily tip static | 🟡 Medium |
| Dashboard | Hydration hardcoded 1200/2500 | 🟡 Medium |

### 🔧 Missing/Broken Features

| Feature | Status | Impact |
|---------|--------|--------|
| Rich text instructions | ❌ Plain text only | High |
| Image upload | ❌ URL only | High |
| Servings scaling | ❌ UI exists, no logic | High |
| Favorites UI | ❌ Not connected | Medium |
| Reviews system | ❌ Backend exists, no UI | Medium |
| Categories | ❌ Free text tags | Medium |
| Recipe ratings | ❌ Hardcoded | Medium |
| Unit dropdown | ❌ Free text | Low |
| Search filters | ❌ Basic only | Low |
| Recipe → Meal Plan | ❌ No integration | High |

---

## Recommended Implementation Order

### Phase 1: Fix Hardcoded Data (Week 1)
1. **Issue #003** - Implement recipe rating system
2. **Issue #006** - Build reviews system
3. **Issue #009** - Fix servings calculator

### Phase 2: Core UX Improvements (Week 2)
4. **Issue #004** - Rich text editor for instructions (Tiptap)
5. **Issue #005** - Image upload (Convex storage)
6. **Issue #007** - Wire up favorites feature

### Phase 3: Polish & Discovery (Week 3-4)
7. **Issue #008** - Ingredient unit dropdown
8. **Issue #010** - Categories & tags system
9. **Issue #011** - Search improvements
10. **Issue #012** - Recipe → Meal Plan integration

### Phase 4: Nice to Have (Backlog)
- Issue #001 - Daily tips rotation
- Issue #002 - Hydration tracking

---

## Technical Recommendations

### Rich Text Editor: Tiptap
```bash
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-list-item
```

**Why:**
- Headless (works with our design system)
- Excellent React support
- Extensible for future features (embeds, images)
- Active community

### Image Upload: Convex Storage
**Why:**
- Already using Convex
- Built-in CDN
- Simple API
- Automatic auth integration

### Servings Calculator Algorithm
```typescript
function parseAmount(amount: string): number {
  // Handle fractions: "1/2", "2 1/3", "2.5"
  if (amount.includes('/')) {
    const [whole, fraction] = amount.split(' ');
    const [num, den] = fraction.split('/');
    return parseInt(whole) + parseInt(num) / parseInt(den);
  }
  return parseFloat(amount);
}

function formatAmount(value: number): string {
  // Convert back to fractions for nice display
  const nearest = Math.round(value * 4) / 4;
  const whole = Math.floor(nearest);
  const fraction = nearest - whole;
  // Return "1 1/2" or "3/4" or "2"
}
```

---

## Estimated Effort Summary

| Phase | Hours | Issues |
|-------|-------|--------|
| Phase 1 | 20-26 | 3 issues |
| Phase 2 | 24-32 | 4 issues |
| Phase 3 | 24-30 | 4 issues |
| **Total** | **68-88 hours** | **10+ improvements** |

---

## Files Created

All issues documented in `.github/ISSUES/`:
- `001-dashboard-hardcoded-daily-tip.md`
- `002-dashboard-hardcoded-hydration.md`
- `003-dashboard-hardcoded-recipe-rating.md`
- `004-recipe-rich-text-editor.md`
- `005-recipe-image-upload.md`
- `006-recipe-detail-reviews-hardcoded.md`
- `007-recipe-favorites.md`
- `008-recipe-ingredient-units.md`
- `009-recipe-servings-calculator.md`
- `010-recipe-categories-tags.md`
- `011-recipe-search-improvements.md`
- `012-recipe-meal-planning-integration.md`

---

## Next Steps

1. Review and prioritize issues
2. Create implementation plan for Phase 1
3. Start with highest priority (recipe ratings)
4. Consider user feedback on which features matter most

**Question for you:** Which 3 features would provide the most value to users? I recommend starting there.
