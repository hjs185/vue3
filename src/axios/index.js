import axios from "axios";

const Axios = (url, value, type = "post") => {
  return axios({
    method: type,
    // url:
    //   process.env["NODE_ENV"] === "development"
    //     ? url
    //     : `http://10.30.10.141:9060${url}`,
    url: `/api${url}`,
    data: {
      params: JSON.stringify(value)
    },
    transformRequest: [
      function (data) {
        let ret = "";
        for (let it in data) {
          // 如果 data[it] 是一个对象, 需要先使用 JSON.stringify, 再使用 encode
          ret +=
            encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
        }
        ret = ret.substring(0, ret.lastIndexOf("&"));
        return ret;
      }
    ],
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
};

export { Axios };
