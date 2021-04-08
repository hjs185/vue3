module.exports = {
  devServer: {
    proxy: {
      "/nlp": {
        target: "http://192.168.1.201:9060",
        changeOrigin: true
        // pathRewrite: {
        //   "^/nlp": "/nlp"
        // }
      }
    }
  }
};
