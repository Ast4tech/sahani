# Recipe Creation Redesign

## Problem
The current recipe creation form at `/recipes/new` is a single long page that dumps all fields at once — overwhelming users. It lacks image upload (URL-only), has no edit mode, uses plain text for instructions, has free-text tags, and no ingredient autocomplete.

## Solution
Redesign recipe creation as a **multi-step wizard** with a shared `RecipeForm` component supporting both create and edit modes. Add image upload, structured step builder for instructions, predefined tag categories, ingredient autocomplete, and drag-to-reorder.

## Related Issues
- #5 — Recipe Instructions Need Rich Text Editor
- #6 — Recipe Image Upload (Not URL Only)
- #9 — Recipe Ingredient Units Need Dropdown
- #11 — Recipe Categories & Tags System

## Phasing
- **Phase 1**: Multi-step wizard + shared create/edit form + image upload via Convex storage
- **Phase 2**: Structured step builder + drag-to-reorder (@dnd-kit) + ingredient autocomplete + predefined tag categories
