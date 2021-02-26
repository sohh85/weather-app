module.exports = {

    publicPath: process.env.NODE_ENV === 'production'
        ? '/weather-app/'
        : '/',

    configureWebpack: {
        devServer: {
            proxy: {
                '/api': {
                    target: 'https://www.metaweather.com',
                }
            }
        }
    }
}