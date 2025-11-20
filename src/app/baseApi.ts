import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {handleError} from "@/common/utils/handleError.ts";

export const baseApi = createApi({
    baseQuery: async(args, api, extraOptions) => {

        const res =  await fetchBaseQuery({

            baseUrl: import.meta.env.VITE_BASE_URL,
            headers: {
                "accept": "application/json",
            },
            prepareHeaders: (headers, _api) => {
                headers.set("Authorization", `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`)
            },
        })(args, api, extraOptions)

        handleError(api, res)

        return res


    },
    reducerPath: "baseApi",
    tagTypes: ['Main', 'Search', 'Favorite', 'FilteredMovies', 'CategoryMovies'],
    endpoints:() => ({})
})