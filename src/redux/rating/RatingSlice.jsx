import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiHeaders, orderHostName } from "../../config";

export const upsertRating = createAsyncThunk(
  "rating/upsertRating",
  async (ratingDto) => {
    let token = "Bearer " + localStorage.getItem("token");
    const request = await axios.post(
      `${orderHostName}api/StallRating`,
      ratingDto,
      {
        headers: { ...apiHeaders, Authorization: token },
      }
    );
    const response = await request.data;
    return response;
  }
);

const ratingUpsertSlice = createSlice({
  name: "ratingUpsert",
  initialState: {
    loading: false,
    rating: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(upsertRating.pending, (state) => {
        state.loading = true;
        state.rating = null;
        state.error = null;
      })
      .addCase(upsertRating.fulfilled, (state, action) => {
        state.loading = false;
        state.rating = action.payload;
        state.error = null;
      })
      .addCase(upsertRating.rejected, (state, action) => {
        state.loading = false;
        state.rating = null;
        state.error = "Couldn't proceed. Please Retry.";
      });
  },
});

export default ratingUpsertSlice.reducer;
