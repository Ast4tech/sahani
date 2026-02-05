import { TanStackDevtools } from "@tanstack/react-devtools";
import {
  HeadContent,
  Link,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import ConvexProvider from "../integrations/convex-provider/provider";

import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";

import appCss from "../styles.css?url";

import type { QueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ChefHat, Home } from "lucide-react";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "sahani | Smart Meal Planning",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/icon?family=Material+Icons",
      },
    ],
  }),

  shellComponent: RootDocument,
  notFoundComponent: NotFoundPage,
});

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center p-6 font-['Manrope',sans-serif]">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="relative inline-block">
          <div className="w-32 h-32 bg-[#13EC5B]/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
            <ChefHat className="w-16 h-16 text-[#13EC5B]" />
          </div>
          <div className="absolute -top-2 -right-2 bg-[#EF4444] text-white text-xs font-black px-3 py-1 rounded-full shadow-lg">
            404
          </div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl font-black text-[#1A1A1A] tracking-tight">
            Oops! This recipe is missing.
          </h1>
          <p className="text-[#4A5568] font-medium leading-relaxed">
            It looks like the page you're looking for has been taken off the menu or never existed. Don't let your hunger for planning go to waste!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button asChild className="flex-1 h-14 bg-[#13EC5B] hover:bg-[#10B981] text-[#1A1A1A] font-black text-lg rounded-2xl shadow-lg shadow-[#13EC5B]/20 transition-all">
            <Link to="/">
              <Home className="w-5 h-5 mr-2" />
              Go Back Home
            </Link>
          </Button>
          <Button asChild variant="outline" className="flex-1 h-14 border-[#E2E8F0] text-[#4A5568] font-bold text-lg rounded-2xl bg-white hover:bg-[#F8F9FA]">
            <Link to="/meal-planner">
              My Planner
            </Link>
          </Button>
        </div>

        <div className="pt-12">
          <div className="flex items-center justify-center gap-2 text-[#A0AEC0]">
            <div className="w-8 h-8 bg-[#13EC5B] rounded-lg flex items-center justify-center">
              <span className="material-icons text-white text-xs">
                restaurant_menu
              </span>
            </div>
            <span className="font-bold text-sm tracking-tight">sahani</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <ConvexProvider>
          {children}
          <TanStackDevtools
            config={{
              position: "bottom-right",
            }}
            plugins={[
              {
                name: "Tanstack Router",
                render: <TanStackRouterDevtoolsPanel />,
              },
              TanStackQueryDevtools,
            ]}
          />
        </ConvexProvider>
        <Scripts />
      </body>
    </html>
  );
}
