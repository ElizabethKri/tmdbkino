import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {AUTH_TOKEN} from "@/common/constants";

export const baseApi = createApi({
    baseQuery: async(args, api, extraOptions) => {

        await new Promise(res => setTimeout(res, 2000))

        return fetchBaseQuery({
            baseUrl: import.meta.env.VITE_BASE_URL,
            headers: {
                "API-KEY": import.meta.env.VITE_API_KEY,
            },
            prepareHeaders: (headers, _api) => {
                headers.set("Authorization", `Bearer ${localStorage.getItem(AUTH_TOKEN)}`)
            },
        })(args, api, extraOptions)
    },
    reducerPath: "baseApi",
    tagTypes: ['Todolist', 'Task'],
    endpoints:() => ({})
})