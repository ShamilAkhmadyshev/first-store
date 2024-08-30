import httpService from "./httpService";

const userEndpoint = "user/";

const userService = {
  create: async (payload) => {
    const { data } = await httpService.put(userEndpoint + payload._id, payload);
    return data;
  },
  getCurrentUser: async () => {
    const { data } = await httpService.get(
      userEndpoint + localStorage.getItem("user-local-id")
    );
    return data;
  },
  update: async (payload) => {
    const { data } = await httpService.patch(
      userEndpoint + payload._id,
      payload
    );
    return data;
  },
};

export default userService;
