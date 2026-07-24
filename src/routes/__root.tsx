import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { LEGAL_NAME, BASE_URL, GA4_MEASUREMENT_ID } from "@/lib/site";
import { ORGANIZATION_JSONLD, LOCALBUSINESS_JSONLD, WEBSITE_JSONLD } from "@/lib/schema";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#020203] px-4 text-neutral-200">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-light text-white">404</h1>
        <h2 className="mt-4 text-xl font-light">Page not found</h2>
        <p className="mt-2 text-sm text-neutral-500">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-5 py-2 text-xs font-mono uppercase tracking-widest text-black hover:bg-cyan-300"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#020203] px-4 text-neutral-200">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-light">This page didn't load</h1>
        <p className="mt-2 text-sm text-neutral-500">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-5 py-2 text-xs font-mono uppercase tracking-widest text-black hover:bg-cyan-300"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-2 text-xs font-mono uppercase tracking-widest text-neutral-300 hover:border-cyan-400/50 hover:text-cyan-300"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

const TITLE = "360° Virtual Tour & Digital Twin Experts Malaysia | Novo Reperio";
const DESCRIPTION =
  "Matterport digital twins, 360° virtual tours & drone capture in Kuala Lumpur. Trusted by Hyatt, KLCC, Porsche & 400+ clients since 2014.";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "author", content: LEGAL_NAME },
      { property: "og:site_name", content: "Novo Reperio" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: BASE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "theme-color", content: "#020203" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(ORGANIZATION_JSONLD),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(WEBSITE_JSONLD),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(LOCALBUSINESS_JSONLD),
      },
      // GA4 loader — TODO replace G-XXXXXXXXXX in src/lib/site.ts
      {
        src: `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`,
        async: true,
      },
      {
        children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA4_MEASUREMENT_ID}');`,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
