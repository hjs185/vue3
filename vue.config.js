module.exports = {
  devServer: {
    proxy: {
      "/nlp": {
        target: "http://10.30.10.141:9060",
        changeOrigin: true
        // pathRewrite: {
        //   "^/nlp": "/nlp"
        // }
      }
    }
  }
};
