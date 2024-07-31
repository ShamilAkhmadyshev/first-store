import httpService from "./httpService";

const userEndpoint = "user/";

const userService = {
  create: async (payload) => {
    const { data } = httpService.put(userEndpoint + payload._id, payload);
    return data;
  },
};

export default userService;
