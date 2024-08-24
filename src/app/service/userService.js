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
    console.log(data);
    return data;
  },
};

export default userService;
