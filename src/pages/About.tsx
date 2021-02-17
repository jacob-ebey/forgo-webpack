import type { ForgoRenderArgs } from "forgo";

import Head from "@forgo/head";
import lazy from "@forgo/lazy";

import { Link } from "../router";

const Timer = lazy(() => import("../components/Timer"));

function About() {
  return {
    render(_: unknown, args: ForgoRenderArgs) {
      return (
        <main>
          <Head title="About Page" />

          <h1>About Page</h1>
          <Link href="/">Go to Home Page</Link>

          <Timer />
        </main>
      );
    },
  };
}

export default About;
