// vite.config.mts
import { defineConfig } from "vite";
import { redwood } from "rwsdk/vite";

export default defineConfig(({ command, ssrBuild }: any) => {
  const isServerBuild = command === "build" && ssrBuild; // Detect SSR/server mode precisely

  return {
    plugins: [redwood()],
    resolve: {
      conditions: isServerBuild
        ? ["react-server", "worker", "node", "import", "module", "default"] // Prioritize react-server for SSR
        : ["browser", "module", "import", "default"], // Client: browser-first
      mainFields: isServerBuild
        ? ["module", "main"]
        : ["browser", "module", "main"],
    },
    build: {
      manifest: !ssrBuild, // Client manifest
      ssrManifest: ssrBuild, // Server SSR manifest
      rollupOptions: {
        external: [
          "cloudflare:workers", // Existing external
          /react-server-only\.js$/, // Externalize the guard file to skip it
        ],
      },
    },
    // Debug logging for resolution
    logLevel: "info",
  } as any;
});
