module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/weather-app/'
        : '/',
    // devServer: {
    //     proxy: {
    //         "https://www.metaweather.com": {
    //             target: "http://localhost:8080",
    //         }
    //     }
    // }
}
