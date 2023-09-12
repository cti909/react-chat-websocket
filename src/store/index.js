import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import customMiddleware from "./middwares/customMiddleware";
import thunk from "redux-thunk";
import userSlice from "./features/userSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
  },
  middleware: [thunk],
});
