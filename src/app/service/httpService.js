import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../config.json";

const http = axios.create({
  baseURL: configFile.apiEndpoint,
});

http.interceptors.request.use(
  async function (config) {
    const containSlash = /\/$/gi.test(config.url);
    config.url =
      (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
    // if (refreshToken && expiresDate < Date.now()) {
    //   const { data } = await httpAuth.post("token", {
    //     grant_type: "refresh_token",
    //     refresh_token: refreshToken,
    //   });
    //   localStorageService.setTokens({
    //     refreshToken: data.refresh_token,
    //     expiresDate: data.expires_in,
    //     idToken: data.id_token,
    //     localId: data.user_id,
    //   });
    // }
    // const accessToken = localStorage.getItem("jwt-token");
    // if (accessToken) {
    //   config.params = { ...config.params, auth: accessToken };
    // }
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
