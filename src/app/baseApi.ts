import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {AUTH_TOKEN} from "@/common/constants";
import {handleError} from "@/common/utils/handleError.ts";

export const baseApi = createApi({
    baseQuery: async(args, api, extraOptions) => {

        const res =  await fetchBaseQuery({
            baseUrl: import.meta.env.VITE_BASE_URL,
            headers: {
                "API-KEY": import.meta.env.VITE_API_KEY,
            },
            prepareHeaders: (headers, _api) => {
                headers.set("Authorization", `Bearer ${localStorage.getItem(AUTH_TOKEN)}`)
            },
        })(args, api, extraOptions)

        handleError(api, res)

        return res


    },
    reducerPath: "baseApi",
    tagTypes: [],
    endpoints:() => ({})
})