import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  CREATE_CONVERSATION,
  GET_ALL_CONVERSATION_HAVE_MESSAGES,
  GET_ALL_CONVERSATION_PUBLIC,
  GET_ALL_MESSAGES,
  SENT_MESSAGE,
} from "../actionConstants";
import conversationApi from "../services/Conversation/conversation.service";
import messageAPI from "../services/Message/message.service";

export const getAllConversationHaveMessageAction = createAsyncThunk(
  GET_ALL_CONVERSATION_HAVE_MESSAGES,
  async ({ memberId }) => {
    try {
      const response = await conversationApi.getAllConversationHaveMessages(
        memberId
      );
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      throw new Error(error.response.data.message);
    }
  }
);

export const getConversationAction = createAsyncThunk(
  GET_ALL_MESSAGES,
  async ({ conversationId }) => {
    try {
      const response = await conversationApi.getConversation(conversationId);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      throw new Error(error.response.data.message);
    }
  }
);

export const getAllConversationPublic = createAsyncThunk(
  GET_ALL_CONVERSATION_PUBLIC,
  async ({ memberId }) => {
    try {
      const response = await conversationApi.getAllConversationPublic(memberId);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      throw new Error(error.response.data.message);
    }
  }
);

export const createConversationPublicAction = createAsyncThunk(
  CREATE_CONVERSATION,
  async ({ name, memberCount, userList }) => {
    try {
      const response = await conversationApi.createConversationPublic(
        name,
        memberCount,
        userList
      );
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      throw new Error(error.response.data.message);
    }
  }
);

export const sentMessageAction = createAsyncThunk(
  SENT_MESSAGE,
  async ({ content, path, senderId, conversationId }) => {
    try {
      const response = await messageAPI.sentMessage(
        content,
        path,
        senderId,
        conversationId
      );
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      throw new Error(error.response.data.message);
    }
  }
);
