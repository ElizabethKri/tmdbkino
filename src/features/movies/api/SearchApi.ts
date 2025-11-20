import {baseApi} from "@/app/baseApi.ts";
import {SearchMovieParams, SearchMoviesResponse} from "@/features/movies/api/SearchApi.types.ts";



export const searchApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        searchMovies: builder.query<SearchMoviesResponse, SearchMovieParams>({
            query: ({query, page = 1}) => ({
                url: '/search/movie',
                params: {
                    query,
                    page,
                },
            }),
            providesTags: ['Search']
        }),
    }),
})

export const {useSearchMoviesQuery} = searchApi


