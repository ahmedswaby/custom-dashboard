import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../config/index";
import {  userData } from '../../models/enums'

const apiRoot = 'users'

export const usersAPI = createApi({
  reducerPath: "users",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["users"],
  endpoints: builder => ({
    getUsers: builder.query<userData[], void>({
      query: () => ({
        url: `/${apiRoot}`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    getUserDetails: builder.query<userData, void>({
      query: (id) => ({
        url: `/${apiRoot}/${id}`,
        method: "GET",
      }),
    }),
    editUser: builder.mutation<userData, {id: string; body: {status: boolean}}>({
      query: ({id, body}) => ({
        url: `/${apiRoot}/${id}`,
        method: "PATCH",
        data: body,
      }),
      // invalidatesTags: ['users']
    }),
    
  }),
});

export const { useGetUsersQuery, useEditUserMutation , useLazyGetUserDetailsQuery} = usersAPI;
