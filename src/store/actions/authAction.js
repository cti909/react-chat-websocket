import { createAsyncThunk } from "@reduxjs/toolkit";
import { LOGIN, LOGOUT, REGISTER, SET_USER } from "../actionConstants";
import authApi from "../services/Auth/auth.service";

export const loginAction = createAsyncThunk(
  LOGIN,
  async ({ email, password }) => {
    try {
      const response = await authApi.login(email, password);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      throw new Error(error.response.data.message);
    }
  }
);
export const logoutAction = createAsyncThunk(LOGOUT, () => {
  const response = localStorage.removeItem("accessToken");
  return response;
});
export const registerAction = createAsyncThunk(
  REGISTER,
  async ({ name, email, password, phone_number, address }) => {
    try {
      const response = await authApi.register(
        name,
        email,
        password,
        phone_number,
        address
      );
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      const errorList = error.response.data.message;
      const values = Object.values(errorList);
      let errorString = "";
      for (let i = 0; i < values.length; i++) {
        for (let j = 0; j < values[i].length; j++) {
          errorString += values[i][j];
        }
      }
      console.log(errorString);
      throw new Error(errorString);
    }
  }
);
export const setUserAction = createAsyncThunk(SET_USER, async () => {
  const response = await authApi.setUser();
  return response.data;
});
