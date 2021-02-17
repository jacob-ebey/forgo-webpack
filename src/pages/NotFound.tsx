import type { ForgoRenderArgs } from "forgo";

import { Link } from "../router";

function NotFound() {
  return {
    render(_: unknown, args: ForgoRenderArgs) {
      return (
        <main>
          <h1>404 Page</h1>
          <Link href="/">Go to Home Page</Link>
        </main>
      );
    },
  };
}

export default NotFound;
