import { Outlet, redirect, type LoaderFunctionArgs } from "react-router";
import { setLocale } from "~/paraglide/runtime";

// const SUPPORTED_LANGS = ["en", "vi"];

// export async function loader({ params }: LoaderFunctionArgs) {
//   const lang = params.lang;

//   if (!lang || !SUPPORTED_LANGS.includes(lang)) {
//     throw redirect("/en");
//   }

//   // Language is now set by paraglideMiddleware in root.tsx — no manual
//   // setLanguageTag() needed. The middleware uses AsyncLocalStorage for
//   // per-request isolation, safe under React 19 concurrent streaming SSR.

//   return { lang };
// }

export default function MarketingLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t py-8">
        <button
          onClick={() => setLocale("vi")}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Set language to Vietnamese
        </button>
        <button
          onClick={() => setLocale("en")}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Set language to English
        </button>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} App. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
