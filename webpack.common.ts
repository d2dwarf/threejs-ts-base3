import { Configuration } from 'webpack'
import { join, resolve } from 'path'
import HTMLWebpackPlugin from 'html-webpack-plugin'

const config = (): Configuration => ({
  entry: {
    app: join(__dirname, 'src', 'entry.ts')
  },
  output: {
    path: join(__dirname, 'dist'),
    filename: './js/[name].js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?/,
        use: 'ts-loader'
      },
      {
        test: /\.(glsl|vert|frag)$/,
        use: 'webpack-glsl-loader'
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: join(__dirname, 'public', 'index.html'),
      title: 'threejs+ts+base5',
      filename: 'index.html',
      scriptLoading: 'defer'
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    },
    extensions: [
      '.ts', '.tsx', '.js', '.jsx', '.css', '.scss', '.sass'
    ]
  }
})

export default config