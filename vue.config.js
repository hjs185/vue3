module.exports = {
  productionSourceMap: true,
  devServer: {
    proxy: {
      "/api": {
        target: "http://10.30.10.141:9060",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
