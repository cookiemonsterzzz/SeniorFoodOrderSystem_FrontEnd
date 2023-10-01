import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./auth/UserSlice";
import menuReducer from "./menu/MenuSlice";
import orderReducer from "./order/OrderSlice";
import orderUpsertReducer from "./order/OrderUpsertSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    menu: menuReducer,
    order: orderReducer,
    orderUpsert: orderUpsertReducer,
  },
});

export default store;
