import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./auth/UserSlice";
import menuReducer from "./menu/MenuSlice";
import orderReducer from "./order/OrderSlice";
import ordersReducer from "./order/OrdersSlice";
import orderUpsertReducer from "./order/OrderUpsertSlice";
import paymentUpsertReducer from "./payment/PaymentSlice";
import ratingReducer from "./rating/RatingSlice";
import enquiryReducer from "./enquiry/EnquirySlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    menu: menuReducer,
    order: orderReducer,
    orders: ordersReducer,
    orderUpsert: orderUpsertReducer,
    paymentUpsert: paymentUpsertReducer,
    rating: ratingReducer,
    enquirySubmit: enquiryReducer,
  },
});

export default store;
