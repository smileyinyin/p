const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}

// 项目部署基础
// 默认情况下，我们假设你的应用将被部署在域的根目录下,
// 例如：https://www.my-app.com/
// 默认：'/'
// 如果您的应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.foobar.com/my-app/
// 需要将它改为'/my-app/'
const BASE_URL = '/'

module.exports = {
  // Project deployment base
  // By default we assume your app will be deployed at the root of a domain,
  // e.g. https://www.my-app.com/
  // If your app is deployed at a sub-path, you will need to specify that
  // sub-path here. For example, if your app is deployed at
  // https://www.foobar.com/my-app/
  // then change this to '/my-app/'
  outputDir: process.env.outputDir || 'p_formal_dist',
  baseUrl: BASE_URL,
  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'))
      .set('_conf', resolve('config'))

    const svgRule = config.module.rule('svg')
    // clear all existing loaders.
    // if you don't do this, the loader below will be appended to
    // existing loaders of the rule.
    svgRule.uses.clear()
    // add replacement loader(s)
    svgRule
      .exclude
      .add(resolve('src/icons'))
      .end()
      .test(/\.(svg)(\?.*)?$/)
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: `img/[name].[hash:8].[ext]`
      })

    config.module
      .rule('svg-icon')
      .test(/\.svg$/)
      .include
      .add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
  // 打包时不生成.map文件
  // productionSourceMap: false,

  devServer: {
    historyApiFallback: true,
    proxy: {
      '/loginregister': {
        // target: 'http://dev.zuul.sxwhome.com',
        target: 'http://192.168.9.53:7093',
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '/loginregister': '/'
        }
      },
      '/aaaaa': {
        target: 'http://192.168.9.67:7096', // 'http://192.168.9.49:9122/',
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '/aaaaa': '/'
        }
      },
      '/sxwshop': {
        target: 'http://192.168.9.53:7096',
       // target: 'http://47.97.175.225:7092', // 'http://192.168.9.49:9122/',
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '/sxwshop': '/'
        }
      },
      '/partner': {
        target: 'http://192.168.9.67:7092',
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '/partner': '/'
        }
      },
      '/sxwUser': {
        target: 'http://192.168.9.53:7092',
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          'sxwUser': '/'
        }
      },
      '/sxwGoods': {
        // target: 'http://47.97.175.225:7000/',
        target: 'http://dev.zuul.sxwhome.com',
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          // '/sxwGoods': '/'
        }
      },
      '/supply': {
        target: 'http://192.168.9.53:7092',
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '/supply': '/'
        }
      },
      '/sxwOrder': {
        target: 'http://192.168.9.53:7092/',
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '/sxwOrder': '/'
        }
      },
      '/financial': {
        target: 'http://192.168.9.53:7095/',
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '/financial': '/'
        }
      },
      '/sxwactivity': {
        target: 'http://192.168.9.111:8083',
        // target: 'http://192.168.9.68:8083',
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '/sxwactivity': '/'
        }
      },
      '/sxwPos': {
        target: 'http://192.168.9.42:7098',
        // target: 'http://192.168.9.58:7098/',
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '/sxwPos': '/'
        }
      }
    //   '/posManager': {
    //     target: 'http://192.168.9.53:9098/',
    //     changeOrigin: true,
    //     ws: false,
    //     pathRewrite: {
    //       '/posManager': '/'
    //     }
    //   }
    }
  }
}
