const path = require("path");

const { Parser } = require("acorn");
const walk = require("acorn-walk");
const { generate } = require("@jacob-ebey/astring");

const parser = Parser.extend();

function lazyLoader(source, sourceMap) {
  const callback = this.async();
  // TODO: Make the chunkId determanistic per imported file, not parent then import
  const requestSplit = this.request.split("!");
  const requestPath = path.relative(
    process.cwd(),
    requestSplit[requestSplit.length - 1]
  );
  const chunkNamePrefix = "lazy_" + requestPath.replace(/[\\\/:\.]/g, "_");

  const ast = parser.parse(source, {
    sourceType: "module",
    ecmaVersion: "latest",
    locations: true,
  });

  const lazyCalls = [];
  const lazyNames = new Set();
  walk.simple(ast, {
    ImportDeclaration(node) {
      if (node.source.value === "@forgo/lazy" && node.specifiers) {
        node.specifiers.forEach((specifier) => {
          if (specifier.type === "ImportDefaultSpecifier") {
            lazyNames.add(specifier.local.name);
          }
        });
      }
    },
    CallExpression(node) {
      if (!node.callee || !lazyNames.has(node.callee.name)) {
        return;
      }

      if (node.arguments.length > 2) {
        throw new Error("lazy must contain less than two arguments");
      }

      const imported = new Set();

      walk.simple(node, {
        ImportExpression(node) {
          if (node.source && node.source.value) {
            imported.add(node.source.value);
          }
        },
      });

      if (imported.size === 0) {
        return;
      }

      if (imported.size > 1) {
        return callback(
          "Can not use more than 1 dynamic import inside of lazy."
        );
      }

      const chunkName = `${chunkNamePrefix}${Array.from(imported)[0].replace(
        /[\\\/:\.]/g,
        "_"
      )}`;

      if (node.arguments.length === 1) {
        node.arguments.push({
          type: "ObjectExpression",
          properties: [],
        });

        node.arguments[1].properties.push({
          type: "Property",
          method: false,
          shorthand: false,
          computed: false,
          key: {
            type: "Identifier",
            name: "chunkName",
          },
          value: {
            type: "Literal",
            value: chunkName,
          },
          kind: "init",
        });
      }

      node.chunkName = chunkName;

      lazyCalls.push(node);
    },
  });

  if (lazyCalls.length > 0) {
    const sortedLazyCalls = lazyCalls.sort((a, b) => b.start - a.start);

    const newCode = sortedLazyCalls.reduce((p, call) => {
      const callString = generate(call).replace(
        "import(",
        `import(/* webpackChunkName: '${call.chunkName}' */ `
      );
      const start = p.slice(0, call.start);
      const end = p.slice(call.end, p.length);
      return start + callString + end;
    }, source);

    callback(null, newCode, sourceMap);
    return;
  }

  callback(null, source, sourceMap);
}

module.exports = lazyLoader;
