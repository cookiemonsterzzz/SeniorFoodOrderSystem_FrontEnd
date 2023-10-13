import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiHeaders, orderHostName } from "../../config";

export const upsertOrder = createAsyncThunk(
  "order/upsertOrder",
  async (orderDto) => {
    let token = "Bearer " + localStorage.getItem("token");
    const request = await axios.post(
      `${orderHostName}api/Order/upsertOrder`,
      orderDto,
      {
        headers: { ...apiHeaders, Authorization: token },
      }
    );
    const response = await request.data;
    return response;
  }
);

const orderUpsertSlice = createSlice({
  name: "orderUpsert",
  initialState: {
    loading: false,
    order: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(upsertOrder.pending, (state) => {
        state.loading = true;
        state.order = null;
        state.error = null;
      })
      .addCase(upsertOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
        state.error = null;
      })
      .addCase(upsertOrder.rejected, (state, action) => {
        state.loading = false;
        state.order = null;
        state.error = "Couldn't proceed. Please Retry.";
      });
  },
});

export default orderUpsertSlice.reducer;
