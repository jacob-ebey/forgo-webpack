import { render } from "forgo";

import App from "./App";
import { createMatcher } from "./router";

const { nodes } = render(<App matcher={createMatcher(window)} />);
const forgoNode = document.getElementById("__forgo");

while (forgoNode?.hasChildNodes()) {
  if (forgoNode.firstChild) {
    forgoNode.removeChild(forgoNode.firstChild);
  }
}

nodes?.forEach((child) => forgoNode?.appendChild(child));
