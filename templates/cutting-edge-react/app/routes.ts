import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  // ── SSR Marketing routes  (language is part of the URL for SEO) ────────────
  // :lang? is optional — English lives at / with no prefix, Vietnamese at /vi/.
  // The loader in marketing/layout.tsx validates the segment and canonicalises
  // /en → / so search engines only index one URL per page.
  ...prefix(":locale?", [
    layout("routes/marketing/layout.tsx", [
      index("routes/marketing/landingPage.tsx"),
      // route("ui-preview", "routes/marketing/ui-preview.tsx"),
    ]),
  ]),

  // ── Auth routes  (CSR, no lang prefix) ────────────────────────────────────
  ...prefix("auth", [
    layout("routes/auth/layout.tsx", [route("login", "routes/auth/login.tsx")]),
  ]),

  // ── Dashboard routes  (CSR, protected) ────────────────────────────────────
  // layout("routes/dashboard/layout.tsx", [
  //   route("dashboard", "routes/dashboard/index.tsx"),
  // ]),
] satisfies RouteConfig;
