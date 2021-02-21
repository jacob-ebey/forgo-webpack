const { StatsWriterPlugin } = require("webpack-stats-plugin");

class LazyStatsPlugin {
  apply(compiler) {
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
    }).apply(compiler);
  }
}

module.exports = LazyStatsPlugin;
