const path = require("path");
const tsNameof = require("ts-nameof");

const { whenProd, whenDev } = require("@craco/craco");

const CircularDependencyPlugin = require("circular-dependency-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const CracoEsbuildPlugin = require("craco-esbuild");

const ImageminPlugin = require("imagemin-webpack-plugin").default;
const imageminGifsicle = require("imagemin-gifsicle");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminOptipng = require("imagemin-optipng");
const imageminSvgo = require("imagemin-svgo");

module.exports = {
  webpack: {
    alias: {
      ...this.alias,
      "@api": path.resolve(__dirname, "src/api/"),
      "@app": path.resolve(__dirname, "src/app/"),
      "@utils": path.resolve(__dirname, "src/utils/"),
      "@hooks": path.resolve(__dirname, "src/hooks/"),
      "@models": path.resolve(__dirname, "src/app/models/"),
      "@config": path.resolve(__dirname, "src/config/"),
      "@shared": path.resolve(__dirname, "src/app/components/shared/"),
      "@stores": path.resolve(__dirname, "src/app/stores/"),
      "@Pages": path.resolve(__dirname, "src/app/components/Pages/"),
    },
    configure: {
      module: {
        rules: [
          {
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            use: [
              {
                loader: require.resolve("ts-loader"),
                options: {
                  transpileOnly: true,
                  getCustomTransformers: () => ({ before: [tsNameof] }),
                },
              },
            ],
          },
        ],
      },
    },
    plugins: [
      // ...whenProd(() => [new BundleAnalyzerPlugin()], []),
      ...whenProd(
        () => [
          new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i,
            imageminOptions: {
              plugins: [
                imageminGifsicle({
                  interlaced: true,
                }),
                imageminJpegtran({
                  progressive: true,
                }),
                imageminOptipng({
                  optimizationLevel: 5,
                }),
                imageminSvgo({
                  removeViewBox: true,
                }),
              ],
            },
          }),
        ],
        []
      ),

      // ...whenDev(() => [new CircularDependencyPlugin({
      //     exclude: /a\.js|node_modules/,
      // })], [])
    ],
  },
  plugins: [{ plugin: CracoEsbuildPlugin }],
};
