const path = require("path");

const webpack = require("webpack");
const { ESBuildPlugin, ESBuildMinifyPlugin } = require("esbuild-loader");
const { StatsWriterPlugin } = require("webpack-stats-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const mode =
  process.env.NODE_ENV === "development" ? "development" : "production";

/** @type {webpack.Configuration} */
const baseConfig = {
  mode,
  devtool: "source-map",
  optimization: {
    minimize: mode === "production",
    minimizer: [
      new ESBuildMinifyPlugin({
        target: "es2015",
      }),
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    fallback: {
      canvas: false,
    },
    alias: {
      "@forgo/head": path.resolve("./src/head.tsx"),
      "@forgo/lazy": path.resolve("./src/lazy.tsx"),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          require.resolve("./webpack/lazy-loader"),
          {
            loader: "esbuild-loader",
            options: {
              loader: "js",
              target: "es2015",
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: [
          require.resolve("./webpack/lazy-loader"),
          {
            loader: "ts-loader",
          },
        ],
      },
    ],
  },
  plugins: [new ESBuildPlugin(), new MiniCssExtractPlugin()],
};

/** @type {webpack.Configuration} */
const clientConfig = {
  ...baseConfig,
  entry: "./src/client.tsx",
  output: {
    path: path.resolve("./dist/client/static"),
    publicPath: "/static/",
  },
  module: {
    rules: [
      ...baseConfig.module.rules,
      {
        include: /\.module\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    ...baseConfig.plugins,
    new StatsWriterPlugin({
      filename: "stats.json",
      stats: {
        chunkGroups: true,
        publicPath: true,
      },
      transform(data, opts) {
        const assetsByChunkName = Object.keys(data.namedChunkGroups).reduce(
          (p, key) => {
            return {
              ...p,
              [key]: data.namedChunkGroups[key].assets.map(
                (asset) => asset.name
              ),
            };
          },
          {}
        );

        return JSON.stringify(
          {
            publicPath: data.publicPath,
            assetsByChunkName,
          },
          null,
          2
        );
      },
    }),
  ],
};

/** @type {webpack.Configuration} */
const serverConfig = {
  ...baseConfig,
  entry: {
    "dev-server": "./src/dev-server.ts",
    vercel: "./src/vercel.ts",
  },
  target: "node",
  output: {
    library: { type: "commonjs" },
    path: path.resolve("./dist/server"),
  },
  module: {
    rules: [
      ...baseConfig.module.rules,
      {
        include: /\.module\.css$/,
        use: {
          loader: "css-loader",
          options: {
            modules: { exportOnlyLocals: true },
          },
        },
      },
    ],
  },
};

module.exports = [clientConfig, serverConfig];
