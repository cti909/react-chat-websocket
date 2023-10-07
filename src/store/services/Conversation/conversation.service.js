import axios from "axios";
import { API_BASE_URL, authHeaders, headers } from "../api.config";

const conversationApi = {
  getAllConversationHaveMessages: (memberId) => {
    console.log("api getAllConversationHaveMessages");
    return axios.get(
      API_BASE_URL + `/conversations/all?member_id=${memberId}`,
      authHeaders
    );
  },
  getConversation: (conversationId) => {
    console.log("api getConversation");
    return axios.get(
      API_BASE_URL + `/conversations/${conversationId}`,
      authHeaders
    );
  },
  getAllConversationPublic: (memberId) => {
    console.log("api getAllConversationPublic");
    return axios.get(
      API_BASE_URL + `/conversations/all?member_id=${memberId}&type=public`,
      authHeaders
    );
  },
  createConversationPublic: (name, memberCount, userList) => {
    console.log("api getAllConversationPublic");
    const postData = {
      name: name,
      member_count: memberCount,
      type: "public",
      user_list: userList,
    };
    console.log(postData);
    return axios.post(API_BASE_URL + `/conversations`, postData, authHeaders);
  },
};

export default conversationApi;
