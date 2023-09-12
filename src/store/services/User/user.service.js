import axios from "axios";
import { API_BASE_URL, headers } from "../api.config";

const userApi = {
  userFilterOther: (searchToken) => {
    console.log("api userFilterOther");
    return axios.get(
      API_BASE_URL + `/users?where=name[like]${searchToken}&page=1&limit=10`,
      headers
    );
  },
  searchUserFriend: () => {
    console.log("api searchUserFriend");
    return axios.post(API_BASE_URL + "/auth/login", headers);
  },
};
export default userApi;
