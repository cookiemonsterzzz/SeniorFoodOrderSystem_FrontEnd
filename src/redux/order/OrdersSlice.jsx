import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiHeaders, orderHostName } from "../../config";

export const getOrders = createAsyncThunk("order/getOrders", async () => {
  let token = "Bearer " + localStorage.getItem("token");
  const request = await axios.get(`${orderHostName}api/Order/getOrders`, {
    headers: { ...apiHeaders, Authorization: token },
  });
  const response = await request.data;
  return response;
});

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    loading: false,
    order: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.order = null;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
        state.error = null;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.order = null;
        state.error = "Couldn't proceed. Please Retry.";
      });
  },
});

export default ordersSlice.reducer;
