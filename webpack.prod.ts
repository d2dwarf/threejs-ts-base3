import { merge } from 'webpack-merge'
import common from './webpack.common'
import MiniCSSExtractPlugin from 'mini-css-extract-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import TerserWebpackPlugin from 'terser-webpack-plugin'

const config = merge(common(), {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [MiniCSSExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCSSExtractPlugin({
      filename: './css/[name].css'
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     { from: 'public/images', to: 'images' },
    //     { from: 'src/images', to: 'images' }
    //   ]
    // })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({})
    ],
    splitChunks: {
      name: 'chunk-vendors',
      chunks: 'initial'
    }
  },
  performance: {
    maxEntrypointSize: 1024 * 1024 * 10,
    maxAssetSize: 1024 * 1024 * 10
  }
})

export default config