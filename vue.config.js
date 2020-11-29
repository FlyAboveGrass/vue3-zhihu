module.exports = {
    devServer: {
        port: 8000,
        open: true,
        proxy: {
            '/api': {
                target: 'http://apis.imooc.com',
                changeOrigin: true
            }
        }
    }
}
    