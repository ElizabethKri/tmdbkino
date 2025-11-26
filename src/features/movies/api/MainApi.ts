import {baseApi} from "@/app/baseApi.ts";
import {
    DiscoverMoviesParams,
    GenresResponse,
    MovieCategory,
    MovieDetails,
    PesponceBase,
} from "@/features/movies/api/MainApi.types.ts";

// const validateResponse = <T>(schema: z.ZodSchema<T>) => {
//     return (response: unknown): T => {
//         try {
//             return schema.parse(response)
//         } catch (error) {
//             if (error instanceof z.ZodError) {
//                 console.error('Validation error:', error.errors)
//                 throw new Error(`Data validation failed: ${error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')}`)
//             }
//             throw error
//         }
//     }
// }

export const mainApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({
        fetchMain: builder.query<PesponceBase, void>({
            query: () => '/movie/popular',
            // transformResponse: validateResponse(PesponceBaseSchema),
            providesTags: ['Main']
        }),
        fetchTopRated: builder.query<PesponceBase, void>({
            query: () => '/movie/top_rated',
            // transformResponse: validateResponse(PesponceBaseSchema),
            providesTags: ['Main']
        }),
        fetchUpcoming: builder.query<PesponceBase, void>({
            query: () => '/movie/upcoming',
            // transformResponse: validateResponse(PesponceBaseSchema),
            providesTags: ['Main']
        }),
        fetchNowPlaying: builder.query<PesponceBase, void>({
            query: () => '/movie/now_playing',
            // transformResponse: validateResponse(PesponceBaseSchema),
            providesTags: ['Main']
        }),
        fetchMoviesByCategory: builder.query<PesponceBase, { category: MovieCategory, page?: number }>({
            query: ({category, page = 1}) => ({
                url: `/movie/${category}`,
                params: { page },
            }),
            // transformResponse: validateResponse(PesponceBaseSchema),
            providesTags: ['Main']
        }),
        fetchMovieGenres: builder.query<GenresResponse, void>({
            query: () => '/genre/movie/list',
            // transformResponse: validateResponse(GenresResponseSchema),
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
            // transformResponse: validateResponse(PesponceBaseSchema),
            providesTags: ['Main']
        }),
        fetchMovieDetails: builder.query<MovieDetails, number>({
            query: (movieId) => `/movie/${movieId}`,
            // transformResponse: validateResponse(MovieDetailsSchema),
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