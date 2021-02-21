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

  window.HTMLElement = HTMLElement;
  window.Text = document.createTextNode().constructor;
  window.location = { href };

  const matcher = createMatcher(window);

  const forgoInstance = createForgoInstance({ window, document });

  let status = 200;
  async function tryRender() {
    let retry = 0;
    let lastError;
    while (retry < 10) {
      retry++;
      status = 200;

      try {
        return forgoInstance.render(
          <App
            matcher={matcher}
            onNotFound={() => {
              status = 404;
            }}
          />
        );
      } catch (error) {
        document.head.innerHTML = "";

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

  let head = document.head.toString() as string;
  head = head.substring(6, head.length - 7);

  const preloadChunks: Set<string> = document.__FORGO_LAZY__ || new Set();
  const chunkAssets: string[] = Array.from(
    new Set(
      Array.from(preloadChunks).reduce((p, chunk) => {
        return [...p, ...(stats?.assetsByChunkName?.[chunk] || [])];
      }, [] as string[])
    )
  );

  const preloadTags = [...chunkAssets, ...mainAssets]
    .map(
      (chunk) =>
        `<link rel="preload" as="${
          chunk.endsWith(".js") ? "script" : "style"
        }" href="${publicPath}${chunk}"></script>`
    )
    .join("");

  const styleLinks = [...chunkAssets, ...mainAssets]
    .filter((chunk) => chunk.endsWith(".css"))
    .map((chunk) => `<link rel="stylesheet" href="${publicPath}${chunk}">`)
    .join("");

  const mainScriptTags = mainAssets
    .filter((chunk) => chunk.endsWith(".js"))
    .map((chunk) => `<script src="${publicPath}${chunk}"></script>`)
    .join("");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>${head}${preloadTags}${styleLinks}</head>
<body>
  <div id="__forgo">${appHtml}</div>
  ${mainScriptTags}
</body>
</html>`;

  return { html, status };
}

export default prerender;
