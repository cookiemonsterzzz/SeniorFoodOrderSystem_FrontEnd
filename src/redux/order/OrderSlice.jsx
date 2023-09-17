import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiHeaders, hostName } from "../../config";

export const getOrderById = createAsyncThunk(
  "order/getOrderByID",
  async (orderID) => {
    let token = "Bearer " + localStorage.getItem("token");
    // const request = await axios.post(
    //   `${hostName}api/order/getOrder?OrderId=${orderID}`,
    //   undefined,
    //   {
    //     headers: { ...apiHeaders, Authorization: token },
    //   }
    // );
    // const response = await request.data;
    const response = {
      OrderId: "99912",
      Total: 10,
    };
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
      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
        state.order = null;
        state.error = null;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
        state.error = null;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.loading = false;
        state.order = null;
        state.error = "Couldn't proceed. Please Retry.";
      });
  },
});

export default orderSlice.reducer;
