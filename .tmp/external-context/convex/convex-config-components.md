---
source: Context7 API + Official Docs
library: Convex
package: convex
topic: convex.config.ts and Components Configuration
fetched: 2025-02-04T00:00:00Z
official_docs: https://docs.convex.dev/components/using
---

# Convex Components Configuration (convex.config.ts)

## Overview

Convex Components add new features to your backend in their own sandbox with their own functions, schema, data, scheduled functions, and all other fundamental Convex features.

## Installation Steps

### 1. Install from npm

```bash
npm i @convex-dev/your-component
```

### 2. Create/Update convex.config.ts

Create or update the `convex.config.ts` file in your app's `convex/` folder:

```typescript
// convex/convex.config.ts
import { defineApp } from "convex/server";
import yourComponent from "@your-component/convex.config";

const app = defineApp();
app.use(yourComponent);

export default app;
```

### 3. Run convex dev

```bash
npx convex dev
```

The CLI will generate code necessary for using the component.

### 4. Access the component through its API

```typescript
import { components } from "./_generated/api.js";
// Use components.yourComponent...
```

## Multiple Component Instances

You can install multiple instances of the same component by calling `use` multiple times with different names:

```typescript
import { defineApp } from "convex/server";
import agent from "@convex-dev/agent/convex.config.js";

const app = defineApp();
app.use(agent);
app.use(agent, { name: "agent2" });

export default app;
```

Each instance will have their own tables and functions.

## Common Configuration Patterns

### Using Multiple Components

```typescript
import { defineApp } from "convex/server";
import betterAuth from "@convex-dev/better-auth/convex.config";
import agent from "@convex-dev/agent/convex.config";
import workpool from "@convex-dev/workpool/convex.config";

const app = defineApp();
app.use(betterAuth);
app.use(agent);
app.use(workpool);

export default app;
```

### Local Components

For local components, import from a relative path:

```typescript
import { defineApp } from "convex/server";
import myComponent from "./components/myComponent/convex.config.js";

const app = defineApp();
app.use(myComponent);

export default app;
```

## Key Points

- The `convex.config.ts` file MUST be in your `convex/` folder
- Always export the app as `default`
- Each component gets its own isolated sandbox with its own schema
- Components called from queries are reactive by default
- Components called from mutations have the same transaction guarantees

## Troubleshooting

### Component Not Found
- Ensure the npm package is installed
- Check the import path matches the package's export

### Generated Code Missing
- Run `npx convex dev` to regenerate `_generated/` files
- The `components` object is generated in `_generated/api.js`

### Type Errors
- Ensure you're using Convex 1.25.0 or later for components
- Check that the component version is compatible with your Convex version
