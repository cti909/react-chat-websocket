import axios from "axios";
import { API_BASE_URL, headers } from "../api.config";

const authApi = {
  login: (email, password) => {
    console.log("api login");
    const postData = {
      email: email,
      password: password,
    };
    return axios.post(API_BASE_URL + "/auth/login", postData, headers);
  },
  register: async (name, email, password, phone_number, address) => {
    console.log("api register");
    const postData = {
      name: name,
      email: email,
      password: password,
      phone_number: phone_number,
      address: address,
    };
    const response = await axios.post(
      API_BASE_URL + "/auth/register",
      postData,
      headers
    );
    return response;
  },
  setUser: async () => {
    console.log("api setUser");
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(API_BASE_URL + "/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  },
};
export default authApi;
