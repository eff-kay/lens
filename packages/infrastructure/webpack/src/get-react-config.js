const getNodeConfig = require("./get-node-config");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports =
  ({ miniCssExtractPluginLoader = MiniCssExtractPlugin.loader } = {}) =>
  ({ entrypointFilePath, outputDirectory }) => {
    const nodeConfig = getNodeConfig({
      entrypointFilePath,
      outputDirectory,
    });
    return {
      ...nodeConfig,

      plugins: [
        ...nodeConfig.plugins,

        new MiniCssExtractPlugin({
          filename: "[name].css",
        }),
      ],

      module: {
        ...nodeConfig.module,

        rules: [
          ...nodeConfig.module.rules,

          {
            test: /\.s?css$/,

            use: [
              miniCssExtractPluginLoader,

              {
                loader: "css-loader",

                options: {
                  sourceMap: false,

                  modules: {
                    auto: /\.module\./i, // https://github.com/webpack-contrib/css-loader#auto
                    mode: "local", // :local(.selector) by default
                    localIdentName: "[name]__[local]--[hash:base64:5]",
                  },
                },
              },

              {
                loader: "postcss-loader",
                options: {
                  sourceMap: false,
                  postcssOptions: {
                    plugins: ["tailwindcss"],
                  },
                },
              },

              {
                loader: "sass-loader",
                options: {
                  sourceMap: false,
                },
              },
            ],
          },

          {
            test: /\.(ttf|eot|woff2?)$/,
            type: "asset/resource",
          },

          {
            test: /\.svg$/,
            type: "asset/source", // exports the source code of the asset, so we get XML
          },

          {
            test: /\.(jpg|png|ico)$/,
            type: "asset/resource",
          },
        ],
      },
    };
  };
