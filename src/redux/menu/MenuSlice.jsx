import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiHeaders, menuHostName } from "../../config";

export const getMenuWithPreferences = createAsyncThunk(
  "menu/getMenuWithPreferences",
  async () => {
    var token = "Bearer " + localStorage.getItem("token");
    const request = await axios.get(`${menuHostName}api/menu/getMenu`, {
      headers: { ...apiHeaders, Authorization: token },
    });
    const response = await request.data;
    return response;
  }
);

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    loading: false,
    menu: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMenuWithPreferences.pending, (state) => {
        state.loading = true;
        state.menu = null;
        state.error = null;
      })
      .addCase(getMenuWithPreferences.fulfilled, (state, action) => {
        state.loading = false;
        state.menu = action.payload;
        state.error = null;
      })
      .addCase(getMenuWithPreferences.rejected, (state, action) => {
        state.loading = false;
        state.menu = null;
        state.error = "Couldn't proceed. Please Retry.";
      });
  },
});

export default menuSlice.reducer;
