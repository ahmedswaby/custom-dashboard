import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { ordersAPI } from "./apis/";

const store = configureStore({
  reducer: {
    [ordersAPI.reducerPath]: ordersAPI.reducer,
  },
  devTools: true,

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(ordersAPI.middleware)
});
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
