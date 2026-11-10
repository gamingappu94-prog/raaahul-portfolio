// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// Never set ssr.external or resolve.external: the Worker has no runtime module resolution, so
// the build fails. Never add compression (compressPublicAssets, vite-plugin-compression):
// hosting already compresses at the edge.
// Ensure local dev server proxies asset requests to Lovable preview host
process.env["LOVABLE_PREVIEW_HOST"] ||= "id-preview--bceb1d56-1722-47c4-a2a8-c51a9991c5a5.lovable.app";

import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    // Pre-bundle UI deps up front so Vite never re-optimizes mid-session
    // (a late re-optimization mixes React copies and crashes with "reading 'useCallback'").
    optimizeDeps: {
      include: [
        "@radix-ui/react-slot",
        "@radix-ui/react-label",
        "class-variance-authority",
        "clsx",
        "tailwind-merge",
        "lucide-react",
      ],
    },
  },
});
