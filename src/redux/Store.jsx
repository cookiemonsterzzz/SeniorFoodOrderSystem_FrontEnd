import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./auth/UserSlice";
import menuReducer from "./menu/MenuSlice";
import orderReducer from "./order/OrderSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    menu: menuReducer,
    order: orderReducer,
  },
});

export default store;
