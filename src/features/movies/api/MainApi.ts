import {baseApi} from "@/app/baseApi.ts";
import {
    DiscoverMoviesParams,
    GenresResponse,
    MovieCategory,
    MovieDetails,
    PesponceBase,
} from "@/features/movies/api/MainApi.types.ts";

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
        fetchMovieGenres: builder.query<GenresResponse, void>({
            query: () => '/genre/movie/list',
        }),
        discoverMovies: builder.query<PesponceBase, DiscoverMoviesParams>({
            query: (params) => {
                const queryParams: Record<string, string | number> = {
                    sort_by: params.sort_by,
                    page: params.page ?? 1,
                }

                if (params.vote_average_gte !== undefined) {
                    queryParams["vote_average.gte"] = params.vote_average_gte
                }

                if (params.vote_average_lte !== undefined) {
                    queryParams["vote_average.lte"] = params.vote_average_lte
                }

                if (params.with_genres) {
                    queryParams["with_genres"] = params.with_genres
                }

                return {
                    url: '/discover/movie',
                    params: queryParams,
                }
            },
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
    useFetchMovieGenresQuery,
    useDiscoverMoviesQuery,
    useFetchMovieDetailsQuery
} = mainApi