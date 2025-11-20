import {baseApi} from "@/app/baseApi.ts";
import {PesponceBase} from "@/features/movies/api/MainApi.types.ts";

export const mainApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({
        fetchMain: builder.query<PesponceBase, void> ({
            query: () => '/movie/popular',
            providesTags: ['Main']
        }),
    }),
})

export const {useFetchMainQuery} = mainApi