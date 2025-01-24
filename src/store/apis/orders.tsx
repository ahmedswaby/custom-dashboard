import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../config/index";
import {  orderData } from '../../models/enums'

const apiRoot = 'orders'

export const ordersAPI = createApi({
  reducerPath: "orders",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["orders"],
  endpoints: builder => ({
    getOrders: builder.query<orderData[], void>({
      query: () => ({
        url: `/${apiRoot}`,
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
    getLists: builder.query<orderData[], void>({
      query: () => ({
        url: `/${apiRoot}`,
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
    getOrderDetails: builder.query<orderData, void>({
      query: (id) => ({
        url: `/${apiRoot}/${id}`,
        method: "GET",
      }),
    }),
    editOrder: builder.mutation<orderData, {id: string; body: void}>({
      query: ({id, body}) => ({
        url: `/${apiRoot}/${id}`,
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: ['orders']
    }),

    deleteOrder: builder.mutation<boolean,string>({
      query: (id) => ({
        url: `/${apiRoot}/${id}`,
        method: "DELETE",
      }),
      // invalidatesTags: ['orders']
    }),
    
  }),
});

export const { useGetOrdersQuery , useEditOrderMutation, useLazyGetOrderDetailsQuery , useDeleteOrderMutation} = ordersAPI;
