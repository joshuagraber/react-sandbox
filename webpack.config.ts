import path from 'path';
import webpack, { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const webpackConfig = <T extends { production: boolean; development: boolean }>(
  env: T
): Configuration => ({
  entry: './src/index.tsx',
  ...(env.production || !env.development ? {} : { devtool: 'eval-source-map' }),
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [new TsconfigPathsPlugin()],
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'build.js',
  },
  module: {
    rules: [
      {
        test: /\.sa?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.jpe?g|png|svg$/,
        exclude: /node_modules/,
        use: ['url-loader', 'file-loader'],
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
        exclude: /dist/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env.PRODUCTION': env.production || !env.development,
    }),
    new ForkTsCheckerWebpackPlugin(),
    new ESLintPlugin({ files: './src/**/*.{ts,tsx,js,jsx}' }),
    new MiniCssExtractPlugin(),
  ],
});

export default webpackConfig;
