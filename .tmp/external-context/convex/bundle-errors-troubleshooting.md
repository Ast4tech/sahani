---
source: Context7 API + Official Docs + Community Research
library: Convex
package: convex
topic: Bundle Errors and Troubleshooting (including "wrong number of app bundles")
fetched: 2025-02-04T00:00:00Z
official_docs: https://docs.convex.dev/functions/bundling
---

# Convex Bundle Errors and Troubleshooting

## "Wrong Number of App Bundles" Error

This error typically occurs when the Convex CLI's bundling process finds an unexpected number of entry points or configuration files during the build.

### Common Causes

1. **Multiple convex.config.ts files in wrong locations**
   - There should only be ONE `convex.config.ts` in your `convex/` folder
   - Component definitions should NOT be in the root `convex/` folder

2. **Incorrect component structure**
   - When using local components, they should be in subdirectories (e.g., `convex/components/myComponent/`)
   - Each component has its own `convex.config.ts` using `defineComponent`

3. **Mixed local and npm component imports**
   - Don't import from both `@convex-dev/package/convex.config` AND a local path for the same component

4. **Stale generated files**
   - Old `_generated/` files can cause conflicts

### Solutions

#### 1. Clean and Regenerate

```bash
# Remove generated files
rm -rf convex/_generated

# Clear node_modules and reinstall
rm -rf node_modules
npm install

# Restart convex dev
npx convex dev
```

#### 2. Verify convex.config.ts Structure

Your main `convex/convex.config.ts` should look like:

```typescript
import { defineApp } from "convex/server";
import betterAuth from "@convex-dev/better-auth/convex.config";

const app = defineApp();
app.use(betterAuth);

export default app;
```

**NOT** using `defineComponent` (that's for authoring components, not using them).

#### 3. Check for Duplicate Config Files

Ensure you don't have:
- `convex.config.ts` in project root (should only be in `convex/`)
- Multiple `convex.config.ts` files at the same level
- A local component definition conflicting with npm import

#### 4. Debug Bundling

For more detailed bundling info:

```bash
npx convex dev --once --debug-node-apis
```

This uses a slower bundling method but provides more detailed error information.

## Other Common Bundle Errors

### Node.js-Specific Import Errors

If you see errors about `fs`, `node:fs`, or other Node.js APIs:

```bash
npx convex dev --once --debug-node-apis
```

This will trace which import is causing the issue.

### Module Resolution Issues

- Check that all dependencies are installed
- Ensure ESM/CJS compatibility
- Use `.js` extension in imports for TypeScript files (ESM convention)

## Bundling Overview

When running `npx convex dev` or `npx convex deploy`:

1. CLI uses `esbuild` to traverse your `convex/` folder
2. Bundles your functions and dependencies
3. Sends the bundle to the Convex server

The bundling process supports both ESM and CJS syntax.

## Best Practices

1. **Keep convex/ folder clean** - Only Convex-related code
2. **Use consistent import patterns** - Either npm imports OR local, not both for same package
3. **Check Convex CLI version** - Keep `convex` package up to date
4. **Single source of truth** - One `convex.config.ts` using `defineApp()` in `convex/`
