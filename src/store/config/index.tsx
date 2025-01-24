/* eslint-disable complexity */
/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/unbound-method */

import { BaseQueryFn } from "@reduxjs/toolkit/dist/query";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

export interface CommonHeaderProperties {
  "Content-Type": string | null;
}

const Axios = axios.create({
  baseURL: 'http://localhost:3000',
});

Axios.interceptors.response.use(undefined, error => {

  const serverDown =
    (error.response && error.response.status === 500) ||
    (error.response && error.response.status === 502);

  const unauthorized = error.response && error.response.status === 401;
  // const forbidden = error.response && error.response.status === StatusCodes.Forbidden;
  // console.log(error);
  if (unauthorized) alert('error');
  if (serverDown && window.location.pathname !== "/error") alert('server down');

  return Promise.reject(error.response);
});

export const axiosBaseQuery =
  (): BaseQueryFn<{
    url: string;
    method: AxiosRequestConfig["method"];
    data?: AxiosRequestConfig["data"];
  }> =>
  async ({ url, method, data, ...rest }: { url: string; method: AxiosRequestConfig["method"]; data: AxiosRequestConfig["data"] }) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const result = await Axios.request({ url, method, data, ...rest });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return { error: err };
    }
  };

export const providesList = <R extends { Id: string | number }[], T extends string>(resultsWithIds: R | undefined, tagType: T) =>
  resultsWithIds ? [{ type: tagType, id: "LIST" }, ...resultsWithIds.map(({ Id }) => ({ type: tagType, id: Id }))] : [{ type: tagType, id: "LIST" }];

export default Axios;
