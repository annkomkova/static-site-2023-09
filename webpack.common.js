const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const SitemapPlugin = require('sitemap-webpack-plugin').default
const StaticSourceData = require('static-source-data')

const webpack = require('webpack')
const path = require('path')

const paths = [
  '/',
  '/spaceobjects.html/',
  '/spaceobjects/moon.html/',
  '/spaceships.html/',
  '/spaceships/buran.html/'
]

module.exports = {
  entry: {
    index: './src/index.js',
    theory: './src/theory.js',
    adaptive: './src/adaptive.js',
    dictionary: './src/dictionary.js',
    jsbasic: './src/jsbasic.js',
    select: './src/select.js',
    select2: './src/select2.js',
    slider: './src/slider.js',
    searchVanilla: './src/search-vanilla.js',
    reactBasics: './src/react-basics.jsx',
    narkomfin: './src/narkomfin.js',
    menuBar: './src/menubar.jsx',
    search: './src/search.jsx'
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'docs')
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env']]
              }
            }
          }
        ]
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        resourceQuery: /raw/,
        type: 'asset/source'
      },
      {
        test: /\.(png|svg|jpeg|jpg|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[hash][ext][query]'
        }
      },
      {
        test: /\.(ttf|otf|woff|woff2)$/i,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new StaticSourceData({
      // testData: 'https://catfact.ninja/fact',
      indexData: {
        url: 'https://api.airtable.com/v0/appePrphSXY2TX8TD/teasers',
        headers: {
          Authorization:
            'Bearer pat7rZ3bNn1doX7yx.e3a053db849dbc90266ee4437df084f90e6a245c626138ea6a63c9859661b5c9'
        }
      }
    }),
    new SitemapPlugin({ base: 'https://adc.ac.com', paths }),
    new CopyPlugin({
      patterns: [
        // {
        //   from: path.resolve(__dirname, 'src/share/'),
        //   to: path.resolve(__dirname, 'dev_build/share')
        // },
        {
          from: path.resolve(__dirname, 'src/images/colors/'),
          to: path.resolve(__dirname, 'dev_build/images/colors')
        },
        {
          from: path.resolve(__dirname, 'src/images/colors/'),
          to: path.resolve(__dirname, 'docs/images/colors')
        },
        {
          from: path.resolve(__dirname, 'src/model-narkomfin'),
          to: path.resolve(__dirname, 'dev_build/model-narkomfin')
        },
        {
          from: path.resolve(__dirname, 'src/model-narkomfin'),
          to: path.resolve(__dirname, 'docs/model-narkomfin')
        },
        {
          from: path.resolve(__dirname, 'src/model-drone'),
          to: path.resolve(__dirname, 'dev_build/model-drone')
        },
        {
          from: path.resolve(__dirname, 'src/model-drone'),
          to: path.resolve(__dirname, 'docs/model-drone')
        }
      ]
    }),

    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css'
    }),

    // React
    new HtmlWebpackPlugin({
      template: './src/react-basics.html',
      filename: './react-basics.html',
      chunks: ['reactBasics']
    }),
    // Three
    new HtmlWebpackPlugin({
      template: './src/narkomfin.html',
      filename: './narkomfin.html',
      chunks: ['narkomfin']
    }),
    // select
    new HtmlWebpackPlugin({
      template: './src/select.html',
      filename: './select.html',
      chunks: ['select']
    }),
    new HtmlWebpackPlugin({
      template: './src/select2.html',
      filename: './select2.html',
      chunks: ['select2']
    }),

    // jsbasic chunk
    new HtmlWebpackPlugin({
      template: './src/jsbasic.html',
      filename: './jsbasic.html',
      chunks: ['jsbasic']
    }),

    // slider chunk
    new HtmlWebpackPlugin({
      template: './src/slider.html',
      filename: './slider.html',
      chunks: ['slider']
    }),

    // Dictionary chunk
    new HtmlWebpackPlugin({
      template: './src/dictionary.html',
      filename: './dictionary.html',
      chunks: ['dictionary']
    }),

    // Adaptive chunk
    new HtmlWebpackPlugin({
      template: './src/adaptive.html',
      filename: './adaptive.html',
      chunks: ['adaptive']
    }),

    // search
    new HtmlWebpackPlugin({
      template: './src/search-vanilla.html',
      filename: './search-vanilla.html',
      chunks: ['searchVanilla', 'menuBar']
    }),
    new HtmlWebpackPlugin({
      template: './src/search.html',
      filename: './search.html',
      chunks: ['search', 'menuBar']
    }),

    // Theory chunk
    new HtmlWebpackPlugin({
      template: './src/theory.html',
      filename: './theory.html',
      chunks: ['theory']
    }),

    // Index chunk
    new HtmlWebpackPlugin({
      template: './src/index.ejs',
      filename: './index.html',
      chunks: ['index', 'menuBar', 'search']
    }),

    //Section
    new HtmlWebpackPlugin({
      template: './src/about.html',
      filename: './about.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      template: './src/spaceobjects.ejs',
      filename: './spaceobjects.html',
      chunks: ['index', 'menuBar']
    }),
    new HtmlWebpackPlugin({
      template: './src/spaceships.ejs',
      filename: './spaceships.html',
      chunks: ['index', 'menuBar']
    }),
    new HtmlWebpackPlugin({
      template: './src/responsive-images.html',
      filename: './responsive-images.html',
      chunks: ['index']
    }),

    // Article
    new HtmlWebpackPlugin({
      template: './src/spaceobjects/moon.ejs',
      filename: './spaceobjects/moon.html',
      chunks: ['index', 'menuBar']
    }),
    new HtmlWebpackPlugin({
      template: './src/spaceships/buran.ejs',
      filename: './spaceships/buran.html',
      chunks: ['index', 'menuBar']
    }),

    // Partials
    new HtmlWebpackPartialsPlugin([
      {
        path: path.join(__dirname, './src/partials/analytics.html'),
        location: 'analytics',
        template_filename: '*',
        priority: 'replace'
      }
    ]),
    new HtmlWebpackPartialsPlugin([
      {
        path: path.join(__dirname, './src/partials/menubar.html'),
        location: 'menubar',
        template_filename: '*',
        priority: 'replace'
      }
    ])
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin()]
  }
}
