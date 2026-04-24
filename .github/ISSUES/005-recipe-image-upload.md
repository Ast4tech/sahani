# Issue #005: Recipe Image Upload (Not URL Only)

## Problem
Currently requires users to provide an image URL:

```tsx
// src/routes/recipes.new.tsx:169
<Label htmlFor="imageUrl" className="text-sm font-bold text-foreground">Image URL</Label>
<Input
  id="imageUrl"
  placeholder="https://images.unsplash.com/..."
  {...register("imageUrl")}
/>
```

This is friction-heavy:
- Users must find/upload images elsewhere
- No validation that image exists
- Relies on external hosting (broken links)

## Impact
- High barrier to creating recipes
- Broken images when external URLs fail
- Can't capture recipe photos immediately
- Poor mobile experience

## Proposed Solutions

### Option A: Convex File Storage
Convex has built-in file storage:
```typescript
// Upload
const url = await ctx.storage.store(file);

// Retrieve
const url = await ctx.storage.getUrl(storageId);
```

**Pros:**
- Native integration
- Automatic CDN
- No external dependencies

**Cons:**
- Storage limits on free tier
- Requires file upload handling

### Option B: Cloudflare R2 / S3
Use object storage with presigned URLs.

**Pros:**
- More storage options
- Cost control

**Cons:**
- Additional setup
- More complexity

### Option C: Third-party (Cloudinary, UploadThing)
**Pros:**
- Image optimization
- Transformations (thumbnails, etc.)

**Cons:**
- External dependency
- Additional cost

## Recommendation
**Option A - Convex File Storage**:
1. Already using Convex, simplest integration
2. Built-in CDN for fast loading
3. Automatic thumbnail generation (future)
4. Secure, user-scoped storage

## Implementation Details

### Backend (Convex)
```typescript
// recipes.ts
export const uploadImage = mutation({
  args: {
    recipeId: v.id('recipes'),
    contentType: v.string(),
  },
  handler: async (ctx, args) => {
    // Return signed URL for upload
    return await ctx.storage.store(args.contentType);
  },
});
```

### Frontend
- [ ] File input with drag-and-drop
- [ ] Image preview before upload
- [ ] Progress indicator
- [ ] Validation (file type, size)
- [ ] Automatic compression

### UI Features
- [ ] Drag & drop zone
- [ ] Camera capture (mobile)
- [ ] Multiple images (gallery)
- [ ] Image cropping/editing

## Acceptance Criteria

### MVP
- [ ] Implement file upload to Convex storage
- [ ] Replace Image URL input with file upload
- [ ] Update RecipeCard to use stored images
- [ ] Handle upload errors gracefully
- [ ] Support common formats: JPG, PNG, WebP

### Phase 2
- [ ] Image compression before upload
- [ ] Generate thumbnails for lists
- [ ] Support multiple images per recipe
- [ ] Lightbox/gallery view

## Priority
**High** - Critical UX improvement

## Estimated Effort
8-12 hours
