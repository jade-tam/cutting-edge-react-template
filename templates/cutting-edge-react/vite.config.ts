import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    paraglideVitePlugin({
      project: "./project.inlang",
      outdir: "./app/paraglide",
      strategy: ["url", "cookie", "baseLocale"],
      // Follow this https://inlang.com/m/gerre34r/library-inlang-paraglideJs/strategy#route-level-strategy-overrides
      routeStrategies: [
        { match: "/dashboard/:path(.*)?", strategy: ["cookie", "baseLocale"] },
        { match: "/auth/:path(.*)?", strategy: ["cookie", "baseLocale"] },
        { match: "/api/:path(.*)?", exclude: true },
      ],
    }),
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
  ],
});
