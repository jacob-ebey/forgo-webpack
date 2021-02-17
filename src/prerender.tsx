import { createForgoInstance } from "forgo";

import App from "./App";
import { createMatcher } from "./router";

const { parseHTML } = require("linkedom");

async function prerender(url: string, stats: any) {
  const publicPath = stats?.publicPath || "/";
  const href = url.startsWith("http") ? url : `https://ssr.com${url}`;

  const { window, document, HTMLElement } = parseHTML(
    "<html><head></head><body></body></html>"
  );

  const preloadChunks = new Set<string>();
  let title = "";

  const createElement = document.createElement;
  document.createElement = function (...args: any) {
    const element = createElement.call(this, ...args);

    if (element?.setAttribute) {
      const setAttribute = element.setAttribute;
      element.setAttribute = function (...attrArgs: any) {
        const key = attrArgs?.[0];
        const value = attrArgs?.[1];

        if (key === "lazy-preload-chunkname") {
          preloadChunks.add(value);

          element.parentNode?.removeChild(element);
          return;
        }

        let handled = false;

        if (key === "head-title") {
          title = value;
          handled = true;
        }

        if (handled) {
          element.parentNode?.removeChild(element);
          return;
        }

        setAttribute.call(this, ...attrArgs);
      };
    }

    return element;
  };

  window.HTMLElement = HTMLElement;
  window.Text = document.createTextNode().constructor;
  window.location = { href };

  const matcher = createMatcher(window);

  const forgoInstance = createForgoInstance({ window, document });

  async function tryRender() {
    let retry = 0;
    let lastError;
    while (retry < 10) {
      retry++;

      try {
        return forgoInstance.render(<App matcher={matcher} />);
      } catch (error) {
        if (error?.then) {
          await error;
        } else {
          lastError = error;
        }
      }
    }

    throw lastError;
  }

  const { nodes } = await tryRender();

  const appHtml = nodes?.map((node) => node.toString()).join("") || "";

  const mainAssets: string[] = stats?.assetsByChunkName?.main || [];

  const chunkAssets: string[] = Array.from(
    new Set(
      Array.from(preloadChunks).reduce((p, chunk) => {
        return [...p, ...(stats?.assetsByChunkName?.[chunk] || [])];
      }, [] as string[])
    )
  );

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  ${chunkAssets
    .map(
      (chunk) =>
        `<link rel="preload" as="${
          chunk.endsWith(".js") ? "script" : "style"
        }" href="${publicPath}${chunk}"></script>`
    )
    .join("\n  ")}
  ${chunkAssets
    .filter((chunk) => chunk.endsWith(".css"))
    .map((chunk) => `<link rel="stylesheet" href="${publicPath}${chunk}">`)
    .join("\n  ")}
</head>
<body>
  <div id="__forgo">${appHtml}</div>
  ${mainAssets
    .filter((chunk) => chunk.endsWith(".js"))
    .map((chunk) => `<script src="${publicPath}${chunk}"></script>`)
    .join("\n  ")}
</body>
</html>`;

  return { html };
}

export default prerender;
