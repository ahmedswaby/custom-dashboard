import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../config/index";
import {  orderData } from '../../models/enums'

const apiRoot = 'users'

export const usersAPI = createApi({
  reducerPath: "users",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["orders"],
  endpoints: builder => ({
    getUsers: builder.query<orderData[], void>({
      query: () => ({
        url: `/${apiRoot}`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    
  }),
});

export const { useGetUsersQuery } = usersAPI;
