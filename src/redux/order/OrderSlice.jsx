import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiHeaders, orderHostName } from "../../config";

export const getOrderByID = createAsyncThunk(
  "order/getOrderByID",
  async (orderId) => {
    let token = "Bearer " + localStorage.getItem("token");
    const request = await axios.get(
      `${orderHostName}api/Order/getOrderById?orderId=${orderId}`,
      {
        headers: { ...apiHeaders, Authorization: token },
      }
    );
    const response = await request.data;
    return response;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    order: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByID.pending, (state) => {
        state.loading = true;
        state.order = null;
        state.error = null;
      })
      .addCase(getOrderByID.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
        state.error = null;
      })
      .addCase(getOrderByID.rejected, (state, action) => {
        state.loading = false;
        state.order = null;
        state.error = "Couldn't proceed. Please Retry.";
      });
  },
});

export default orderSlice.reducer;
