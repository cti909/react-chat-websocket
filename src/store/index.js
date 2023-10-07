import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import customMiddleware from "./middwares/customMiddleware";
import thunk from "redux-thunk";
import userSlice from "./features/userSlice";
import conversationSlice from "./features/conversationSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    conversation: conversationSlice,
  },
  middleware: [thunk],
});
