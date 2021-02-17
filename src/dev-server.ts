import * as http from "http";
import type { RequestListener } from "http";
import * as fs from "fs";
import * as path from "path";

import prerender from "./prerender";

const staticBasePath = path.resolve(__dirname, "../client");
const statsPath = path.resolve(staticBasePath, "static/stats.json");

const serveStatic: RequestListener = function (req, res) {
  const resolvedBase = path.resolve(staticBasePath);
  const safeSuffix = path
    .normalize(req.url || "")
    .replace(/^(\.\.[\/\\])+/, "");
  const fileLoc = path.join(resolvedBase, safeSuffix);

  fs.readFile(fileLoc, function (err, data) {
    if (err) {
      res.writeHead(404, "Not Found");
      res.write("404: File Not Found!");
      return res.end();
    }

    res.statusCode = 200;

    res.write(data);
    return res.end();
  });
};

const listener: RequestListener = async (req, res) => {
  if (req.url?.match(/\.\w+$/)) {
    return serveStatic(req, res);
  }

  try {
    const stats = JSON.parse(fs.readFileSync(statsPath, "utf-8"));

    const { html } = await prerender(req.url || "/", stats);

    res.statusCode = 200;
    res.write(html);
    return res.end();
  } catch (error) {
    console.error(error);
    res.writeHead(500, "Internal Server Error");
    res.write(`Internal Server Error: ${error.message}`);
    return res.end();
  }
};

const server = http.createServer(listener).listen(3000);
const address = server.address();
if (typeof address === "string") {
  console.log(`App started on ${address}`);
} else {
  console.log(`App started on port ${address?.port}`);
}
