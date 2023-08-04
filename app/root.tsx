import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import stylesheet from "~/tailwind.css";
import { themeSessionResolver } from "./utils/session.server";
import {
  PreventFlashOnWrongTheme,
  ThemeProvider,
  useTheme,
} from "remix-themes";
import Navbar from "./components/Navbar";
import { ReactNode, useEffect, useState } from "react";
import { HelmetProvider } from "react-helmet-async";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export const loader = async ({ request }: LoaderArgs) => {
  const { getTheme } = await themeSessionResolver(request);

  return {
    theme: getTheme(),
    googleAnalyticsTrackingId: "G-W67JJJTSNL",
  };
};

export default function AppWithProvider() {
  const { theme } = useLoaderData<typeof loader>();

  return (
    <ThemeProvider specifiedTheme={theme} themeAction="/action/set-theme">
      <App />
    </ThemeProvider>
  );
}

function App() {
  const { theme } = useLoaderData<typeof loader>();
  const [themeX] = useTheme();

  return (
    <html lang="en" data-theme={themeX ?? ""}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(theme)} />
        <Links />

        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-W67JJJTSNL`}
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-W67JJJTSNL');
            `,
          }}
        ></script>
      </head>
      <body className="bg-white text-black dark:bg-slate-900 dark:text-white h-full selection:bg-slate-50 dark:selection:bg-slate-800">
        <Layout>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </Layout>
      </body>
    </html>
  );
}

function Layout({ children }: { children: ReactNode }) {
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <HelmetProvider>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">{children}</main>
      {/* Scroll to Top Button */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-4 right-4 p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-opacity duration-300 ${
            showScrollButton ? "opacity-100" : "opacity-0"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      )}
    </HelmetProvider>
  );
}
