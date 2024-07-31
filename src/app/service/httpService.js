import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../config.json";

const http = axios.create({
  baseURL: configFile.apiEndpoint,
});

http.interceptors.request.use(
  function (config) {
    const containSlash = /\/$/gi.test(config.url);
    config.url =
      (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (res) => {
    console.log(res);
    return res;
  },
  function (error) {
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;
    if (!expectedError) {
      toast.error("Something went wrong. Try again later");
    }
    return Promise.reject(error);
  }
);

const httpService = {
  get: http.get,
  put: http.put,
  delete: http.delete,
  post: http.post,
};

export default httpService;
