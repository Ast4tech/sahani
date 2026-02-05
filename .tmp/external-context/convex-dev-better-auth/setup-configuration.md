---
source: Context7 API + Official Docs
library: Convex Better Auth
package: @convex-dev/better-auth
topic: Component Setup and Configuration
fetched: 2025-02-04T00:00:00Z
official_docs: https://labs.convex.dev/better-auth
---

# @convex-dev/better-auth Component Configuration

## Prerequisites

- Convex 1.25.0 or later
- better-auth@1.4.9 (pinned version required)

## Installation

### Step 1: Install Packages

```bash
npm install convex@latest @convex-dev/better-auth
npm install better-auth@1.4.9 --save-exact
npm install @types/node --save-dev
```

**Important**: The `better-auth` version MUST be pinned to `1.4.9` with `--save-exact`.

### Step 2: Register Component in convex.config.ts

Create or update `convex/convex.config.ts`:

```typescript
import { defineApp } from "convex/server";
import betterAuth from "@convex-dev/better-auth/convex.config";

const app = defineApp();
app.use(betterAuth);

export default app;
```

### Step 3: Create Auth Config Provider

Create `convex/auth.config.ts`:

```typescript
import { getAuthConfigProvider } from "@convex-dev/better-auth/auth-config";
import type { AuthConfig } from "convex/server";

export default {
  providers: [getAuthConfigProvider()],
} satisfies AuthConfig;
```

### Step 4: Create Better Auth Configuration

Create `convex/auth.ts`:

```typescript
import { components } from "./_generated/api";
import { createClient, type GenericCtx } from "@convex-dev/better-auth";
import { convex, crossDomain } from "@convex-dev/better-auth/plugins";
import { betterAuth, type BetterAuthOptions } from "better-auth/minimal";
import { DataModel } from "./_generated/dataModel";
import authConfig from "./auth.config";

const siteUrl = process.env.SITE_URL!;

// Create the component client
export const authComponent = createClient<DataModel>(components.betterAuth, {
  verbose: false,
});

// Configure Better Auth options
export const createAuthOptions = (ctx: GenericCtx<DataModel>) => ({
  baseURL: siteUrl,
  trustedOrigins: [siteUrl],
  database: authComponent.adapter(ctx),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [
    crossDomain({ siteUrl }),
    convex({ authConfig }),
  ],
}) satisfies BetterAuthOptions;

// Export the createAuth function
export const createAuth = (ctx: GenericCtx<DataModel>) =>
  betterAuth(createAuthOptions(ctx));
```

### Step 5: Run Convex Dev

```bash
npx convex dev
```

This generates the necessary `_generated/` files including the `components` object.

## Local Installation (Advanced)

For customization, you can use a local component installation:

### 1. Create Component Definition

Create `convex/betterAuth/convex.config.ts`:

```typescript
import { defineComponent } from "convex/server";

const component = defineComponent("betterAuth");

export default component;
```

### 2. Update Main Config

Update `convex/convex.config.ts` to use local import:

```typescript
import { defineApp } from "convex/server";
import betterAuth from "./betterAuth/convex.config";

const app = defineApp();
app.use(betterAuth);

export default app;
```

## Common Issues

### "components.betterAuth is undefined"
- Ensure `npx convex dev` has run successfully
- Check that `convex.config.ts` exports the app as default
- Verify the import path is correct

### Type Errors with DataModel
- Run `npx convex dev` to regenerate types
- Ensure `@convex-dev/better-auth` is installed

### Environment Variables
- Components cannot access `process.env` directly in their functions
- Pass environment variables through the auth configuration

## Required Environment Variables

```env
SITE_URL=http://localhost:3000
# For social providers (optional):
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## File Structure

```
convex/
├── _generated/         # Auto-generated (do not edit)
├── convex.config.ts    # Main app config with app.use(betterAuth)
├── auth.config.ts      # Auth provider configuration
├── auth.ts             # Better Auth instance and options
└── ... other files
```
