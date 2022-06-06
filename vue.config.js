module.exports = {
    transpileDependencies: [],
    //配置跨域代理
    devServer: {
        // Paths
        // host: 'localhost',
        // port: '8080',
        // https: false,
        open: true,
        proxy: {
            '/api/economylife/sutdentlab': { // 匹配所有以 '/api'开头的请求路径
                target: 'http://42.192.1.101:9527', // 代理目标的基础路径
                changeOrigin: true, // 支持跨域
                pathRewrite: { // 重写路径: 去掉路径中开头的'/api'
                    '^/api/economylife/sutdentlab': '/api/economylife/sutdentlab'
                }
            },
    
        },

        /*
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Origin-Type': '*',
        }
        */
    }
};
