import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
import { Type } from "@sinclair/typebox";

export default function (pi: ExtensionAPI) {
  // A list of public SearXNG instances.
  // We can rotate these or allow the user to configure one.
  const SEARXNG_INSTANCES = [
    "https://searx.be",
    "https://search.mdosch.de",
    "https://searx.fmac.xyz",
    "https://searx.work",
    "https://priv.au",
    "https://searx.info",
    "https://search.ononoki.org",
  ];

  pi.registerTool({
    name: "web_search",
    label: "Web Search",
    description: "Search the internet for documentation, news, or general information using a free, privacy-friendly aggregator.",
    parameters: Type.Object({
      query: Type.String({ description: "The search query" }),
      category: Type.Optional(Type.String({ 
        description: "Search category: 'general', 'it' (docs/code), 'science', 'news'",
        default: "general" 
      })),
    }),

    async execute(toolCallId, params, signal, onUpdate, ctx) {
      // Try instances until one works
      let lastError = "";
      
      for (const instance of SEARXNG_INSTANCES) {
        try {
          onUpdate?.({ content: [{ type: "text", text: `Searching via ${instance}...` }] });

          const url = new URL(`${instance}/search`);
          url.searchParams.set("q", params.query);
          url.searchParams.set("format", "json");
          url.searchParams.set("categories", params.category || "general");

          const response = await fetch(url.toString(), {
            signal: signal,
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            }
          });

          if (!response.ok) {
            throw new Error(`Instance ${instance} returned ${response.status}`);
          }

          const data: any = await response.json();
          
          if (!data.results || data.results.length === 0) {
            continue; // Try next instance
          }

          const results = data.results.slice(0, 8).map((r: any, i: number) => {
            return `### [${i + 1}] ${r.title}\nURL: ${r.url}\n${r.content || "No snippet available."}\n`;
          }).join("\n---\n\n");

          return {
            content: [{ type: "text", text: `Found results for: "${params.query}"\n\n${results}` }],
            details: { results: data.results },
          };

        } catch (error: any) {
          lastError = error.message;
          continue;
        }
      }

      return {
        content: [{ type: "text", text: `Search failed on all instances. Last error: ${lastError}` }],
        isError: true,
      };
    },
  });

  pi.registerCommand("search", {
    description: "Perform a free web search",
    handler: async (args, ctx) => {
      if (!args) {
        ctx.ui.notify("Please provide a search query", "error");
        return;
      }
      pi.sendUserMessage(`Search for "${args}" using the web_search tool.`);
    },
  });
}
