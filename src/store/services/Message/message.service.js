import axios from "axios";
import { API_BASE_URL, authHeaders, headers } from "../api.config";

const messageAPI = {
  sentMessage: (content, path, senderId, conversationId) => {
    console.log("api sentMessage");
    const postData = {
      content: content,
      path: path,
      sender_id: senderId,
      conversation_id: conversationId,
    };
    console.log(postData);
    return axios.post(API_BASE_URL + `/messages`, postData, authHeaders);
  },
};

export default messageAPI;
