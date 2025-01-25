import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../config/index";
import {  orderData } from '../../models/enums'

const apiRoot = 'users'

export const usersAPI = createApi({
  reducerPath: "users",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["users"],
  endpoints: builder => ({
    getUsers: builder.query<orderData[], void>({
      query: () => ({
        url: `/${apiRoot}`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    editUser: builder.mutation<orderData, {id: string; body: {status: boolean}}>({
      query: ({id, body}) => ({
        url: `/${apiRoot}/${id}`,
        method: "PATCH",
        data: body,
      }),
      // invalidatesTags: ['users']
    }),
    
  }),
});

export const { useGetUsersQuery, useEditUserMutation } = usersAPI;
