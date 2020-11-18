const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
module.exports = {
    // webpack.base.conf.js配置
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'windows.jQuery': 'jquery'
            }),
            // gzip插件
            new CompressionWebpackPlugin({
                algorithm: 'gzip',
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                threshold: 10240,
                minRatio: 0.8
            }),
        ],
        // 资源名称：main.js中引用的名称
        externals: {
            vue: 'Vue',
            'vue-router': 'VueRouter',
            vuex: 'Vuex',
            axios: 'axios',
            vuetify: 'Vuetify'
        }
    },
    devServer: {
        open: true,
        host: 'localhost',
        port: 8080,
        https: false,
        //以上的ip和端口是我们本机的;下面为需要跨域的
        proxy: { //配置跨域
            '/learning': {
                // target: 'http://localhost:8081',
                target: 'http://fujisann.ink',
                // target: 'http://39.101.206.66:80/',
                // target: 'https://www.easy-mock.com/mock/5f9cb3720bf9ee030094075b',
                ws: true,
                changOrigin: true //允许跨域
                //   pathRewrite: {
                //       '^/learning': ''//请求的时候使用这个api就可以
                //   }
            }

        }
    },
    // 修复edge不兼容vuetify.js
    transpileDependencies: ['vuetify'],
    // 允许运行时编译
    runtimeCompiler: true
}