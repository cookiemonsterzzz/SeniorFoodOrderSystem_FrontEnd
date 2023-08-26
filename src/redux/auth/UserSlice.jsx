import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { hostName } from "../../config";

export const loginWithPhoneNo = createAsyncThunk(
  "auth/loginWithPhoneNo",
  async (phoneNo) => {
    const request = await axios.post(`${hostName}api/auth/login`, phoneNo);
    const response = await request.data.data;
    localStorage.setItem("user", JSON.stringify(response));
    return response;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithPhoneNo.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(loginWithPhoneNo.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginWithPhoneNo.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        console.log(action.error.message);
        state.error = "Couldn't proceed. Please Retry.";
      });
  },
});

export default userSlice.reducer;
