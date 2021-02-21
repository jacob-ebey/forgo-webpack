import { rerender } from "forgo";
import type { ForgoRenderArgs } from "forgo";

import { Router } from "@forgo/router";
import type { Matcher } from "@forgo/router";

import Head from "@forgo/head";
import lazy, { error } from "@forgo/lazy";

import Contact from "./components/contact/contact";
import Header from "./components/header/header";

import "./styles/global.css";

const About = lazy(() => import("./pages/About"));
const ContactPage = lazy(() => import("./pages/Contact"));
const Home = lazy(() => import("./pages/Home"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Resume = lazy(() => import("./pages/Resume"));

type AppProps = {
  matcher: Matcher;
  onNotFound?: () => void;
};

function App(_: AppProps) {
  let popStateListener: () => void;
  let lastAppState: any;

  return {
    error: error(() => lastAppState),
    render({ matcher, onNotFound }: AppProps, args: ForgoRenderArgs) {
      lastAppState =
        typeof document === "undefined"
          ? null
          : document.getElementById("__forgo")?.firstElementChild?.innerHTML;

      if (typeof window !== "undefined") {
        if (popStateListener) {
          window.removeEventListener("popstate", popStateListener);
        }
        popStateListener = () => {
          rerender(args.element);
        };
        window.addEventListener("popstate", popStateListener);
      }

      const route =
        matcher.matchExactUrl("/", () => <Home />) ||
        matcher.matchUrl("/contact", () => <ContactPage />) ||
        matcher.matchUrl("/about", () => <About />) ||
        matcher.matchUrl("/resume", () => <Resume />);

      if (!route && onNotFound) {
        onNotFound();
      }

      return (
        <Router>
          <Head
            title="Jacob Ebey"
            tags={[
              {
                key: "charset",
                tag: "meta",
                attributes: {
                  charset: "UTF-8",
                },
              },
              {
                key: "description",
                tag: "meta",
                attributes: {
                  name: "description",
                  content:
                    "Welcome to my site! My name is Jacob Ebey and I do the codes and things.",
                },
              },
              {
                key: "viewport",
                tag: "meta",
                attributes: {
                  name: "viewport",
                  content: "width=device-width, initial-scale=1.0",
                },
              },
              {
                key: "http-equiv",
                tag: "meta",
                attributes: {
                  content: "IE=edge",
                  "http-equiv": "X-UA-Compatible",
                },
              },
              {
                key: "shortcut icon",
                tag: "link",
                attributes: {
                  rel: "shortcut icon",
                  href: "/static/favicon.ico",
                },
              },
              {
                key: "icon 16x16",
                tag: "link",
                attributes: {
                  rel: "icon",
                  type: "image/png",
                  sizes: "16x16",
                  href: "/static/favicon-16x16.png",
                },
              },
              {
                key: "icon 32x32",
                tag: "link",
                attributes: {
                  rel: "icon",
                  type: "image/png",
                  sizes: "32x32",
                  href: "/static/favicon-32x32.png",
                },
              },
              {
                key: "android icon 192x192",
                tag: "link",
                attributes: {
                  rel: "icon",
                  type: "image/png",
                  sizes: "192x192",
                  href: "/static/android-chrome-192x192.png",
                },
              },
              {
                key: "android icon 512x512",
                tag: "link",
                attributes: {
                  rel: "icon",
                  type: "image/png",
                  sizes: "512x512",
                  href: "/static/android-chrome-512x512.png",
                },
              },
              {
                key: "apple-touch-icon",
                tag: "link",
                attributes: {
                  rel: "apple-touch-icon",
                  type: "image/png",
                  href: "/static/apple-touch-icon.png",
                },
              },
            ]}
          />
          <Header />
          {route || <NotFound />}
          <Contact />
        </Router>
      );
    },
  };
}

export default App;
