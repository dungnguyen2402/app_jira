import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ISignin {
  id: number | string;
  email: string;
  password: string;
}

export const signinApi = createApi({
  reducerPath: "signinApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:1337" }),
  tagTypes: ["Signin"],
  endpoints: (build) => ({
    getAllSignin: build.query<ISignin[], void>({
      query: () => "/signin",
    }),

    addSignin: build.mutation<ISignin, Partial<ISignin>>({
      query(body) {
        return {
          url: "/signin",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useGetAllSigninQuery, useAddSigninMutation } = signinApi;
