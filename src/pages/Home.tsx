import type { ForgoRenderArgs } from "forgo";

import Head from "@forgo/head";
import lazy from "@forgo/lazy";

import { Link } from "../router";

const Timer = lazy(() => import("../components/Timer"));

function Home() {
  return {
    render(_: unknown, args: ForgoRenderArgs) {
      return (
        <main id="home">
          <Head title="Home Page" />

          <h1>Home Page</h1>
          <Link href="/about">Go to About Page</Link>

          <Timer />
        </main>
      );
    },
  };
}

export default Home;
