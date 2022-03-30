import { join } from 'path'
import { merge } from 'webpack-merge'
import common from './webpack.common'
import 'webpack-dev-server'

const config = merge(common(), {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  devServer: {
    static: {
      directory: join(__dirname, 'src'),
    },
    port: 4000,
    open: false
  }
})

export default config