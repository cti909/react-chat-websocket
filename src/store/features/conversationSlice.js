import { createSlice } from "@reduxjs/toolkit";
import {
  createConversationPublicAction,
  getAllConversationHaveMessageAction,
  getAllConversationPublic,
  getConversationAction,
  sentMessageAction,
} from "../actions/conversationAction";

const initialState = {
  conversationList: [],
  conversationDetail: {
    memberInformation: [],
    conversationInformation: [],
    messageList: [],
  },
  loading: false,
  error: null,
};

export const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // getAllConversationHaveMessageAction
    builder.addCase(getAllConversationHaveMessageAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getAllConversationHaveMessageAction.fulfilled,
      (state, action) => {
        state.loading = false;
        state.conversationList = action.payload.data;
      }
    );
    builder.addCase(
      getAllConversationHaveMessageAction.rejected,
      (state, action) => {
        state.loading = false;
        console.log("error in slice: ", action.error.message);
        state.error = action.error.message;
      }
    );
    // getConversationAction
    builder.addCase(getConversationAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getConversationAction.fulfilled, (state, action) => {
      state.loading = false;
      state.conversationDetail.memberInformation =
        action.payload.data.user_list;
      state.conversationDetail.conversationInformation =
        action.payload.data.conversation;
      state.conversationDetail.messageList = action.payload.data.message_list;
    });
    builder.addCase(getConversationAction.rejected, (state, action) => {
      state.loading = false;
      console.log("error in slice: ", action.error.message);
      state.error = action.error.message;
    });
    // getAllConversationPublic
    builder.addCase(getAllConversationPublic.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllConversationPublic.fulfilled, (state, action) => {
      state.loading = false;
      state.conversationList = action.payload.data;
    });
    builder.addCase(getAllConversationPublic.rejected, (state, action) => {
      state.loading = false;
      console.log("error in slice: ", action.error.message);
      state.error = action.error.message;
    });
    // createConversationPublic
    builder.addCase(createConversationPublicAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      createConversationPublicAction.fulfilled,
      (state, action) => {
        state.loading = false;
        state.conversationList = [
          ...state.conversationList,
          action.payload.data,
        ];
      }
    );
    builder.addCase(
      createConversationPublicAction.rejected,
      (state, action) => {
        state.loading = false;
        console.log("error in slice: ", action.error.message);
        state.error = action.error.message;
      }
    );
    // sentMessage
    builder.addCase(sentMessageAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(sentMessageAction.fulfilled, (state, action) => {
      state.loading = false;
      // xuli
    });
    builder.addCase(sentMessageAction.rejected, (state, action) => {
      state.loading = false;
      console.log("error in slice: ", action.error.message);
      state.error = action.error.message;
    });
  },
});

export default conversationSlice.reducer;
