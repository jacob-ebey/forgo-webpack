import type { ForgoRenderArgs } from "forgo";
import { Router } from "./router";
import type { Matcher } from "./router";

import lazy from "@forgo/lazy";

const About = lazy(() => import("./pages/About"));
const Home = lazy(() => import("./pages/Home"));
const NotFound = lazy(() => import("./pages/NotFound"));

type AppProps = {
  matcher: Matcher;
};

function App(_: AppProps) {
  return {
    render({ matcher }: AppProps, args: ForgoRenderArgs) {
      const route =
        matcher.matchExactUrl("/", () => <Home />) ||
        matcher.matchUrl("/about", () => <About />);

      return <Router>{route || <NotFound />}</Router>;
    },
  };
}

export default App;
