import { createSlice } from "@reduxjs/toolkit";
import { userFilterOtherAction } from "../actions/userAction";

const initialState = {
  user: {},
  userFilter: [],
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // userFilterOtherAction
    builder.addCase(userFilterOtherAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userFilterOtherAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userFilter = action.payload.data;
    });
    builder.addCase(userFilterOtherAction.rejected, (state, action) => {
      state.loading = false;
      console.log("error in slice: ", action.error.message);
      state.error = action.error.message;
    });
  },
});

export default userSlice.reducer;
