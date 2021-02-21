const fs = require("fs");
const path = require("path");

const webpack = require("webpack");
const { ESBuildPlugin, ESBuildMinifyPlugin } = require("esbuild-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const CopyPlugin = require("copy-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const LazyStatsPlugin = require("./webpack/lazy-stats-plugin");

const mode =
  process.env.NODE_ENV === "development" ? "development" : "production";

/** @type {webpack.Configuration} */
const baseConfig = {
  mode,
  devtool: mode !== "development" ? "source-map" : "inline-cheap-source-map",
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
      "@forgo/router": path.resolve("./src/router.tsx"),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!linkedom)/,
        use: [
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
        exclude: /node_modules/,
        use: [
          require.resolve("./webpack/lazy-loader"),
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ESBuildPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
};

/** @type {webpack.Configuration} */
const clientConfig = {
  ...baseConfig,
  entry: "./src/client.tsx",
  output: {
    path: path.resolve("./dist/client/static"),
    publicPath: "/static/",
  },
  cache: {
    type: "filesystem",
    name: mode,
    cacheDirectory: path.resolve(process.cwd(), ".webpack/client"),
  },
  module: {
    rules: [
      ...baseConfig.module.rules,
      {
        test: /\.(gif|svg)$/i,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
          },
        },
      },
      {
        test: /\.(png|jpe?g)$/i,
        use:
          mode === "production"
            ? [
                {
                  loader: "file-loader",
                  options: {
                    name: "[name].[ext]",
                  },
                },
                {
                  loader: "webpack-image-resize-loader",
                  options: {
                    width: 1000,
                  },
                },
              ]
            : {
                loader: "file-loader",
                options: {
                  name: "[name].[ext]",
                },
              },
      },
      {
        include: /\.module\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              importLoaders: 1,
              modules: true,
            },
          },
          "postcss-loader",
        ],
      },
      {
        include: /\.css$/,
        exclude: /\.module\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              importLoaders: 1,
            },
          },
          "postcss-loader",
        ],
      },
    ],
  },
  plugins: [
    ...baseConfig.plugins,
    new webpack.DefinePlugin({
      "process.env.GATSBY_VERCEL_ANALYTICS_ID": JSON.stringify(
        process.env.GATSBY_VERCEL_ANALYTICS_ID || ""
      ),
    }),
    new CopyPlugin({
      patterns: [{ from: "static", to: "." }],
    }),
    new LazyStatsPlugin(),
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
  cache: {
    type: "filesystem",
    name: mode,
    cacheDirectory: path.resolve(process.cwd(), ".webpack/server"),
  },
  module: {
    rules: [
      ...baseConfig.module.rules,
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            publicPath: "/static/",
            emitFile: false,
          },
        },
      },
      {
        include: /\.css$/,
        use: {
          loader: "css-loader",
          options: {
            sourceMap: true,
            modules: { exportOnlyLocals: true },
          },
        },
      },
    ],
  },
};

if (mode === "production" && process.env.ANALYZE === "true") {
  clientConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = [clientConfig, serverConfig];
