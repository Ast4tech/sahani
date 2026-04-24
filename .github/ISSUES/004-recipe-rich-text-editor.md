# Issue #004: Recipe Instructions Need Rich Text Editor

## Problem
Currently, instructions are plain text in a textarea:

```tsx
// src/routes/recipes.new.tsx:329
<Textarea
  id="instructions"
  placeholder="1. Prepare oats...&#10;2. Add milk...&#10;3. Let it sit overnight..."
  {...register("instructions")}
  className="min-h-[200px] border-border focus-visible:ring-primary/50 leading-relaxed"
/>
```

Users must manually format with newlines, no support for:
- Bold/italic text
- Numbered lists (auto-formatting)
- Bullet points
- Links to related recipes
- Timer embeds
- Images between steps

## Impact
- Poor formatting makes instructions hard to follow
- No visual hierarchy for steps
- Can't include links or media
- Looks unprofessional compared to competitors

## Proposed Solutions

### Option A: Markdown Editor
**Pros:**
- Simple, familiar syntax
- Easy to store (plain text)
- Good for technical users

**Cons:**
- Learning curve for non-technical users
- Requires preview mode

### Option B: Rich Text Editor (Tiptap/Slate)
**Pros:**
- WYSIWYG experience
- Supports all formatting needs
- Block-based (paragraphs, lists, images)
- Easy image insertion

**Cons:**
- More complex to implement
- Stores JSON/HTML instead of plain text
- Migration needed for existing recipes

**Libraries:**
- **Tiptap** (Recommended) - Headless, customizable, React-friendly
- **Slate** - More flexible but steeper learning curve
- **Lexical** (Meta) - Modern but newer

### Option C: Block-based Editor (Notion-style)
**Pros:**
- Each step is a block
- Can embed timers, images, links
- Most modern approach

**Cons:**
- Complex implementation
- Overkill for current needs

## Recommendation
**Option B with Tiptap**:
1. Excellent React support
2. Kenyan recipes often need rich formatting
3. Can start simple and add features incrementally
4. Strong community and extensions

## Implementation Details

### Schema Change
```typescript
// Change instructions from string to JSON
instructions: v.optional(v.string()), // deprecated
instructionsContent: v.optional(v.object({ // new
  type: v.literal('doc'),
  content: v.array(v.any()),
})),
```

### Editor Features (MVP)
- [ ] Bold/italic text
- [ ] Ordered lists (auto-numbered steps)
- [ ] Links (to other recipes, external sources)
- [ ] Basic formatting (headings for sections)

### Editor Features (Phase 2)
- [ ] Images within instructions
- [ ] Timer embeds ("Cook for 15 minutes")
- [ ] Ingredient auto-linking
- [ ] Print-friendly formatting

## Acceptance Criteria

### MVP
- [ ] Integrate Tiptap editor
- [ ] Support bold, italic, ordered lists
- [ ] Update schema to store JSON content
- [ ] Update RecipeDetail to render rich content
- [ ] Migrate existing recipes

### Phase 2
- [ ] Image uploads within instructions
- [ ] Ingredient mentions link to shopping list
- [ ] Timer button (triggers browser notification)

## Priority
**High** - Core feature for recipe quality

## Estimated Effort
12-16 hours (including migration)
