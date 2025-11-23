import {baseApi} from "@/app/baseApi.ts";
import {SearchMovieParams, SearchMoviesResponse} from "@/features/movies/api/SearchApi.types.ts";
import {SearchMoviesResponseSchema} from "@/features/movies/api/schemas.ts";
import {z} from "zod";

const validateResponse = <T>(schema: z.ZodSchema<T>) => {
    return (response: unknown): T => {
        try {
            return schema.parse(response)
        } catch (error) {
            if (error instanceof z.ZodError) {
                console.error('Validation error:', error.errors)
                throw new Error(`Data validation failed: ${error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')}`)
            }
            throw error
        }
    }
}

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
            transformResponse: validateResponse(SearchMoviesResponseSchema),
            providesTags: ['Search']
        }),
    }),
})

export const {useSearchMoviesQuery} = searchApi


