import { convexClient } from "@convex-dev/better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

// Auth requests go to same-origin /api/auth/* which proxies to Convex
// via the TanStack Start handler using convexBetterAuthReactStart
// This ensures users are created in Convex's Better Auth tables
export const authClient = createAuthClient({
	plugins: [convexClient()],
});
