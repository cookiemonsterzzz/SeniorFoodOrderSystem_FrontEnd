import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiHeaders, hostName } from "../../config";

export const loginWithPhoneNo = createAsyncThunk(
  "auth/loginWithPhoneNo",
  async (phoneNo) => {
    const request = await axios.post(
      `${hostName}api/Auth/loginwithphone`,
      `"${phoneNo}"`,
      {
        headers: apiHeaders,
      }
    );
    const response = await request.data;
    localStorage.setItem("token", response);
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
        state.error = "Couldn't proceed. Please Retry.";
      });
  },
});

export default userSlice.reducer;
