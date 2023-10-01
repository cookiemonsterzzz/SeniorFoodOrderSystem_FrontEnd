import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiHeaders, menuHostName } from "../../config";

export const getMenuWithPreferences = createAsyncThunk(
  "menu/getMenuWithPreferences",
  async () => {
    let token = "Bearer " + localStorage.getItem("token");
    const request = await axios.get(
      `${menuHostName}api/menu/getMenu`,
      undefined,
      {
        headers: { ...apiHeaders, Authorization: token },
      }
    );
    const response = await request.data;
    // const response = [
    //   {
    //     stallName: "Stall 1",
    //     rating: 4,
    //     foods: [
    //       {
    //         foodName: "Chicken Burger",
    //         price: 10,
    //         foodCustomization: [
    //           {
    //             name: "more chilies",
    //             price: 0,
    //           },
    //           {
    //             name: "no chilies",
    //             price: 0,
    //           },
    //         ],
    //         image:
    //           "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2799&q=80",
    //       },
    //       {
    //         foodName: "French Fries",
    //         price: 5,
    //         foodCustomization: [],
    //         image:
    //           "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2799&q=80",
    //       },
    //     ],
    //   },
    //   {
    //     stallName: "Stall 2",
    //     rating: 5,
    //     foods: [
    //       {
    //         foodName: "Classic Pizza",
    //         price: 15,
    //         foodCustomization: [
    //           {
    //             name: "more meat",
    //             price: 2,
    //           },
    //         ],
    //         image:
    //           "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
    //       },
    //       {
    //         foodName: "Premium Pizza",
    //         price: 20,
    //         foodCustomization: [],
    //         image:
    //           "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
    //       },
    //     ],
    //   },
    //   {
    //     stallName: "Stall 3",
    //     rating: 3,
    //     foods: [
    //       {
    //         foodName: "Mee Goreng",
    //         price: 5,
    //         foodCustomization: [
    //           {
    //             name: "add chilies",
    //             price: 1,
    //           },
    //         ],
    //         image:
    //           "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
    //       },
    //       {
    //         foodName: "Nasi Goreng",
    //         price: 4.5,
    //         foodCustomization: [],
    //         image:
    //           "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
    //       },
    //     ],
    //   },
    // ];
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
