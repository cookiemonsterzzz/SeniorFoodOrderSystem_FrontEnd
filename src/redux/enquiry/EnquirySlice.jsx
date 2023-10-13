import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiHeaders, menuHostName } from "../../config";

export const addEnquiry = createAsyncThunk(
  "enquiry/addEnquiry",
  async (enquiryDto) => {
    let token = "Bearer " + localStorage.getItem("token");
    const request = await axios.post(
      `${menuHostName}api/enquiry/addEnquiry`,
      enquiryDto,
      {
        headers: { ...apiHeaders, Authorization: token },
      }
    );
    const response = await request.data;
    return response;
  }
);

const enquirySubmitSlice = createSlice({
  name: "enquirySubmit",
  initialState: {
    loading: false,
    enquiry: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addEnquiry.pending, (state) => {
        state.loading = true;
        state.enquiry = null;
        state.error = null;
      })
      .addCase(addEnquiry.fulfilled, (state, action) => {
        state.loading = false;
        state.enquiry = action.payload;
        state.error = null;
      })
      .addCase(addEnquiry.rejected, (state, action) => {
        state.loading = false;
        state.enquiry = null;
        state.error = "Couldn't proceed. Please Retry.";
      });
  },
});

export default enquirySubmitSlice.reducer;
