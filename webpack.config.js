const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: ['babel-polyfill', './src/main.js'],
  output: {
    path: path.join(__dirname, './dist/'), // 这里必须是绝对路径
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  plugins: [
    // 该插件的所用就是把 index.html 打包到你的 bundle.js 文件所属目录
    // 也就是说 bundle 到哪里，index.html 就到哪里
    // 同时这个也会自动在 index.html 中出入 script 引用连接
    // 而且引用的资源名称，也取决于你的 bundle 叫什么
    // 这个插件还可以配置压缩 html 的处理
    new htmlWebpackPlugin({
      template: './index.html'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  // devServer 不仅仅用于开发阶段的服务器，而且还可以提供代理服务能力
  devServer: {
    // 配置 webpack-dev-server 的 www 目录
    // 浏览器真正运行查看的是打包之后的结果
    // webpack-dev-server 为了提高打包效率，它把文件存储在了内存中，你看不见
    // 这里你只是在告诉 webpack-dev-server 让你的打包结果运行在虚拟目录 dist 中
    // 那这个时候你的打包结果中的 index.html 去加载资源时候确实需要相对于 dist 来找
    // ./ 的话，webpack-dev-server 就会直接把资源打包到项目根目录下
    // 但是注意：你也看不见它
    // 那这个时候你在 index.html 文件中请求的资源就是相对于 demo7 根目录
    // ./ 在这里就是 dev-server 的 www 目录
    contentBase: './',
    hot: true,
    proxy: {
      // 当你的请求路径是以 /api 开头的时候，则我帮你代理访问到 http://localhost:3000
      // 例如：
      //    /api/users http://localhost:3000/api/users
      //  我们真实接口服务器的路由路径是没有 /api 的
      //  有些比较复杂的业务，数据可能是从多个不同端口的不同域名来的
      "/api": {
        target: "http://localhost:3000",
        pathRewrite: { "^/api": "" } // 你别直接把 /api/users 给我往目标路径去拼接，而是把 /api/users 中的 /api 给我去除再拼接
      }
    }
  },
  externals: {
    // key 就是包名
    // value 是全局的 jQuery 导出的接口
    vue: 'Vue',
    'vue-router': 'VueRouter',
    axios: 'axios',
    lodash: '_'
  },
  module: {
    rules: [{
        test: /.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /.(jpg|png|gif|svg)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /.less$/,
        use: [
          'style-loader', // 3. 根据模块生成 style 节点插入 head 中
          'css-loader', // 2. 在把 css 转成 JavaScript 模块
          'less-loader' // 1. 先把 less 转成 css，less-loader 依赖 less，所以 less 也要安装进来
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['env'],
            plugins: ['transform-runtime']
          }
        }
      },
      {
        test: /.vue$/,
        // vue-loader 还依赖了 vue-template-compiler
        use: [
          'vue-loader'
        ]
      }
    ]
  }
}
