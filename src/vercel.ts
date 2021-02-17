import type { NowRequest, NowResponse } from "@vercel/node";

import prerender from "./prerender";

// @ts-ignore
const stats = __non_webpack_require__("../client/static/stats.json");

async function handler(req: NowRequest, res: NowResponse) {
  try {
    const { html, status } = await prerender(req.url || "/", stats);

    res.status(status);
    res.write(html);
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500);
    res.write(`Internal Server Error: ${error.message}`);
    res.end();
  }
}

export default handler;
