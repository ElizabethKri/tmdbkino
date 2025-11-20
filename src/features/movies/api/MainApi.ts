import {baseApi} from "@/app/baseApi.ts";
import {MovieCategory, MovieDetails, PesponceBase} from "@/features/movies/api/MainApi.types.ts";

export const mainApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({
        fetchMain: builder.query<PesponceBase, void>({
            query: () => '/movie/popular',
            providesTags: ['Main']
        }),
        fetchTopRated: builder.query<PesponceBase, void>({
            query: () => '/movie/top_rated',
            providesTags: ['Main']
        }),
        fetchUpcoming: builder.query<PesponceBase, void>({
            query: () => '/movie/upcoming',
            providesTags: ['Main']
        }),
        fetchNowPlaying: builder.query<PesponceBase, void>({
            query: () => '/movie/now_playing',
            providesTags: ['Main']
        }),
        fetchMoviesByCategory: builder.query<PesponceBase, { category: MovieCategory, page?: number }>({
            query: ({category, page = 1}) => ({
                url: `/movie/${category}`,
                params: { page },
            }),
            providesTags: ['Main']
        }),
        fetchMovieDetails: builder.query<MovieDetails, number>({
            query: (movieId) => `/movie/${movieId}`,
            providesTags: ['Main']
        }),
    }),
})

export const {
    useFetchMainQuery,
    useFetchTopRatedQuery,
    useFetchUpcomingQuery,
    useFetchNowPlayingQuery,
    useFetchMoviesByCategoryQuery,
    useFetchMovieDetailsQuery
} = mainApi