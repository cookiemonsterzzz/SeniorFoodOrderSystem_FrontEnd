import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiHeaders, paymentHostName } from "../../config";

export const upsertPayment = createAsyncThunk(
  "payment/upsertPayment",
  async (paymentDto) => {
    let token = "Bearer " + localStorage.getItem("token");
    const request = await axios.post(
      `${paymentHostName}api/Payment/upsertPayment`,
      paymentDto,
      {
        headers: { ...apiHeaders, Authorization: token },
      }
    );
    const response = await request.data;
    return response;
  }
);

const paymentUpsertSlice = createSlice({
  name: "paymentUpsert",
  initialState: {
    loading: false,
    order: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(upsertPayment.pending, (state) => {
        state.loading = true;
        state.order = null;
        state.error = null;
      })
      .addCase(upsertPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
        state.error = null;
      })
      .addCase(upsertPayment.rejected, (state, action) => {
        state.loading = false;
        state.order = null;
        state.error = "Couldn't proceed. Please Retry.";
      });
  },
});

export default paymentUpsertSlice.reducer;
