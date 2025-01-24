import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { ordersAPI } from "./apis/orders";
import { usersAPI } from "./apis/users";

const store = configureStore({
  reducer: {
    [ordersAPI.reducerPath]: ordersAPI.reducer,
    [usersAPI.reducerPath]: usersAPI.reducer,
  },
  devTools: true,

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(ordersAPI.middleware)
      .concat(usersAPI.middleware)
});
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
