import { createAsyncThunk } from "@reduxjs/toolkit";
import { SEARCH_OTHER_USER } from "../actionConstants";
import userApi from "../services/User/user.service";

export const userFilterOtherAction = createAsyncThunk(
  SEARCH_OTHER_USER,
  async ({ searchToken }) => {
    try {
      const response = await userApi.userFilterOther(searchToken);
      const responseData = {
        searchToken: searchToken,
        responseData: response.data,
      };
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      throw new Error(error.response.data.message);
    }
  }
);
