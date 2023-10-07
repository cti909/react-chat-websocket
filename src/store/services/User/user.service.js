import axios from "axios";
import { API_BASE_URL, authHeaders, headers } from "../api.config";

const userApi = {
  friendInvitation: (type) => {
    console.log("api friendInvitation");
    return axios.get(API_BASE_URL + `/friends?type=${type}`, authHeaders);
  },

  userFilter: (searchToken) => {
    console.log("api userFilter");
    return axios.get(
      API_BASE_URL + `/users?where=name[like]${searchToken}&page=1&limit=10`,
      authHeaders
    );
  },
  friendFilter: (searchToken) => {
    console.log("api friendFilter");
    return axios.get(
      API_BASE_URL + `/friends/all?status=accept&infor=${searchToken}`,
      authHeaders
    );
  },
};
export default userApi;
