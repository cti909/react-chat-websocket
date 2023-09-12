import { createSlice } from "@reduxjs/toolkit";
import {
  loginAction,
  logoutAction,
  registerAction,
  setUserAction,
} from "../actions/authAction";

const initialState = {
  user: {},
  isLogin: false,
  isRegister: false,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // login
    builder.addCase(loginAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.data;
      state.isLogin = true;
      localStorage.setItem("accessToken", action.payload.meta.accessToken);
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      state.loading = false;
      console.log("error in slice: ", action.error.message);
      state.error = action.error.message;
    });
    // logout
    builder.addCase(logoutAction.fulfilled, (state) => {
      console.log("logout");
      state.isLogin = false;
      state.user = {};
      state.loading = false;
      state.error = null;
    });
    // register
    builder.addCase(registerAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerAction.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.data;
      state.isRegister = true;
      state.isLogin = true;
    });
    builder.addCase(registerAction.rejected, (state, action) => {
      state.loading = false;
      console.log(action.error);
      state.error = action.error.message;
    });
    // setUser
    builder.addCase(setUserAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(setUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.data;
      state.isRegister = false;
      state.isLogin = true;
    });
    builder.addCase(setUserAction.rejected, (state, action) => {
      state.loading = false;
      console.log(action.error);
      state.error = action.error.message;
    });
  },
});

export default authSlice.reducer;
