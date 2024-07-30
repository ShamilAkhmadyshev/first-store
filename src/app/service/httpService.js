import axios from "axios";
import { toast } from "react-toastify";

const http = axios.create({
  baseURL: configFile.apiEndpoint,
});

http.interceptors.response.use(
  (res) => {
    return res;
  },
  function (error) {
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;
    if (!expectedError) {
      toast.error("Something went wrong. Try again later");
      console.log(error);
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
