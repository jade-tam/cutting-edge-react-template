import type { Config } from "@react-router/dev/config";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  // return a list of URLs to prerender at build time
  async prerender() {
    return ["/", "/about", "/contact"];
  },
  // Follow https://inlang.com/m/gerre34r/library-inlang-paraglideJs/react-router#server-side-rendering-using-middleware
  future: {
    v8_middleware: true,
  },
} satisfies Config;
