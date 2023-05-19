import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ISignup {
    id: number | string;
    name: string;
    email: string;
    password: string;
}

export const signupApi = createApi({
    reducerPath: 'signupApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:1337' }),
    tagTypes: ['Signup'],
    endpoints: build => ({
        getAllSignup: build.query<ISignup[], void>({
            query: () => '/signup',
        }),

        addSignup: build.mutation<ISignup, Partial<ISignup>>({
            query(body) {
                return {
                    url: '/signup',
                    method: 'POST',
                    body
                }
            }
        }),
    })
})

export const { useGetAllSignupQuery, useAddSignupMutation
} = signupApi