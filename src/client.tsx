import { render } from "forgo";

import { createMatcher } from "@forgo/router";

import App from "./App";

function Client() {
  return {
    render() {
      return <App matcher={createMatcher(window)} />;
    },
  };
}

const { nodes } = render(<Client />);
const forgoNode = document.getElementById("__forgo");

while (forgoNode?.hasChildNodes()) {
  if (forgoNode.firstChild) {
    forgoNode.removeChild(forgoNode.firstChild);
  }
}

nodes?.forEach((child) => forgoNode?.appendChild(child));

import("./web-vitals").then(({ webVitals }) => {
  webVitals();
});
