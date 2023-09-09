import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./auth/UserSlice";
import menuReducer from "./menu/MenuSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    menu: menuReducer,
  },
});

export default store;
